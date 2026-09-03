

import Address from "../models/Address.js";


export const saveAddress = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const {
      fullName,
      phone,
      addressLine,
      city,
      state,
      pincode,
    } = req.body;

    if (
      !fullName ||
      !phone ||
      !addressLine ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        message: "All address fields are required",
        received: req.body,
      });
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      return res.status(400).json({
        message: "Invalid phone number",
        phone,
      });
    }

    if (!/^[1-9][0-9]{5}$/.test(pincode.trim())) {
      return res.status(400).json({
        message: "Invalid pincode",
        pincode,
      });
    }

    const address = await Address.create({
      userId: req.user.id,
      fullName: fullName.trim(),
      phone: phone.trim(),
      addressLine: addressLine.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      country: "India",
    });

    return res.status(201).json({
      message: "Address saved successfully",
      address,
    });

  } catch (error) {
    console.error("SAVE ADDRESS ERROR:", error);

    if (error.name === "ValidationError") {
      const errors = {};

      Object.keys(error.errors).forEach((field) => {
        errors[field] = error.errors[field].message;
      });

      return res.status(400).json({
        message: "Mongoose validation failed",
        errors,
      });
    }

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get logged-in user's addresses
// export const getAddress = async (req, res) => {
//   try {
//     const address = await Address.find({
//       userId: req.user.id,
//     }).sort({ createdAt: -1 });

//     res.json(address);
//   } catch (error) {
//     console.error("Get address error:", error);

//     res.status(500).json({
//       message: "Error fetching address",
//       error: error.message,
//     });
//   }
// };

export const getAddress = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const addresses = await Address.find({
      userId: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(3);

    return res.status(200).json(addresses);
  } catch (error) {
    console.error("GET ADDRESS ERROR:", error);

    return res.status(500).json({
      message: "Error fetching addresses",
      error: error.message,
    });
  }
};
