// import { useState, useEffect } from "react";
// import api from "../api/axios.js";
// import { useNavigate } from "react-router";

// export default function Profile() {

//     const [profile, setProfile] = useState({
//         name: "",
//         email: ""
//     });

//     const [form, setForm] = useState({
//         name: "",
//         email: ""
//     });

//     const [passwordForm, setPasswordForm] = useState({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: ""
//     });

//     const [message, setMessage] = useState("");
//     const [error, setError] = useState("");

//     const navigate = useNavigate();


//     // Load profile
//     const loadProfile = async () => {
//         try {

//             const res = await api.get("/profile");

//             setProfile(res.data);

//             setForm({
//                 name: res.data.name,
//                 email: res.data.email
//             });

//         }
//         catch (error) {

//             console.log(
//                 error.response?.data || error.message
//             );

//             if (error.response?.status === 401) {
//                 navigate("/login");
//             }
//         }
//     };


//     useEffect(() => {
//         loadProfile();
//     }, []);


//     // Handle profile input
//     const handleProfileChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         });
//     };


//     // Handle password input
//     const handlePasswordChange = (e) => {
//         setPasswordForm({
//             ...passwordForm,
//             [e.target.name]: e.target.value
//         });
//     };


//     // Update profile
//     const updateProfile = async (e) => {

//         e.preventDefault();

//         setMessage("");
//         setError("");

//         try {

//             const res = await api.put("/profile", {
//                 name: form.name,
//                 email: form.email
//             });

//             setProfile(res.data.user);

//             // Update localStorage
//             localStorage.setItem(
//                 "user",
//                 JSON.stringify(res.data.user)
//             );

//             setMessage(res.data.message);

//         }
//         catch (error) {

//             console.log(
//                 error.response?.data || error.message
//             );

//             setError(
//                 error.response?.data?.message ||
//                 "Unable to update profile"
//             );
//         }
//     };


//     // Change password
//     const changePassword = async (e) => {

//         e.preventDefault();

//         setMessage("");
//         setError("");

//         if (
//             passwordForm.newPassword !==
//             passwordForm.confirmPassword
//         ) {
//             setError("New passwords do not match");
//             return;
//         }

//         try {

//             const res = await api.put(
//                 "/profile/password",
//                 {
//                     currentPassword:
//                         passwordForm.currentPassword,

//                     newPassword:
//                         passwordForm.newPassword
//                 }
//             );

//             setMessage(res.data.message);

//             setPasswordForm({
//                 currentPassword: "",
//                 newPassword: "",
//                 confirmPassword: ""
//             });

//         }
//         catch (error) {

//             console.log(
//                 error.response?.data || error.message
//             );

//             setError(
//                 error.response?.data?.message ||
//                 "Unable to change password"
//             );
//         }
//     };


//     return (

//         <div className="max-w-4xl mx-auto p-6">

//             <h1 className="text-3xl font-bold mb-6">
//                 My Profile
//             </h1>


//             {/* Messages */}

//             {message && (
//                 <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
//                     {message}
//                 </div>
//             )}

//             {error && (
//                 <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
//                     {error}
//                 </div>
//             )}


//             {/* Profile Information */}

//             <div className="border rounded-lg shadow p-6 mb-6">

//                 <h2 className="text-2xl font-semibold mb-5">
//                     Personal Information
//                 </h2>

//                 <form onSubmit={updateProfile}>

//                     {/* Name */}

//                     <div className="mb-4">

//                         <label className="block font-medium mb-2">
//                             Name
//                         </label>

//                         <input
//                             type="text"
//                             name="name"
//                             value={form.name}
//                             onChange={handleProfileChange}
//                             className="w-full border rounded px-3 py-2"
//                             required
//                         />

//                     </div>


//                     {/* Email */}

//                     <div className="mb-4">

//                         <label className="block font-medium mb-2">
//                             Email
//                         </label>

//                         <input
//                             type="email"
//                             name="email"
//                             value={form.email}
//                             onChange={handleProfileChange}
//                             className="w-full border rounded px-3 py-2"
//                             required
//                         />

//                     </div>


//                     <button
//                         type="submit"
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//                     >
//                         Update Profile
//                     </button>

//                 </form>

//             </div>


//             {/* Change Password */}

//             <div className="border rounded-lg shadow p-6">

//                 <h2 className="text-2xl font-semibold mb-5">
//                     Change Password
//                 </h2>

//                 <form onSubmit={changePassword}>

//                     {/* Current Password */}

//                     <div className="mb-4">

//                         <label className="block font-medium mb-2">
//                             Current Password
//                         </label>

//                         <input
//                             type="password"
//                             name="currentPassword"
//                             value={passwordForm.currentPassword}
//                             onChange={handlePasswordChange}
//                             className="w-full border rounded px-3 py-2"
//                             required
//                         />

//                     </div>


//                     {/* New Password */}

//                     <div className="mb-4">

//                         <label className="block font-medium mb-2">
//                             New Password
//                         </label>

