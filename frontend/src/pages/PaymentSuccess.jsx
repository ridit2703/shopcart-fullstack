import { useSearchParams, useNavigate } from "react-router";

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();

    const sessionId = searchParams.get("session_id");

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full">

                <div className="text-6xl mb-4">
                    ✅
                </div>

                <h1 className="text-3xl font-bold text-green-600">
                    Payment Successful!
                </h1>

                <p className="text-gray-600 mt-3">
                    Thank you for your order.
                </p>

                <p className="text-gray-600">
                    Your payment has been received.
                </p>

                {sessionId && (
                    <p className="text-xs text-gray-400 mt-4 break-all">
                        Session ID: {sessionId}
                    </p>
                )}

                <button
                    onClick={() => navigate("/")}
                    className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                    Continue Shopping
                </button>

            </div>

        </div>
    );
}
