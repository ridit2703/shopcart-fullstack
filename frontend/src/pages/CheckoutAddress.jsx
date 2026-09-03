
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function CheckoutAddress() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error when user changes the field
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Full name
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName =
        "Full name must be at least 2 characters";
    } else if (form.fullName.trim().length > 50) {
      newErrors.fullName =
        "Full name cannot exceed 50 characters";
    }

    // Phone
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      newErrors.phone =
        "Enter a valid 10-digit Indian mobile number";
    }

    // Address
    if (!form.addressLine.trim()) {
      newErrors.addressLine = "Address is required";
    } else if (form.addressLine.trim().length < 5) {
      newErrors.addressLine =
        "Address must be at least 5 characters";
    } else if (form.addressLine.trim().length > 200) {
      newErrors.addressLine =
        "Address cannot exceed 200 characters";
    }

    // City
    if (!form.city.trim()) {
      newErrors.city = "City is required";
    } else if (form.city.trim().length < 2) {
      newErrors.city = "City must be at least 2 characters";
    }

    // State
    if (!form.state.trim()) {
      newErrors.state = "State is required";
    } else if (form.state.trim().length < 2) {
      newErrors.state = "State must be at least 2 characters";
    }

    // Pincode
    if (!form.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[1-9][0-9]{5}$/.test(form.pincode.trim())) {
      newErrors.pincode =
        "Enter a valid 6-digit pincode";
    }

    return newErrors;
  };

  const saveAddress = async (e) => {
    e.preventDefault();

    // Frontend validation
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      // Don't send userId from frontend
      const response = await api.post("/address/add", form);

      console.log(response.data);

      navigate("/checkout");
    } catch (error) {
      console.error("Address save error:", error);
          console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);

      // Backend validation errors
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(
          error.response?.data?.message ||
            "Failed to save address"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Delivery Address
      </h1>

      <form onSubmit={saveAddress} className="space-y-4">

        {/* Full Name */}
        <div>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            placeholder="Full Name"
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.fullName
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            placeholder="Phone Number"
            maxLength={10}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.phone
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <input
            type="text"
            name="addressLine"
            value={form.addressLine}
            placeholder="Address"
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.addressLine
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          {errors.addressLine && (
            <p className="text-red-500 text-sm mt-1">
              {errors.addressLine}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <input
            type="text"
            name="city"
            value={form.city}
            placeholder="City"
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.city
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          {errors.city && (
            <p className="text-red-500 text-sm mt-1">
              {errors.city}
            </p>
          )}
        </div>

        {/* State */}
        <div>
          <input
            type="text"
            name="state"
            value={form.state}
            placeholder="State"
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.state
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          {errors.state && (
            <p className="text-red-500 text-sm mt-1">
              {errors.state}
            </p>
          )}
        </div>

        {/* Pincode */}
        <div>
          <input
            type="text"
            name="pincode"
            value={form.pincode}
            placeholder="Pincode"
            maxLength={6}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.pincode
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          {errors.pincode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pincode}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Address"}
        </button>

      </form>
    </div>
  );
}