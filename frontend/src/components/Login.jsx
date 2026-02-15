import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from "axios"
import "./login.css"
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://todo-fullstack-project-1.onrender.com/user/login", {
      email,
      password
    },
      {
        withCredentials: true
      }).then(async (res) => {

        const MySwal = withReactContent(Swal);

        MySwal.fire({
          icon: 'success',
          title: res?.data?.message,
          timer: 1500,
          showConfirmButton: false
        });

        await axios.get(
          "https://todo-fullstack-project-1.onrender.com/user/profile",
          { withCredentials: true }
        );

        navigate("/");
        //     setTimeout(() => {
        //     navigate("/");
        // }, 1000);
      }).catch(err => {
        // console.log(err);

        toast.error(err.response?.data?.message || "some thing went wrong", {
          position: "top-center",
          autoClose: 1000, // 1 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })



  }

  return (
    <div className="container">
      <form onSubmit={handlesubmit}>
        <h1>Login Page</h1>
        <input type='email'
          placeholder=' Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        <p>Not Registered ? <Link className="link" to="/register">Sign Up</Link></p>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login