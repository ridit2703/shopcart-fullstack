// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router"
// import api from "../api/axios"

// export default function Navbar() {
//     const navigate = useNavigate();
//     const [cartCount, setCartCount] = useState(0);
//     const storedUser = localStorage.getItem("user");
//     const user = storedUser ? JSON.parse(storedUser) : null;
//     //const userId = user?.id;

//     useEffect(() => {
//         const loadCart = async () => {
//             if (!userId) return setCartCount(0);
//             const res = await api.get("/cart");
//             const total = res.data.items.reduce(
//                 (sum, item) => sum + item.quantity, 0
//             ) || 0;
//             setCartCount(total)
//         }
//         loadCart();
//         window.addEventListener("cartUpdated", loadCart);
//         return () => {
//             window.removeEventListener("cartUpdated", loadCart)
//         }
//     }, [userId]);

//     const logout = () => {
//         localStorage.clear();
//         setCartCount(0);
//         navigate("/login")
//     }

//     return (
//         <nav className="flex justify-between p-4 shadow" >
//             <Link to="/" className="font-bold text-xl">Shop Cart</Link>

//             <div className="flex gap-4 items-center">
//                 <Link to="/cart" className="relative text-xl">
//                     👜
//                     {
//                         cartCount > 0 && (
//                             <span className="absolute top-2 right-3 bg-red-500 text-white rounded-full text-xs w-5 flex items-center justify-center ">
//                                 {cartCount}
//                             </span>
//                         )
//                     }
//                 </Link>
//                 <Link
//                     to="/wishlist"
//                     className="text-black text-lg hover:text-pink-500"
//                 >
//                     ❤️ Wishlist
//                 </Link>
//                 {
//                     !user ? (
//                         <>
//                             <Link to="/login" className="text-lg">Login</Link>
//                             <Link to="/signup" className="text-lg">Signup</Link>

//                         </>
//                     ) : (<>
//                         <Link
//                             to="/profile"
//                             className="text-lg hover:text-blue-500"
//                         >
//                             👤 Profile
//                         </Link>
//                         <button onClick={logout} className="text-lg">Logout</button>
//                     </>
//                     )
//                 }
//             </div>

//         </nav>
//     )
// }


import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api/axios";

export default function Navbar() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        const loadCart = async () => {
            if (!user) {
                setCartCount(0);
                return;
            }

            try {
                // User ID is NOT sent in URL.
                // Backend gets it from JWT.
                const res = await api.get("/cart");

                const total =
                    res.data.items?.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                    ) || 0;

                setCartCount(total);
            } catch (error) {
                console.error("Failed to load cart:", error);
                setCartCount(0);
            }
        };

        loadCart();

        window.addEventListener("cartUpdated", loadCart);

        return () => {
            window.removeEventListener("cartUpdated", loadCart);
        };
    }, [user?.id]);

    const logout = () => {
        localStorage.clear();
        setCartCount(0);
        navigate("/login");
    };

    return (
        <nav className="flex justify-between p-4 shadow">
            <Link to="/" className="font-bold text-xl">
                Shop Cart
            </Link>

            <div className="flex gap-4 items-center">

                <Link to="/cart" className="relative text-xl">
                    👜

                    {cartCount > 0 && (
                        <span className="absolute top-2 right-3 bg-red-500 text-white rounded-full text-xs w-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </Link>

                <Link
                    to="/wishlist"
                    className="text-black text-lg hover:text-pink-500"
                >
                    ❤️ Wishlist
                </Link>

                {!user ? (
                    <>
                        <Link to="/login" className="text-lg">
                            Login
                        </Link>

                        <Link to="/signup" className="text-lg">
                            Signup
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/profile"
                            className="text-lg hover:text-blue-500"
                        >
                            👤 Profile
                        </Link>

                        <button
                            onClick={logout}
                            className="text-lg"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}