import "./signup.css"
import { Link } from 'react-router-dom'
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
function Signup() {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleform = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/user/register", {
                username,
                email,
                password
            });
            
            const MySwal = withReactContent(Swal);

            MySwal.fire({
                icon: 'success',
                title: response?.data?.message,
                timer: 1500,
                showConfirmButton: false
            });

            
                navigate("/login");
          
        } catch (error) {
            toast.error(error.response?.data?.message || "some thing went wrong")

        }
        setEmail("");
        setName("");
        setPassword("");

    }

    return (
        <div className="container">
            <form onSubmit={handleform}>
                <h1>SignUp Page</h1>
                <input
                    type='text'
                    placeholder=' Name'
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button type="submit">Sign Up</button>
                <p>Already have an account ? <Link className="link" to="/login">Log In</Link></p>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup