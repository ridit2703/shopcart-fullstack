

// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router";

// export default function Cart() {
//     const [cart, setCart] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     const navigate = useNavigate();

//     // Load cart
//     const loadCart = async () => {
//         try {
//             setLoading(true);
//             setError("");

//             const res = await api.get("/cart");

//             console.log("Cart response:", res.data);

//             setCart(res.data);
//         } catch (error) {
//             console.error("Error loading cart:", error);
//             setError("Unable to load cart");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         loadCart();
//     }, []);

//     // Remove item
//     const removeItem = async (productId) => {
//         try {
//             await api.delete("/cart/remove", {
//                 data: { productId }
//             });

//             await loadCart();

//             window.dispatchEvent(new Event("cartUpdated"));
//         } catch (error) {
//             console.error("Error removing item:", error);
//         }
//     };

//     // Update quantity
//     const updateQty = async (productId, quantity) => {
//         try {
//             if (quantity <= 0) {
//                 await removeItem(productId);
//                 return;
//             }

//             await api.put("/cart/update", {
//                 productId,
//                 quantity
//             });

//             await loadCart();

//             window.dispatchEvent(new Event("cartUpdated"));
//         } catch (error) {
//             console.error("Error updating quantity:", error);
//         }
//     };

//     if (loading) {
//         return <div className="p-6">Loading...</div>;
//     }

//     if (error) {
//         return <div className="p-6 text-red-500">{error}</div>;
//     }

//     if (!cart) {
//         return <div className="p-6">Cart not found</div>;
//     }

//     const total = cart.items.reduce(
//         (sum, item) =>
//             sum + item.productId.price * item.quantity,
//         0
//     );

  

//       return (
//         <div className="max-w-4xl mx-auto p-6">

//             <h1 className="text-2xl font-bold mb-6">
//                 Your Cart
//             </h1>

//             {cart.items.length === 0 ? (
//                 <div>Your cart is empty</div>
//             ) : (
//                 <div className="space-y-4">

//                     {cart.items.map((item) => (
//                         <div
//                             key={item.productId._id}
//                             className="flex items-center justify-between p-4 border rounded"
//                         >

//                             <div className="flex items-center gap-4">
//                                 <img
//                                     src={item.productId.image}
//                                     alt={item.productId.title}
//                                     className="w-16 h-16 object-cover rounded"
//                                 />

//                                 <div>
//                                     <h2 className="text-lg font-semibold">
//                                         {item.productId.title}
//                                     </h2>

//                                     <p className="text-gray-600">
//                                         Rs {item.productId.price.toFixed(2)}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-2">

//                                 <button
//                                     onClick={() =>
//                                         updateQty(
//                                             item.productId._id,
//                                             item.quantity - 1
//                                         )
//                                     }
//                                     className="px-2 py-2 bg-gray-200 rounded"
//                                 >
//                                     -
//                                 </button>

//                                 <span className="px-2">
//                                     {item.quantity}
//                                 </span>

//                                 <button
//                                     onClick={() =>
//                                         updateQty(
//                                             item.productId._id,
//                                             item.quantity + 1
//                                         )
//                                     }
//                                     className="px-2 py-2 bg-gray-200 rounded"
//                                 >
//                                     +
//                                 </button>

//                             </div>

//                             <div>
//                                 <p className="font-semibold">
//                                     Rs{" "}
//                                     {(
//                                         item.productId.price *
//                                         item.quantity
//                                     ).toFixed(2)}
//                                 </p>
//                             </div>

//                             <button
//                                 onClick={() =>
//                                     removeItem(item.productId._id)
//                                 }
//                                 className="text-red-500"
//                             >
//                                 Remove
//                             </button>

//                         </div>
//                     ))}

//                     <div className="text-right mt-4">
//                         <h2 className="text-xl font-bold">
//                             Total: Rs {total.toFixed(2)}
//                         </h2>
//                     </div>

//                     <button
//                         onClick={() =>
//                             navigate("/checkout-address")
//                         }
//                         className="w-full bg bg-blue-500 text-white p-2 rounded"
//                     >
//                         Proceed to Checkout
//                     </button>

//                 </div>
//             )}
//         </div>
//     );
// }


