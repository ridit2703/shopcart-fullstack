


import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Checkout() {
    const [addresses, setAddresses] = useState([]);
    const [selectAddress, setSelectAddress] = useState(null);
    const [cart, setCart] = useState(null);

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [placingOrder, setPlacingOrder] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCheckoutData = async () => {
            try {
                const [cartRes, addressRes] = await Promise.all([
                    api.get("/cart"),
                    api.get("/address"),
                ]);

                setCart(cartRes.data);
                setAddresses(addressRes.data);

                if (addressRes.data.length > 0) {
                    setSelectAddress(addressRes.data[0]);
                }
            } catch (err) {
                console.error(err);

                alert(
                    err.response?.data?.message ||
                    "Failed to load checkout details"
                );
            }
        };

        fetchCheckoutData();
    }, []);

    const placeOrder = async () => {
        if (!selectAddress) {
            alert("Please select an address");
            return;
        }

        if (!cart || cart.items.length === 0) {
            alert("Your cart is empty");
            return;
        }

        try {
            setPlacingOrder(true);

            // =========================
            // CASH ON DELIVERY
            // =========================

            if (paymentMethod === "COD") {
                const res = await api.post("/order/place", {
                    address: selectAddress,
                });

                console.log("COD Order:", res.data);

                navigate(
                    `/order-success/${res.data.order._id}`
                );

                return;
            }

            // =========================
            // STRIPE
            // =========================

            if (paymentMethod === "STRIPE") {
                const res = await api.post("/order/checkout", {
                    address: selectAddress,
                });

                console.log("Stripe Response:", res.data);

                // Redirect to Stripe Checkout
                window.location.href = res.data.url;
            }

        } catch (err) {
            console.error("Order error:", err);

            alert(
                err.response?.data?.message ||
                "Failed to place order"
            );
        } finally {
            setPlacingOrder(false);
        }
    };

    if (!cart) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    const total = cart.items.reduce(
        (sum, item) =>
            sum + item.quantity * item.productId.price,
        0
    );

    return (
        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">
                Checkout
            </h1>


            {/* ========================= */}
            {/* ADDRESS */}
            {/* ========================= */}

            <h2 className="font-semibold text-lg mb-3">
                Select Address
            </h2>

            {addresses.length === 0 ? (
                <div className="border p-4 rounded">
                    <p className="text-gray-600">
                        No address found.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/checkout-address")
                        }
                        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add Address
                    </button>
                </div>
            ) : (
                <div className="space-y-3">

                    {addresses.map((addr) => (
                        <label
                            key={addr._id}
                            className={`block border p-4 rounded cursor-pointer ${
                                selectAddress?._id === addr._id
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300"
                            }`}
                        >

                            <div className="flex items-start">

                                <input
                                    type="radio"
                                    name="address"
                                    checked={
                                        selectAddress?._id ===
                                        addr._id
                                    }
                                    onChange={() =>
                                        setSelectAddress(addr)
                                    }
                                    className="mr-3 mt-1"
                                />

                                <div>
                                    <strong>
                                        {addr.fullName}
                                    </strong>

                                    <p className="text-sm text-gray-600">
                                        {addr.addressLine},{" "}
                                        {addr.city},{" "}
                                        {addr.state} -{" "}
                                        {addr.pincode}
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        {addr.phone}
                                    </p>
                                </div>

                            </div>

                        </label>
                    ))}

                </div>
            )}


            {/* ========================= */}
            {/* PAYMENT METHOD */}
            {/* ========================= */}

            <h2 className="font-semibold text-lg mt-6 mb-3">
                Payment Method
            </h2>

            <div className="space-y-3">

                {/* COD */}

                <label
                    className={`block border p-4 rounded cursor-pointer ${
                        paymentMethod === "COD"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300"
                    }`}
                >

                    <div className="flex items-center">

                        <input
                            type="radio"
                            name="paymentMethod"
                            value="COD"
                            checked={paymentMethod === "COD"}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                            className="mr-3"
                        />

                        <div>
                            <p className="font-semibold">
                                Cash on Delivery
                            </p>

                            <p className="text-sm text-gray-500">
                                Pay when your order arrives
                            </p>
                        </div>

                    </div>

                </label>


                {/* STRIPE */}

                <label
                    className={`block border p-4 rounded cursor-pointer ${
                        paymentMethod === "STRIPE"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300"
                    }`}
                >

                    <div className="flex items-center">

                        <input
                            type="radio"
                            name="paymentMethod"
                            value="STRIPE"
                            checked={paymentMethod === "STRIPE"}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                            className="mr-3"
                        />

                        <div>
                            <p className="font-semibold">
                                Pay Online with Stripe
                            </p>

                            <p className="text-sm text-gray-500">
                                Pay securely using your card
                            </p>
                        </div>

                    </div>

                </label>

            </div>


            {/* ========================= */}
            {/* ORDER SUMMARY */}
            {/* ========================= */}

            <div className="mt-6 border-t pt-4">

                <div className="flex justify-between text-lg font-semibold">

                    <span>
                        Total Amount
                    </span>

                    <span>
                        ₹{total}
                    </span>

                </div>


                <button
                    onClick={placeOrder}
                    disabled={
                        placingOrder ||
                        !selectAddress
                    }
                    className="mt-4 w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white p-3 rounded"
                >
                    {placingOrder
                        ? "Processing..."
                        : paymentMethod === "COD"
                        ? "Place Order"
                        : "Pay with Stripe"}
                </button>

            </div>

        </div>
    );
}