
import { useParams, useNavigate } from "react-router";

export default function OrderSuccess() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg text-center">

                <div className="text-5xl mb-4">✅</div>

                <h1 className="text-3xl font-bold text-green-600">
                    Order Placed Successfully!
                </h1>

                <p className="text-gray-600 mt-3">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>

                <div className="mt-6 border rounded-lg p-4 bg-gray-50">
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-semibold text-gray-800 break-all">
                        {id}
                    </p>
                </div>

                <button
                    onClick={() => navigate("/")}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                >
                    Continue Shopping
                </button>

            </div>
        </div>
    );
}

