import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/product.js';

export const placeOrder = async (req, res) => {
    try {
        const { userId, address } = req.body;
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

        //deduct 
        for (let item of cart.items) {
            await Product.findByIdAndUpdate(item.productId._id, { $inc: { stock: -item.quantity } })
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