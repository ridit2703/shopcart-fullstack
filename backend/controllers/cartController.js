import Cart from '../models/Cart.js';
import Product  from '../models/product.js'


// Add item to cart
// export const addToCart = async (req, res) => {
//     try {
//         const {  productId } = req.body;
//          const userId=req.user.id;

//          if (!productId) {
//       return res.status(400).json({
//         message: "Product ID is required",
//       });
//     }

//       // Find product
//         const product = await Product.findById(productId);

//         if (!product) {
//             return res.status(404).json({
//                 message: "Product not found",
//             });
//         }

//         // Check if product is out of stock
//         if (product.stock <= 0) {
//             return res.status(400).json({
//                 message: "Product is out of stock",
//             });
//         }


//         let cart = await Cart.findOne({ userId });

//         if (!cart) {
//             cart = new Cart({
//                 userId,
//                 items: [{ productId, quantity: 1 }]
//             });
//         } else {
//             const item = cart.items.find(
//                 i => i.productId.toString() === productId
//             );

//             if (item) {
//                 item.quantity += 1;
//             } else {
//                 cart.items.push({
//                     productId,
//                     quantity: 1
//                 });
//             }
//         }

//         await cart.save();

//         res.status(200).json({
//             message: "Item added to cart",
//             cart
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: "Server Error",
//             error
//         });
//     }
// };


export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
            });
        }

        // Find product
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        // Check if product is out of stock
        if (product.stock <= 0) {
            return res.status(400).json({
                message: "Product is out of stock",
            });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [
                    {
                        productId,
                        quantity: 1
                    }
                ]
            });
        } else {

            const item = cart.items.find(
                i => i.productId.toString() === productId
            );

            if (item) {

                // Check stock before increasing quantity
                if (item.quantity >= product.stock) {
                    return res.status(400).json({
                        message: `Only ${product.stock} items available in stock`,
                    });
                }

                item.quantity += 1;

            } else {

                cart.items.push({
                    productId,
                    quantity: 1
                });
            }
        }

        await cart.save();

        res.status(200).json({
            message: "Item added to cart",
            cart
        });

    } catch (error) {

        console.error("ADD TO CART ERROR:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};



// Remove item from cart
// export const removeItem = async (req, res) => {
//     try {
//         const {  productId } = req.body;
//         const userId=req.user.id;

//         if (!productId) {
//       return res.status(400).json({
//         message: "Product ID is required",
//       });
//     }

//         const cart = await Cart.findOne({ userId });

//         if (!cart) {
//             return res.status(404).json({
//                 message: "Cart not found"
//             });
//         }

//         cart.items = cart.items.filter(
//             i => i.productId.toString() !== productId
//         );

//         await cart.save();

//         res.status(200).json({
//             message: "Item removed from cart",
//             cart
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: "Server Error",
//             error
//         });
//     }
// };
export const removeItem = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        console.log("Remove request:", {
            productId,
            userId,
        });

        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
            });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        const itemExists=cart.items.some((item)=>
        item.productId && item.productId.toString()===productId.toString())

        if(!itemExists){
            return res.status(404).json({message:"Item not found in cart"})
        }


        //console.log("Cart items:", cart.items);

        cart.items = cart.items.filter((item) => {
            return item.productId &&
                item.productId.toString() !== productId.toString();
        });

        await cart.save();

        return res.status(200).json({
            message: "Item removed from cart",
            cart,
        });

    } catch (error) {
        console.error("REMOVE ITEM ERROR:", error);

        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};





// Update quantity
// export const updateQuantity = async (req, res) => {
//     try {
//         const {  productId, quantity } = req.body;
//          const userId=req.user.id;

//          if (!productId || quantity === undefined) {
//       return res.status(400).json({
//         message: "Product ID and quantity are required",
//       });
//     }

//     if (quantity < 1) {
//       return res.status(400).json({
//         message: "Quantity must be at least 1",
//       });
//     }

//         const cart = await Cart.findOne({ userId });

//         if (!cart) {
//             return res.status(404).json({
//                 message: "Cart not found"
//             });
//         }

//         const item = cart.items.find(
//             i => i.productId.toString() === productId
//         );

//         if (!item) {
//             return res.status(404).json({
//                 message: "Item not found in cart"
//             });
//         }

//         item.quantity = quantity;

//         await cart.save();

//         res.json({
//             message: "Quantity updated",
//             cart
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: "Server Error",
//             error
//         });
//     }
// };


export const updateQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        if (!productId || quantity === undefined) {
            return res.status(400).json({
                message: "Product ID and quantity are required",
            });
        }

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be a positive integer",
            });
        }

        // Find product
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        // Check stock
        if (quantity > product.stock) {
            return res.status(400).json({
                message: `Only ${product.stock} items available in stock`,
            });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            i => i.productId.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                message: "Item not found in cart"
            });
        }

        item.quantity = quantity;

        await cart.save();

        res.json({
            message: "Quantity updated",
            cart
        });

    } catch (error) {

        console.error("UPDATE QUANTITY ERROR:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};



// Get cart by user ID
export const getCart = async (req, res) => {
    try {
        const userId=req.user.id

        const cart = await Cart.findOne({ userId })
            .populate('items.productId');

        if (!cart) {
            // return res.status(404).json({
            //     message: "Cart not found"
            // });
            return res.status(200).json({
                userId,items:[]
            })
        }

        res.json(cart);

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error:error.message,
        });
    }
    
};