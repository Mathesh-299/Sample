import { Input } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Import toast here
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
const App = () => {
    const [users, setUser] = useState([])
    const [newName, setName] = useState("");
    const [newEmail, setEmail] = useState("");
    const [newwebsite, setWebsite] = useState("");
    useEffect(() => {
        fetch('https://66ee897f3ed5bb4d0bf131b4.mockapi.io/user')
            .then((response) => response.json())
            .then((json) => (setUser(json)))
    }, [])
    function addUser() {
        const name = newName.trim();
        const email = newEmail.trim();
        const website = newwebsite.trim();
        if (name && email && website) {
            fetch("https://66ee897f3ed5bb4d0bf131b4.mockapi.io/user",
                {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        email,
                        website
                    }),
                    headers: {
                        "Content-type": "application/json"
                    },
                }
            )
                .then((respose) => respose.json())
                .then((data) => {
                    setUser([...users, data]);
                    toast.success("User Added Successfully!");
                    // alert("User Added Success")
                    setName("")
                    setEmail("")
                    setWebsite("")

                })
        } else {
            toast.error("Please fill in all fields!"); // Display error toast if fields are empty
        }
    }
    function onChangeHandler(id, key, value) {
        setUser((users) => {
            return users.map(user => {
                return user.id === id ? { ...user, [key]: value } : user
            })
        })


    }
    function UpdateUser(id) {
        const user = users.find((user) => user.id === id);
        fetch(`https://66ee897f3ed5bb4d0bf131b4.mockapi.io/user/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(user),
                headers: {
                    "Content-type": "application/json"
                },
            }
        )
            .then((respose) => respose.json())
            .then((data) => {
                // setUser([...users, data]);
                toast.success("User Updated Successfully!");
                // alert("User Added Success")


            })
    }
    function deleteUser(id) {
        fetch(`https://66ee897f3ed5bb4d0bf131b4.mockapi.io/user/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setUser(users.filter(user => user.id !== id));
                toast.success("User Deleted Successfully!");
            })
            .catch(() => toast.error("Failed to Delete User!"));
    }

    return (
        <div className='container'>
            <table className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-extrabold text-sm">
                <thead className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 font-serif font-bold">
                    <th scope="col" className="px-6 py-3">1</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Website</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>
                                <input
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    placeholder="Type here..."
                                    value={user.email}
                                    onChange={(e) => onChangeHandler(user.id, 'email', e.target.value)} // Update email on change
                                />
                            </td>
                            <td>
                                <input
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    placeholder="Type here..."
                                    value={user.website}
                                    onChange={(e) => onChangeHandler(user.id, 'website', e.target.value)} // Update website on change
                                />
                            </td>

                            <td>
                                <button className="rounded-md bg-yellow-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button"
                                    onClick={() => UpdateUser(user.id)}>
                                    Update
                                </button>
                                <button className="rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none 
                                disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button" onClick={() => deleteUser(user.id)}>
                                    Delete                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td>
                            <Input value={newName}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Enter Your Name' />
                        </td>
                        <td>
                            <Input value={newEmail}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter Your Email' />
                        </td>
                        <td>
                            <Input value={newwebsite}
                                onChange={(e) => setWebsite(e.target.value)}
                                placeholder='Enter Your Website' />
                        </td>
                        <button className="rounded-md bg-green-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button" onClick={addUser}>
                            Add USer
                        </button>
                    </tr>
                </tfoot>
            </table><ToastContainer />
        </div>
    )
}

export default App