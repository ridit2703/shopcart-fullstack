


// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router";
// import api from "../api/axios";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [cartCount, setCartCount] = useState(0);
  
//   const storedUser = localStorage.getItem("user");
//   const user = storedUser ? JSON.parse(storedUser) : null;
  
//   // Check if the logged-in user is an admin
//   const isAdmin = user?.role === "admin";

//   useEffect(() => {
//     // If there's no user OR the user is an admin, don't fetch the cart
//     if (!user || isAdmin) {
//       setCartCount(0);
//       return;
//     }

//     const loadCart = async () => {
//       try {
//         const res = await api.get("/cart");
//         const total = res.data.items?.reduce(
//           (sum, item) => sum + item.quantity, 0
//         ) || 0;
//         setCartCount(total);
//       } catch (error) {
//         console.error("Failed to load cart:", error);
//         setCartCount(0);
//       }
//     };

//     loadCart();
//     window.addEventListener("cartUpdated", loadCart);

//     return () => {
//       window.removeEventListener("cartUpdated", loadCart);
//     };
//   }, [user?.id, isAdmin]);

//   const logout = () => {
//     localStorage.clear();
//     setCartCount(0);
//     navigate("/login");
//   };

//   return (
//     <nav className="flex justify-between p-4 shadow">
//       <Link to="/" className="font-bold text-xl">
//         Shop Cart
//       </Link>
      
//       <div className="flex gap-4 items-center">
//         {/* Only show Cart and Wishlist if the user is NOT an admin */}
//         {!isAdmin && (
//           <>
//             <Link to="/cart" className="relative text-xl">
//               👜 {cartCount > 0 && (
//                 <span className="absolute top-2 right-3 bg-red-500 text-white rounded-full text-xs w-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
            
//             <Link to="/wishlist" className="text-black text-lg hover:text-pink-500">
//               ❤️ Wishlist
//             </Link>
//           </>
//         )}

//         {!user ? (
//           <>
//             <Link to="/login" className="text-lg">
//               Login
//             </Link>
//             <Link to="/signup" className="text-lg">
//               Signup
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link to="/profile" className="text-lg hover:text-blue-500">
//               👤 Profile
//             </Link>
//             <button onClick={logout} className="text-lg">
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  
  // React State for managing the current user object
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const isAdmin = user?.role?.toLowerCase() === "admin";

  // 1. Listen for dynamic authentication events (Login/Logout) to switch views instantly
  useEffect(() => {
    const handleAuthChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("authChanged", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  // 2. Fetch cart contents only for regular logged-in users
  useEffect(() => {
    if (!user || isAdmin) {
      setCartCount(0);
      return;
    }

    const loadCart = async () => {
      try {
        const res = await api.get("/cart");
        const total = res.data.items?.reduce(
          (sum, item) => sum + item.quantity, 0
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
  }, [user?.id, isAdmin]);

  const logout = () => {
    localStorage.clear();
    setUser(null); 
    setCartCount(0); 
    // Fire event to notify app state changes
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md border-b border-slate-100">
      <Link to="/" className="font-extrabold text-xl text-slate-800 tracking-tight">
        Shop Cart
      </Link>
      
      <div className="flex gap-6 items-center">
        {/* ================= STATE 1: GUEST ================= */}
        {!user && (
          <>
            <Link to="/login" className="text-slate-600 font-medium hover:text-blue-600 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="text-slate-600 font-medium hover:text-blue-600 transition-colors">
              Signup
            </Link>
          </>
        )}

        {/* ================= STATE 2: NORMAL USER ================= */}
        {user && !isAdmin && (
          <>
            <Link to="/cart" className="relative text-xl hover:scale-105 transition-transform">
              👜 {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <Link to="/wishlist" className="text-slate-600 font-medium hover:text-pink-500 transition-colors">
              ❤️ Wishlist
            </Link>
            
            <Link to="/profile" className="text-slate-600 font-medium hover:text-blue-500 transition-colors">
              👤 Profile
            </Link>
            
            <button onClick={logout} className="text-slate-600 font-medium hover:text-red-600 transition-colors">
              Logout
            </button>
          </>
        )}

        {/* ================= STATE 3: ADMIN ================= */}
        {user && isAdmin && (
          <>
            {/* Optional dashboard indicator for clarity */}
            <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-md font-semibold tracking-wide uppercase">
              Admin Mode
            </span>
            <button onClick={logout} className="text-slate-600 font-medium hover:text-red-600 transition-colors">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
