import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Login from "./Login.jsx";
import "./home.css"
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
function Home() {
    const [name, setName] = useState("");
    const [todoList, setTodoList] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState("");



    const handleDelete = async (_id) => {
        // console.log("delete function called");
        await axios.post(`http://localhost:5000/todo/delete/${_id}`, {}, {
            withCredentials: true
        }).then(res => {
            // console.log("res in deletefunction");
            setTodoList(prev => prev.filter(todo => todo._id !== _id));
        }).catch(err => {
            setTodoList([]);
            // console.log("errror catch in deletefunction");
            // console.log(err);
        })
    }

    const fetchTodo = async () => {
        await axios.get("http://localhost:5000/todo/get", {
            withCredentials: true
        })
            .then(res => {
                setTodoList(res.data.todos)
            }).catch(err => {
                // setTodoList([]);
                toast.error(err.response?.data?.message || "some thing went wrong", {
                    position: "top-center",
                    autoClose: 1000, // 1 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            }
            )
    }
    useEffect(() => {
        async function fetchData() {
            await axios.get("http://localhost:5000/user/profile", {
                withCredentials: true
            }).then(res => {
                // console.log(res.data.user.username);
                setUser(res.data.user.username)
            }).catch(err => console.log(err)
            )
        }
        fetchData();
        fetchTodo();
    }, [])

    if (user === "") {
        return <Login />
    }

    const handlelogout = async () => {
        await axios.post("http://localhost:5000/user/logout",
            {},
            {
                withCredentials: true
            }).then(res => {
                const MySwal = withReactContent(Swal);

                MySwal.fire({
                    icon: 'success',
                    title: res?.data?.message,
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate("/login")
            }).catch(err => {
                toast.error(err.response?.data?.message || "Some thing went wrong.", {
                    position: "top-center",
                    autoClose: 1000, // 1 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            })
    }


    const handlesubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/todo/create", {
            name,
            completed: false
        },
            {
                withCredentials: true
            }
        ).then(res => {
            

            // fetchTodo();//, it works but not optimal
            setTodoList(prev => [...prev, res.data.todo])
            setName("");

        }).catch(err => {
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


    const handlecheck = async (todo) => {
        await axios.post(`http://localhost:5000/todo/update/${todo._id}`, {}, {
            withCredentials: true
        }).then(res => {
            const updatedtodo = res.data.availabletodo
            // fetchTodo(); 
            setTodoList(prev =>
                prev.map(eachtodo =>
                    eachtodo._id === todo._id ? updatedtodo : eachtodo
                )
            );

        }).catch(err =>
            toast.error(err.response?.data?.message || "some thing went wrong", {
                position: "top-center",
                autoClose: 1000, // 1 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        )
    }

    return (
        <div className='todobox'>
            <div className="name">
                <h1 >
                    {user}'s Todo List

                </h1>
            </div>
            <form onSubmit={handlesubmit} className="todo-input">
                <input type="text"
                    placeholder="Enter your task"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" className="todo-add">Add</button>
            </form>
            <div>
                {(todoList.length === 0) ? <h1>no to do available</h1> : <ul>
                    {
                        todoList.map((todo) => (
                            <li className="c" key={todo._id}>
                                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                                    {todo.name}
                                </span>
                                <input className="check" type="checkbox" onChange={(e) => handlecheck(todo)} checked={todo.completed}></input>
                                <button className="deleteBtn" onClick={() => handleDelete(todo._id)}>delete</button>
                            </li>
                        ))
                    }

                </ul>}

            </div>





            <button onClick={handlelogout} className="logout-btn">Log Out</button>
            <footer>Name:-{user}</footer>
            <ToastContainer />
        </div>
    )

}

export default Home