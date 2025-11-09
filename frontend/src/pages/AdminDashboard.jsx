import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { TaskContext } from '../context/TasksContext';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';


const AdminDashboard = () => {

    const { allTasks, setAllTasks, getTasks, stats, setStats } = useContext(TaskContext)
    // const { user, setUser } = useContext(AuthContext)

    const { allUsers, setAllUsers, getAllUser } = useContext(UserContext);

    const [taskDetails, setTaskDetails] = useState({
        taskTitle: '',
        taskDate: '',
        taskAssignedTo: '',
        TaskCategory: '',
        taskDescription: ''
    })


    function handleChange(e) {
        setTaskDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    console.log(taskDetails)


    // function to create tasks 
    async function handleCreateTask() {
        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_BASE_URL}task/create`,
                data: taskDetails,
                withCredentials: true
            })
            const { message, success } = response.data;
            if (success) {
                console.log(message)
                toast(message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                getTasks();
                setTaskDetails({ taskTitle: '', taskDate: '', taskAssignedTo: '', TaskCategory: '', taskDescription: '' })
            }
        }
        catch (error) {
            console.error('Create Task error', error)
        }
    }


    return (
        <div>

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <Navbar />

            {/* admins dashboard */}
            <div className='min-h-[calc(100vh-70px)] flex flex-col gap-4 bg-black px-16 py-4'>

                {/* Top */}
                <div className="bg-gray-800 text-white px-8 py-5 rounded-2xl shadow-lg flex gap-8 ">

                    {/* Left side */}
                    <div className="flex flex-col gap-2 w-1/2">
                        {/* Task Title */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1">Task Title</label>
                            <input
                                value={taskDetails.taskTitle}
                                onChange={handleChange}
                                name='taskTitle'
                                type="text"
                                placeholder="Enter task title"
                                className="p-2 rounded-lg text-black outline-none"
                            />
                        </div>

                        {/* Date */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1">Date</label>
                            <input
                                value={taskDetails.taskDate}
                                onChange={handleChange}
                                name='taskDate'
                                type="date"
                                className="p-2 rounded-lg text-black outline-none"
                            />
                        </div>

                        {/* Assign To */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1">Assign To</label>
                            <input
                                value={taskDetails.taskAssignedTo}
                                onChange={handleChange}
                                name='taskAssignedTo'
                                type="text"
                                placeholder="Enter assignee name"
                                className="p-2 rounded-lg text-black outline-none"
                            />
                        </div>

                        {/* Category */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1">Category</label>
                            <input
                                value={taskDetails.TaskCategory}
                                onChange={handleChange}
                                name='TaskCategory'
                                type="text"
                                placeholder="Enter Task Category"
                                className="p-2 rounded-lg text-black outline-none"
                            />
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col w-1/2">
                        <label className="font-semibold mb-2">Description</label>
                        <textarea
                            value={taskDetails.taskDescription}
                            onChange={handleChange}
                            name='taskDescription'
                            rows="7"
                            placeholder="Write task description..."
                            className="p-3 rounded-lg text-black outline-none resize-none"
                        ></textarea>

                        <button
                            onClick={() => { handleCreateTask() }}
                            type='submit'
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200">
                            Create Task
                        </button>
                    </div>
                </div>

                {/* table */}
                <div className="bg-gray-800 text-white px-8 py-5 rounded-2xl max-h-[300px] shadow-lg overflow-y-auto">

                    <h2 className="text-2xl font-bold mb-4">Employee Task Overview</h2>

                    <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left">Employee Name</th>
                                <th className="py-3 px-4 text-left">New Task</th>
                                <th className="py-3 px-4 text-left">Active Task</th>
                                <th className="py-3 px-4 text-left">Completed</th>
                                <th className="py-3 px-4 text-left">Failed</th>
                            </tr>
                        </thead>

                        <tbody>

                            {allUsers.map((users, index) => {
                                return (<tr key={index} className="hover:bg-gray-700 transition">
                                    <td className="py-3 px-4 border-t border-gray-700">{users.name}</td>
                                    <td className="py-3 px-4 border-t border-gray-700">{users.stats?.New || 0}</td>
                                    <td className="py-3 px-4 border-t border-gray-700">{users.stats?.Active || 0}</td>
                                    <td className="py-3 px-4 border-t border-gray-700 text-green-400">{users.stats?.Completed || 0}</td>
                                    <td className="py-3 px-4 border-t border-gray-700 text-red-400">{users.stats?.Failed || 0}</td>
                                </tr>)
                            })}

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default AdminDashboard