//                         <input
//                             type="password"
//                             name="newPassword"
//                             value={passwordForm.newPassword}
//                             onChange={handlePasswordChange}
//                             className="w-full border rounded px-3 py-2"
//                             required
//                         />

//                     </div>


//                     {/* Confirm Password */}

//                     <div className="mb-4">

//                         <label className="block font-medium mb-2">
//                             Confirm New Password
//                         </label>

//                         <input
//                             type="password"
//                             name="confirmPassword"
//                             value={passwordForm.confirmPassword}
//                             onChange={handlePasswordChange}
//                             className="w-full border rounded px-3 py-2"
//                             required
//                         />

//                     </div>


//                     <button
//                         type="submit"
//                         className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
//                     >
//                         Change Password
//                     </button>

//                 </form>

//             </div>

//         </div>
//     );
// }



import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router";


export default function Profile() {

    const navigate = useNavigate();


    const [form, setForm] = useState({

        name: "",
        email: "",

        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        postalCode: "",
        country: ""

    });


    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    // Load Profile

    const loadProfile = async () => {

        try {

            const res = await api.get("/profile");


            const user = res.data.user;

            const address = res.data.address;


            setForm({

                name: user?.name || "",

                email: user?.email || "",

                fullName: address?.fullName || "",

                phone: address?.phone || "",

                addressLine: address?.addressLine || "",

                city: address?.city || "",

                state: address?.state || "",

                postalCode: address?.postalCode || "",

                country: address?.country || ""

            });

        }
        catch (error) {

            console.log(
                error.response?.data || error.message
            );


            if (error.response?.status === 401) {

                navigate("/login");

            }
            else {

                setError(
                    error.response?.data?.message ||
                    "Unable to load profile"
                );

            }

        }

    };


    useEffect(() => {

        loadProfile();

    }, []);


    // Handle Input

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };


    // Update Profile

    const updateProfile = async (e) => {

        e.preventDefault();

        setMessage("");

        setError("");


        try {

            const res = await api.put("/profile", {

                name: form.name,

                email: form.email,

                address: {

                    fullName: form.fullName,

                    phone: form.phone,

                    addressLine: form.addressLine,

                    city: form.city,

                    state: form.state,

                    postalCode: form.postalCode,

                    country: form.country

                }

            });


            // Update localStorage user

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );


            setMessage(
                res.data.message
            );


        }
        catch (error) {

            console.log(
                error.response?.data || error.message
            );


            setError(
                error.response?.data?.message ||
                "Unable to update profile"
            );

        }

    };


    return (

        <div className="max-w-4xl mx-auto p-6">


            <h1 className="text-3xl font-bold mb-6">

                My Profile

            </h1>


            {/* Success Message */}

            {message && (

                <div className="bg-green-100 text-green-700 p-3 rounded mb-5">

                    {message}

                </div>

            )}


            {/* Error Message */}

            {error && (

                <div className="bg-red-100 text-red-700 p-3 rounded mb-5">

                    {error}

                </div>

            )}


            <form
                onSubmit={updateProfile}
                className="border rounded-lg shadow p-6"
            >


                {/* Personal Information */}

                <h2 className="text-2xl font-semibold mb-5">

                    Personal Information

                </h2>


                {/* Name */}

                <div className="mb-4">

                    <label className="block font-medium mb-2">

                        Name

                    </label>


                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />

                </div>


                {/* Email */}

                <div className="mb-6">

                    <label className="block font-medium mb-2">

                        Email

                    </label>


                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />

                </div>


                {/* Address */}

                <h2 className="text-2xl font-semibold mb-5">

                    Address

                </h2>


                {/* Full Name */}

                <div className="mb-4">

                    <label className="block font-medium mb-2">

                        Full Name

                    </label>


                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />

                </div>


                {/* Phone */}

                <div className="mb-4">

                    <label className="block font-medium mb-2">

                        Phone

                    </label>


                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />

                </div>


                {/* Address Line */}

                <div className="mb-4">

                    <label className="block font-medium mb-2">

                        Address

                    </label>


                    <textarea
                        name="addressLine"
                        value={form.addressLine}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        rows="3"
                        required
                    />

                </div>


                {/* City */}

                <div className="mb-4">

                    <label className="block font-medium mb-2">

                        City

                    </label>


                    <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />

                </div>


                {/* State */}

                <div className="mb-4">

                    <label className="block font-medium mb-2">

                        State

                    </label>


                    <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />

                </div>


                {/* Postal Code */}

                <div className="mb-4">

                    <label className="block font-medium mb-2">

                        Postal Code

                    </label>


                    <input
                        type="text"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />

                </div>


                {/* Country */}

                <div className="mb-6">

                    <label className="block font-medium mb-2">

                        Country

                    </label>


                    <input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />

                </div>


                {/* Update Button */}

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700"
                >

                    Update Profile

                </button>


            </form>

        </div>

    );

}