import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  // =========================
  // LOAD CART
  // =========================

  const loadCart = async () => {
    try {

      setLoading(true);
      setError("");

      const res = await api.get("/cart");

      console.log("Cart response:", res.data);

      setCart(res.data);

    } catch (error) {

      console.error(
        "Error loading cart:",
        error
      );

      setError("Unable to load cart");

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadCart();
  }, []);


  // =========================
  // REMOVE ITEM
  // =========================

  const removeItem = async (productId) => {
    try {

      await api.delete("/cart/remove", {
        data: {
          productId
        }
      });

      await loadCart();

      window.dispatchEvent(
        new Event("cartUpdated")
      );

    } catch (error) {

      console.error(
        "Error removing item:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to remove item"
      );
    }
  };


  // =========================
  // UPDATE QUANTITY
  // =========================

  const updateQty = async (
    productId,
    quantity
  ) => {

    try {

      if (quantity <= 0) {
        await removeItem(productId);
        return;
      }

      await api.put("/cart/update", {
        productId,
        quantity
      });

      await loadCart();

      window.dispatchEvent(
        new Event("cartUpdated")
      );

    } catch (error) {

      console.error(
        "Error updating quantity:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to update quantity"
      );

      // Get latest stock
      await loadCart();
    }
  };


  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }


  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }


  if (!cart) {
    return (
      <div className="p-6">
        Cart not found
      </div>
    );
  }


  // =========================
  // TOTAL
  // =========================

  const total = cart.items.reduce(
    (sum, item) => {

      if (!item.productId) {
        return sum;
      }

      return (
        sum +
        item.productId.price *
          item.quantity
      );
    },
    0
  );


  // =========================
  // STOCK VALIDATION
  // =========================

  const hasStockIssue =
    cart.items.some((item) => {

      if (!item.productId) {
        return true;
      }

      return (
        item.productId.stock <= 0 ||
        item.quantity >
          item.productId.stock
      );
    });


  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Your Cart
      </h1>


      {cart.items.length === 0 ? (

        <div className="text-center py-12">

          <p className="text-gray-600">
            Your cart is empty
          </p>

          <button
            onClick={() => navigate("/")}
            className="
              mt-4
              bg-blue-600
              text-white
              px-5
              py-2
              rounded
              hover:bg-blue-700
            "
          >
            Continue Shopping
          </button>

        </div>

      ) : (

        <div className="space-y-4">

          {cart.items.map((item) => {

            if (!item.productId) {
              return null;
            }

            const stock =
              item.productId.stock;

            const stockIssue =
              stock <= 0 ||
              item.quantity > stock;

            return (
              <div
                key={item.productId._id}
                className={`
                  p-4
                  border
                  rounded
                  ${
                    stockIssue
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }
                `}
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">


                  {/* PRODUCT */}

                  <div className="flex items-center gap-4">

                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="
                        w-20
                        h-20
                        object-cover
                        rounded
                      "
                    />

                    <div>

                      <h2 className="text-lg font-semibold">
                        {item.productId.title}
                      </h2>

                      <p className="text-gray-600">
                        ₹
                        {item.productId.price.toFixed(2)}
                      </p>


                      {/* STOCK */}

                      {stock > 0 ? (

                        <p className="text-sm text-green-600 mt-1">
                          {stock <= 5
                            ? `Only ${stock} left`
                            : "In stock"}
                        </p>

                      ) : (

                        <p className="text-sm text-red-600 mt-1 font-medium">
                          Out of stock
                        </p>

                      )}


                      {/* STOCK ISSUE */}

                      {stockIssue && stock > 0 && (
                        <p className="text-sm text-red-600 font-medium mt-1">
                          Only {stock} available.
                          Please reduce quantity.
                        </p>
                      )}

                    </div>

                  </div>


                  {/* QUANTITY */}

                  <div className="flex items-center gap-2">

                    <button
                      onClick={() =>
                        updateQty(
                          item.productId._id,
                          item.quantity - 1
                        )
                      }
                      className="
                        px-3
                        py-2
                        bg-gray-200
                        rounded
                        hover:bg-gray-300
                      "
                    >
                      −
                    </button>


                    <span
                      className="
                        px-4
                        font-semibold
                        min-w-[40px]
                        text-center
                      "
                    >
                      {item.quantity}
                    </span>


                    <button
                      onClick={() =>
                        updateQty(
                          item.productId._id,
                          item.quantity + 1
                        )
                      }
                      disabled={
                        stock <= 0 ||
                        item.quantity >= stock
                      }
                      className="
                        px-3
                        py-2
                        bg-gray-200
                        rounded
                        hover:bg-gray-300
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                      "
                    >
                      +
                    </button>

                  </div>


                  {/* ITEM TOTAL */}

                  <div>

                    <p className="font-semibold">
                      ₹
                      {(
                        item.productId.price *
                        item.quantity
                      ).toFixed(2)}
                    </p>

                  </div>


                  {/* REMOVE */}

                  <button
                    onClick={() =>
                      removeItem(
                        item.productId._id
                      )
                    }
                    className="
                      text-red-500
                      hover:text-red-700
                      font-medium
                    "
                  >
                    Remove
                  </button>

                </div>

              </div>
            );
          })}


          {/* STOCK WARNING */}

          {hasStockIssue && (

            <div
              className="
                p-4
                rounded-lg
                bg-red-50
                border
                border-red-200
              "
            >

              <h3 className="font-semibold text-red-700">
                Stock unavailable
              </h3>

              <p className="text-sm text-red-600 mt-1">
                Some products have insufficient stock.
                Please update your cart before checkout.
              </p>

            </div>

          )}


          {/* SUMMARY */}

          <div className="text-right mt-6">

            <h2 className="text-xl font-bold">
              Total: ₹{total.toFixed(2)}
            </h2>

          </div>


          {/* CHECKOUT */}

          <button
            onClick={() =>
              navigate("/checkout-address")
            }
            disabled={hasStockIssue}
            className="
              w-full
              bg-blue-500
              hover:bg-blue-600
              disabled:bg-gray-300
              disabled:text-gray-500
              disabled:cursor-not-allowed
              text-white
              p-3
              rounded
              font-semibold
            "
          >
            {hasStockIssue
              ? "Update Cart Quantity"
              : "Proceed to Checkout"}
          </button>

        </div>

      )}

    </div>
  );
}