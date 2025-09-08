import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { Route, Routes } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    <ToastContainer 
        position="top-center"
        autoClose={2000} // 2 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
  </>
}

export default App
