// import {useState} from "react"
// import {useNavigate} from "react-router"
// import api from "../api/axios"

// export default function Login(){
//   const [form,setForm]=useState({
//     email:"",
//     password:""
//   })
//   const [msg,setMsg]=useState("");
//   const navigate=useNavigate();

//   const handleChange=(e)=>{
//     setForm({
//       ...form,
//       [e.target.name]:e.target.value
//     });
//   }

//   const handleSubmit=async(e)=>{
//     e.preventDefault();

//     try{
//       const res=await api.post("/auth/login",form);
//       console.log(res,"data")

//       //save token to local storage
//       // localStorage.setItem("token",res.data.token );
//       // localStorage.setItem("userId",res.data.user.id)
//       // setMsg("Login successfully")

//       //save token
//       localStorage.setItem("token",res.data.token);
//       localStorage.setItem("user",JSON.stringify(res.data.user));
//       setMsg("login successfully")

//       //redirect to homepage
//       setTimeout(() => {
//         if(res.data.user.role==="admin"){
//           navigate("/admin/products");
//         }
//         else{
//           navigate("/")
//         }
        
//       }, 1000);




//     }
//     catch(err){
//       setMsg(err.response?.data?.message || "An error occurred");

//     }












//   }
//   return(
//     <div className="flex items-center justify-center min-h-screen bg-gray-500 px-4" >
//       <div  className=" bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
//         <h2 className=" text-2xl font-bold mb-6 text-center">Login To Your Account</h2>
//         {msg && (
//           <div className="mb-4 text-center text-sm text-blue-600 font-medium">{msg}</div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input type="email" name="email" placeholder="enter email" value={form.email} onChange={handleChange}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none " required  />

//           <input type="password" name="password" placeholder="enter password" value={form.password} onChange={handleChange}
//           className="w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 " required />

//           <button type="submit" className="w-full bg-blue-500 rounded-md hover:bg-blue-600 " >Login</button>
//         </form>
//       </div>

//     </div>
//   )
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router";
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setIsError(false);

    try {
      const res = await api.post("/auth/login", form);
      console.log(res, "data");

      // Save credentials
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      setMsg("Logged in successfully! Redirecting...");
      setIsError(false);

      // CRUCIAL: Tell the Navbar component to update its state instantly
      window.dispatchEvent(new Event("authChanged"));

      // Redirect based on role
      setTimeout(() => {
        if (res.data.user.role?.toLowerCase() === "admin") {
          navigate("/admin/products");
        } else {
          navigate("/");
        }
      }, 1000);

    } catch (err) {
      setIsError(true);
      setMsg(err.response?.data?.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-100 transition-all duration-300 hover:shadow-xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Welcome Back</h2>
          <p className="text-sm text-slate-500 mt-2">Please sign in to access your account</p>
        </div>

        {/* Notifications */}
        {msg && (
          <div className={`mb-6 p-3 rounded-lg text-center text-sm font-medium transition-all ${
            isError 
              ? "bg-red-50 text-red-600 border border-red-200" 
              : "bg-emerald-50 text-emerald-600 border border-emerald-200"
          }`}>
            {msg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              name="email" 
              placeholder="name@example.com" 
              value={form.email} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50/50" 
              required  
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Password
            </label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              value={form.password} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50/50" 
              required 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 px-4 mt-2 bg-blue-600 text-white font-medium rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading 
                ? "opacity-70 cursor-not-allowed bg-blue-500" 
                : "hover:bg-blue-700 active:scale-[0.99]"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
}
