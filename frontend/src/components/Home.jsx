// import { useEffect, useState } from "react"
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";
// import Login from "./Login.jsx";
// import "./home.css"
// import { ToastContainer, toast } from 'react-toastify';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// function Home() {
//     const [name, setName] = useState("");
//     const [todoList, setTodoList] = useState([]);
//     const navigate = useNavigate();
//     const [user, setUser] = useState("null");
//     const [loading,setLoading]=useState(true);

//     const handleDelete = async (_id) => {
//         // console.log("delete function called");
//         await axios.post(`https://todo-fullstack-project-1.onrender.com/todo/delete/${_id}`, {}, {
//             withCredentials: true
//         }).then(res => {
//             // console.log("res in deletefunction");
//             setTodoList(prev => prev.filter(todo => todo._id !== _id));
//         }).catch(err => {
//             setTodoList([]);
//             // console.log("errror catch in deletefunction");
//             // console.log(err);
//         })
//     }

//     const fetchTodo = async () => {
//         await axios.get("https://todo-fullstack-project-1.onrender.com/todo/get", {
//             withCredentials: true
//         })
//             .then(res => {
//                 setTodoList(res.data.todos)
//             }).catch(err => {
//                 // setTodoList([]);
//                 toast.error(err.response?.data?.message || "some thing went wrong", {
//                     position: "top-center",
//                     autoClose: 1000, // 1 seconds
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                 })
//             }
//             )
//     }
//     useEffect(() => {
//         async function fetchData() {

//             try {
                
//             } catch (error) {
                
//             }
//             await axios.get("https://todo-fullstack-project-1.onrender.com/user/profile", {
//                 withCredentials: true
//             }).then(res => {
//                 // console.log(res.data.user.username);
//                 setUser(res.data.user.username)
//             }).catch(err => console.log(err)
//             )
//         }
//         fetchData();
//         fetchTodo();
//     }, [])

//     if (user === "") {
//         return <Login />
//     }

//     const handlelogout = async () => {
//         await axios.post("https://todo-fullstack-project-1.onrender.com/user/logout",
//             {},
//             {
//                 withCredentials: true
//             }).then(res => {
//                 const MySwal = withReactContent(Swal);

//                 MySwal.fire({
//                     icon: 'success',
//                     title: res?.data?.message,
//                     timer: 1500,
//                     showConfirmButton: false
//                 });
//                 navigate("/login")
//             }).catch(err => {
//                 toast.error(err.response?.data?.message || "Some thing went wrong.", {
//                     position: "top-center",
//                     autoClose: 1000, // 1 seconds
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                 })
//             })
//     }


//     const handlesubmit = async (e) => {
//         e.preventDefault();
//         await axios.post("https://todo-fullstack-project-1.onrender.com/todo/create", {
//             name,
//             completed: false
//         },
//             {
//                 withCredentials: true
//             }
//         ).then(res => {
            

//             // fetchTodo();//, it works but not optimal
//             setTodoList(prev => [...prev, res.data.todo])
//             setName("");

//         }).catch(err => {
//             toast.error(err.response?.data?.message || "some thing went wrong", {
//                 position: "top-center",
//                 autoClose: 1000, // 1 seconds
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//             });
//         })
//     }


//     const handlecheck = async (todo) => {
//         await axios.post(`https://todo-fullstack-project-1.onrender.com/todo/update/${todo._id}`, {}, {
//             withCredentials: true
//         }).then(res => {
//             const updatedtodo = res.data.availabletodo
//             // fetchTodo(); 
//             setTodoList(prev =>
//                 prev.map(eachtodo =>
//                     eachtodo._id === todo._id ? updatedtodo : eachtodo
//                 )
//             );

//         }).catch(err =>
//             toast.error(err.response?.data?.message || "some thing went wrong", {
//                 position: "top-center",
//                 autoClose: 1000, // 1 seconds
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//             })
//         )
//     }

//     return (
//         <div className='todobox'>
//             <div className="name">
//                 <h1 >
//                     {user}'s Todo List

//                 </h1>
//             </div>
//             <form onSubmit={handlesubmit} className="todo-input">
//                 <input type="text"
//                     placeholder="Enter your task"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//                 <button type="submit" className="todo-add">Add</button>
//             </form>
//             <div>
//                 {(todoList.length === 0) ? <h1>no to do available</h1> : <ul>
//                     {
//                         todoList.map((todo) => (
//                             <li className="c" key={todo._id}>
//                                 <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
//                                     {todo.name}
//                                 </span>
//                                 <input className="check" type="checkbox" onChange={(e) => handlecheck(todo)} checked={todo.completed}></input>
//                                 <button className="deleteBtn" onClick={() => handleDelete(todo._id)}>delete</button>
//                             </li>
//                         ))
//                     }

