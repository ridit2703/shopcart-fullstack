import Order from '../models/Order.js';
import Cart from '../models/Cart.js.';
import product from '../models/product.js';

export const placeorder = async (req, res) => {
    try {
        const { userId, address } = req.body;
        //get cart
        const cart = await Cart.findOne({ userId }).populate('items.productId')
        if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" })


        //prepare Order
        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,

        }))
        //calculate totol amount
        const totalAmount = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        //deduct 
        for (let item of cart.items) {
            await product.findByIdAndUpdate(item.productId._id, { $inc: { stock: -item.quantity } })
        }

        //creat order
        const order = await Order.creat({
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
        res.status(500).json({ message: "Internal server error" });

    }
}