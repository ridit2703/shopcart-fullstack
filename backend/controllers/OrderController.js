import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/product.js';
import stripe from '../config/stripe.js';

export const placeOrder = async (req, res) => {
    try {
        //const { userId, address } = req.body;
        console.log("REQ.USER:", req.user);
        console.log("REQ.BODY:", req.body);


        const userId = req.user.id;
        const { address } = req.body;

        //check address
         if (!address) {
            return res.status(400).json({
                message: "Address is required",
            });
        }
        //get cart
        const cart = await Cart.findOne({ userId }).populate('items.productId')
        if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" })


        //prepare Order
        const orderItems = cart.items.map(item => ({
            product: item.productId._id,
            quantity: item.quantity,
            prices: item.productId.price,

        }))
        //calculate totol amount
        const totalAmount = orderItems.reduce((total, item) => total + (item.prices * item.quantity), 0);

        // //deduct 
        // for (let item of cart.items) {
        //     await Product.findByIdAndUpdate(item.productId._id, { $inc: { stock: -item.quantity } })
        // }

        // Check stock
        for (const item of cart.items) {
            if (item.productId.stock < item.quantity) {
                return res.status(400).json({
                    message: `${item.productId.title} is out of stock`,
                });
            }
        }

        // Deduct stock
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(
                item.productId._id,
                {
                    $inc: {
                        stock: -item.quantity,
                    },
                }
            );
        }


        //creat order
        const order = await Order.create({
            userId,
            items: orderItems,
            address,
            totalAmount,
            paymentMethod: "COD"
        })
        //clear cart
        await Cart.findOneAndUpdate({ userId }, { items: [] });
        res.status(201).json({ message: "Order placed sucessfully", order })
    }
    catch (error) {
        res.status(500).json({ message: error.message });

    }
}

// export const createCheckoutSession =async(req,res)=>{
//     try{

//         const userId=req.user.id;
//         const {address}=req.body;

//         const cart=await Cart
//         .findOne({userId})
//         .populate("items.productId")

//         if(!cart || cart.items.length===0){
//             return res.status(400).json({message:"Cart is Empty"})
//         }

//         //check stock
//         // if(item.productId.stock < item.quantity){
//         //     return res.status(400).json({message:`${item.productId.title} is out of stock`})
//         // }

//         for(const item of cart.items){
//             if(item.productId.stock< item.quantity){
//                 return res.status(400).json({message:`${item.productId.title} is out of stock`})
//             }
//         }



//         //prepare order items

//         const orderItems=cart.items.map(item=>({
//             product:item.productId._id,
//             quantity:item.quantity,
//             prices:item.productId.price

//         }));

//         //calculate total
//         const totalAmount=orderItems.reduce((total,item)=>total+item.prices*quantity,0);

//         //create pending order

//         const order=await Order.create({
//             userId,
//             items:orderItems,
//             address,
//             totalAmount,
//             paymentMethod:"STRIPE",
//             paymentStatus:"pending",
//             status:"Placed"
//         });

//         //stripe products
//         const lineItems=cart.items.map(items=>({
//             price_data:{
//                 currency:"usd",
//                 product_data:{
//                     name:item.productId.title,
//                     ...Cart(item.product.image && {
//                         images:[item.productId.image]
//                     })
//                 },
//                 unit_amount:Math.round(
//                     item.productId.price*100
//                 )
//            },
//            quantity:item.quantity
//         }));
//         //create stripe checkout session

//         const session =await stripe.checkout.sessions.create({
//             payment_method_types:["card"],
//             line_items:lineItems,
//             mode:"payment",
//             success_url:`${process.env.CLIENT_URL}/checkout`,

//             metadata:{
//                 orderId:order._id.toString(),
//                 userId:userId.toString()
//             }
//         });

//         order.stripeSessionId = session.id;

//         await order.save();

//         res.status(200).json({
//             message: "Stripe checkout session created",
//             url: session.url,
//             sessionId: session.id,
//             orderId: order._id
//         });

//     }
//     catch(error){
//         console.error("STRIPE CHECKOUT ERROR:", error);

//         res.status(500).json({
//             message: "Stripe checkout failed",
//             error: error.message
//         });

//     }
// }

export const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.user.id;
        const { address } = req.body;

        if (!address) {
            return res.status(400).json({
                message: "Address is required",
            });
        }

        // Get cart from database
        const cart = await Cart
            .findOne({ userId })
            .populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty",
            });
        }

        // Check stock
        for (const item of cart.items) {
            if (!item.productId) {
                return res.status(400).json({
                    message: "Product not found",
                });
            }

            if (item.productId.stock < item.quantity) {
                return res.status(400).json({
                    message: `${item.productId.title} is out of stock`,
                });
            }
        }

        // Prepare order items
        const orderItems = cart.items.map((item) => ({
            product: item.productId._id,
            quantity: item.quantity,
            prices: item.productId.price,
        }));

        // Calculate total
        const totalAmount = orderItems.reduce(
            (total, item) =>
                total + item.prices * item.quantity,
            0
        );

        // Create pending order
        const order = await Order.create({
            userId,
            items: orderItems,
            address,
            totalAmount,

            paymentMethod: "STRIPE",
            paymentStatus: "pending",

            status: "Pending",
        });

        // Stripe line items
        const lineItems = cart.items.map((item) => ({
            price_data: {
                currency: "inr",

                product_data: {
                    name: item.productId.title,

                    ...(item.productId.image && {
                        images: [item.productId.image],
                    }),
                },

                // ₹100 = 10000 paise
                unit_amount: Math.round(
                    item.productId.price * 100
                ),
            },

            quantity: item.quantity,
        }));

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],

            line_items: lineItems,

            mode: "payment",

            success_url:
                `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url:
                `${process.env.CLIENT_URL}/checkout`,

            metadata: {
                orderId: order._id.toString(),
                userId: userId.toString(),
            },
        });

        // Save Stripe session ID
        order.stripeSessionId = session.id;

        await order.save();

        return res.status(200).json({
            message: "Stripe checkout session created",

            url: session.url,

            sessionId: session.id,

            orderId: order._id,
        });

    } catch (error) {
        console.error(
            "STRIPE CHECKOUT ERROR:",
            error
        );

        return res.status(500).json({
            message: "Stripe checkout failed",
            error: error.message,
        });
    }
};