//                 </ul>}

//             </div>





//             <button onClick={handlelogout} className="logout-btn">Log Out</button>
//             <footer>Name:-{user}</footer>
//             <ToastContainer />
//         </div>
//     )

// }

// export default Home





import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "./Login.jsx";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Home() {
    const [name, setName] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ================= FETCH TODOS =================
    const fetchTodo = async () => {
        try {
            const res = await axios.get(
                "https://todo-fullstack-project-1.onrender.com/todo/get",
                { withCredentials: true }
            );
            setTodoList(res.data.todos);
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Something went wrong",
                { position: "top-center", autoClose: 1000 }
            );
        }
    };

    // ================= FETCH USER PROFILE =================
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(
                    "https://todo-fullstack-project-1.onrender.com/user/profile",
                    { withCredentials: true }
                );

                setUser(res.data.user.username);
                await fetchTodo();
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // ================= DELETE TODO =================
    const handleDelete = async (_id) => {
        try {
            await axios.post(
                `https://todo-fullstack-project-1.onrender.com/todo/delete/${_id}`,
                {},
                { withCredentials: true }
            );

            setTodoList((prev) => prev.filter((todo) => todo._id !== _id));
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Delete failed",
                { position: "top-center", autoClose: 1000 }
            );
        }
    };

    // ================= CREATE TODO =================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) return;

        try {
            const res = await axios.post(
                "https://todo-fullstack-project-1.onrender.com/todo/create",
                { name, completed: false },
                { withCredentials: true }
            );

            setTodoList((prev) => [...prev, res.data.todo]);
            setName("");
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Create failed",
                { position: "top-center", autoClose: 1000 }
            );
        }
    };

    // ================= UPDATE TODO =================
    const handleCheck = async (todo) => {
        try {
            const res = await axios.post(
                `https://todo-fullstack-project-1.onrender.com/todo/update/${todo._id}`,
                {},
                { withCredentials: true }
            );

            const updatedTodo = res.data.availabletodo;

            setTodoList((prev) =>
                prev.map((t) =>
                    t._id === todo._id ? updatedTodo : t
                )
            );
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Update failed",
                { position: "top-center", autoClose: 1000 }
            );
        }
    };

    // ================= LOGOUT =================
    const handleLogout = async () => {
        try {
            const res = await axios.post(
                "https://todo-fullstack-project-1.onrender.com/user/logout",
                {},
                { withCredentials: true }
            );

            const MySwal = withReactContent(Swal);

            MySwal.fire({
                icon: "success",
                title: res?.data?.message,
                timer: 1500,
                showConfirmButton: false,
            });

            navigate("/login");
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Logout failed",
                { position: "top-center", autoClose: 1000 }
            );
        }
    };

    // ================= LOADING STATE =================
    if (loading) {
        return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
    }

    // ================= NOT LOGGED IN =================
    if (!user) {
        return <Login />;
    }

    // ================= MAIN UI =================
    return (
        <div className="todobox">
            <div className="name">
                <h1>{user}'s Todo List</h1>
            </div>

            <form onSubmit={handleSubmit} className="todo-input">
                <input
                    type="text"
                    placeholder="Enter your task"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" className="todo-add">
                    Add
                </button>
            </form>

            <div>
                {todoList.length === 0 ? (
                    <h2>No todo available</h2>
                ) : (
                    <ul>
                        {todoList.map((todo) => (
                            <li className="c" key={todo._id}>
                                <span
                                    style={{
                                        textDecoration: todo.completed
                                            ? "line-through"
                                            : "none",
                                    }}
                                >
                                    {todo.name}
                                </span>

                                <input
                                    className="check"
                                    type="checkbox"
                                    onChange={() => handleCheck(todo)}
                                    checked={todo.completed}
                                />

                                <button
                                    className="deleteBtn"
                                    onClick={() => handleDelete(todo._id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button onClick={handleLogout} className="logout-btn">
                Log Out
            </button>

            <footer>Name: {user}</footer>

            <ToastContainer />
        </div>
    );
}

export default Home;
