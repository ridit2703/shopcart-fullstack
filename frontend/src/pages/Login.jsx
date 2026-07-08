import {useState} from "react"
import {useNavigate} from "react-router"
import api from "../api/axios"

export default function Login(){
  const [form,setForm]=useState({
    email:"",
    password:""
  })
  const [msg,setMsg]=useState("");
  const navigate=useNavigate();
}
