import stripe from "../config/stripe.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/product.js";

export const stripeWebhook = async (req, res) => {

    const signature = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error(
            "Webhook signature error:",
            error.message
        );

        return res.status(400).send(
            `Webhook Error: ${error.message}`
        );
    }

    try {

        if (event.type === "checkout.session.completed") {

            const session = event.data.object;

            const orderId = session.metadata.orderId;

            const order = await Order.findById(orderId);

            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }

            // Prevent duplicate processing
            if (order.paymentStatus === "paid") {
                return res.json({
                    received: true
                });
            }

            // Mark payment successful
            order.paymentStatus = "paid";
            order.paymentId = session.payment_intent;

            await order.save();

            // Deduct stock
            for (const item of order.items) {

                await Product.findByIdAndUpdate(
                    item.product,
                    {
                        $inc: {
                            stock: -item.quantity
                        }
                    }
                );
            }

            // Clear cart
            await Cart.findOneAndUpdate(
                { userId: order.userId },
                { items: [] }
            );

            console.log(
                "Payment successful:",
                order._id.toString()
            );
        }

        res.json({
            received: true
        });

    } catch (error) {

        console.error(
            "Webhook processing error:",
            error
        );

        res.status(500).json({
            message: error.message
        });
    }
};
