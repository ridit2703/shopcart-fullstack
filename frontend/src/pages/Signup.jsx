import React ,{useState} from 'react'
import api from "../api/axios.js"


export default function Signup(){
  const [form,setForm]=useState({
    name:"",
    email:"",
    password:"",

  })
  const [msg,setMsg]=useState("");

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})


  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response =await api.post("/auth/signup",form);
      setMsg(response.data.message);

    }
    catch(err){
      setMsg(err.response?.data?.message || "an error moccured")
    }

  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500 px-4" >
      <div className=" bg-white p-8 rounded-lg shadow-md w-full max-w-sm">

        <h2 className=" text-2xl font-bold mb-6 text-center">Create Account</h2>
        {msg && (
          <div className="mb-4 text-center text-sm text-blue-200 font-medium">{msg}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name"  placeholder="enter the name" value={form.name} onChange={handleChange} 
          className="w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 " required/>

          <input type="email" name="email" placeholder='enter email'value={form.email} onChange={handleChange} 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none " required />

          <input type="password" name="password" placeholder="enter password" value={form.password} onChange={handleChange}
          className="w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 " required/>

          <button type="submit" className="w-full bg-blue-500 rounded-md hover:bg-blue-600 " >Signup</button>
        </form>

      </div>

    </div>
  )
}


