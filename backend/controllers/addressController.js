

// import Address from "../models/Address.js";

// // Save address
// export const saveAddress = async (req, res) => {
//   try {
//     const address = await Address.create({
//       ...req.body,
//       userId: req.user.id,
//     });

//     res.json({
//       message: "Address saved successfully",
//       address,
//     });
//   } catch (error) {
//     console.error("Save address error:", error);

//     res.status(500).json({
//       message: "Error saving address",
//       error: error.message,
//     });
//   }
// };

// // Get logged-in user's addresses
// export const getAddress = async (req, res) => {
//   try {
//     const address = await Address.find({
//       userId: req.user.id,
//     }).sort({createdAt:-1})

//     res.json(address);
//   } catch (error) {
//     console.error("Get address error:", error);

//     res.status(500).json({
//       message: "Error fetching address",
//       error: error.message,
//     });
//   }
// };



import Address from "../models/Address.js";

// Save address
// export const saveAddress = async (req, res) => {
//   try {
//     const {
//       fullName,
//       phone,
//       addressLine,
//       city,
//       state,
//       pincode,
//     } = req.body;

//     // Required fields
//     if (
//       !fullName ||
//       !phone ||
//       !addressLine ||
//       !city ||
//       !state ||
//       !pincode
//     ) {
//       return res.status(400).json({
//         message: "All address fields are required",
//       });
//     }

//     // Full name validation
//     if (fullName.trim().length < 2) {
//       return res.status(400).json({
//         message: "Full name must be at least 2 characters",
//       });
//     }

//     if (fullName.trim().length > 50) {
//       return res.status(400).json({
//         message: "Full name cannot exceed 50 characters",
//       });
//     }

//     // Phone validation
//     if (!/^[6-9]\d{9}$/.test(phone.trim())) {
//       return res.status(400).json({
//         message: "Please enter a valid 10-digit Indian mobile number",
//       });
//     }

//     // Address validation
//     if (addressLine.trim().length < 5) {
//       return res.status(400).json({
//         message: "Address must be at least 5 characters",
//       });
//     }

//     if (addressLine.trim().length > 200) {
//       return res.status(400).json({
//         message: "Address cannot exceed 200 characters",
//       });
//     }

//     // City validation
//     if (city.trim().length < 2) {
//       return res.status(400).json({
//         message: "City must be at least 2 characters",
//       });
//     }

//     // State validation
//     if (state.trim().length < 2) {
//       return res.status(400).json({
//         message: "State must be at least 2 characters",
//       });
//     }

//     // Pincode validation
//     if (!/^[1-9][0-9]{5}$/.test(pincode.trim())) {
//       return res.status(400).json({
//         message: "Please enter a valid 6-digit pincode",
//       });
//     }

//     // Create address
//     const address = await Address.create({
//       userId: req.user.id,
//       fullName: fullName.trim(),
//       phone: phone.trim(),
//       addressLine: addressLine.trim(),
//       city: city.trim(),
//       state: state.trim(),
//       pincode: pincode.trim(),
//       country: "India",
//     });

//     res.status(201).json({
//       message: "Address saved successfully",
//       address,
//     });
//   } catch (error) {
//     console.error("Save address error:", error);

//     // Mongoose validation error
//     if (error.name === "ValidationError") {
//       const errors = {};

//       Object.keys(error.errors).forEach((field) => {
//         errors[field] = error.errors[field].message;
//       });

//       return res.status(400).json({
//         message: "Please correct the address",
//         errors,
//       });
//     }

//     res.status(500).json({
//       message: "Error saving address",
//     });
//   }
// };


//save 2

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
export const getAddress = async (req, res) => {
  try {
    const address = await Address.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(address);
  } catch (error) {
    console.error("Get address error:", error);

    res.status(500).json({
      message: "Error fetching address",
      error: error.message,
    });
  }
};