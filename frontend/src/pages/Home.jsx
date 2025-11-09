import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { TaskContext } from '../context/TasksContext'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

const Home = () => {


  const { allTasks, setAllTasks, getTasks } = useContext(TaskContext);


  const [stats, setStats] = useState([
    { id: 1, title: "New Tasks", number: 0 },
    { id: 2, title: "Completed Tasks", number: 0 },
    { id: 3, title: "Accepted Tasks", number: 0 },
    { id: 3, title: "Failed Tasks", number: 0 },
  ]);

  // to confirm completion of task 
  async function handleStatus(taskId, status) {
    try {
      const response = await axios({
        method: 'put',
        url: `${import.meta.env.VITE_BASE_URL}task/complete`,
        data: { taskId, status },
        withCredentials: true
      })
      const { message, success } = response.data;
      if (success) {
        console.log(message);
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
      }
    }
    catch (error) {
      console.error("Complete function error", error)
    }
  }


  useEffect(() => {

    const New = allTasks.filter(t => t.taskStatus === "New").length;
    const Active = allTasks.filter(t => t.taskStatus === "In Progress").length;
    const Completed = allTasks.filter(t => t.taskStatus === "Completed").length;
    const Failed = allTasks.filter(t => t.taskStatus === "Failed").length;

    setStats([
      { id: 1, title: "New Tasks", number: New },
      { id: 2, title: "Completed Tasks", number: Active },
      { id: 3, title: "Accepted Tasks", number: Completed },
      { id: 4, title: "Failed Tasks", number: Failed },
    ]);


  }, [allTasks]);


  useEffect(() => {
    getTasks();
  }, [])


  return (
    <div>
      <Navbar />

      {/* home */}
      <div className='bg-black flex flex-col gap-5 px-16 py-5 min-h-[calc(100vh-70px)]'>

        {/* work status */}
        <div className='flex justify-between'>

          {stats.map((data, index) => {
            return (
              <div key={data.id} className="bg-gray-900 text-gray-200  shadow-md rounded-2xl p-6 w-60 text-center hover:shadow-lg transition-all duration-300">
                <h3 className="text-blue-600 font-semibold text-2xl mb-2">{data.title}</h3>
                <p className="text-3xl font-bold text-blue-600">{data.number}</p>
              </div>
            )
          })}

        </div>

        {/* cards */}
        <div className='p-5 rounded-xl'>
          <h1 className='mb-4 text-red-600 font-extrabold text-3xl'>Tasks</h1>

          {/* 🔹 Conditional Rendering */}
          {allTasks.length === 0 ? (
            <p className='text-white text-4xl text-center'>No Task Assigned Yet</p>
          ) : (
            <div className='max-h-[425px] overflow-y-auto flex flex-wrap gap-6 justify-start'>
              {allTasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-gray-900 text-gray-200 shadow-md rounded-2xl p-5 border border-gray-700 hover:shadow-lg transition-all duration-300 w-[32%] flex-shrink-0"
                >
                  {/* 🔹 Top Section */}
                  <div className="flex justify-between items-center mb-3">
                    <div className='flex gap-3 items-center'>
                      <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                        {task.taskCategory}
                      </span>
                      <button
                        onClick={() => handleStatus(task._id, 'In Progress')}
                        className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-600 transition"
                      >
                        Mark as Read
                      </button>
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(task.date).toLocaleDateString('en-IN')}
                    </span>
                  </div>

                  {/* 🔹 Title & Description */}
                  <h2 className="text-lg font-semibold text-white">{task.taskTitle}</h2>
                  <p className="text-gray-400 text-sm mt-2 overflow-x-auto">{task.taskDescription}</p>

                  {/* 🔹 Action Buttons */}
                  <div className="flex justify-between mt-5">
                    <button
                      onClick={() => handleStatus(task._id, 'Completed')}
                      className={`${task.taskStatus === 'Completed' ? 'bg-gray-500 line-through' : 'bg-green-500 hover:bg-green-600'
                        } text-white text-sm px-3 py-2 rounded-lg transition`}
                    >
                      Completed
                    </button>

                    <button
                      onClick={() => handleStatus(task._id, 'In Progress')}
                      className={`${task.taskStatus === 'In Progress' ? 'bg-gray-500 line-through' : 'bg-yellow-500 hover:bg-yellow-600'
                        } text-white text-sm px-3 py-2 rounded-lg transition`}
                    >
                      In Progress
                    </button>

                    <button
                      onClick={() => handleStatus(task._id, 'Failed')}
                      className={`${task.taskStatus === 'Failed' ? 'bg-gray-500 line-through' : 'bg-red-500 hover:bg-red-600'
                        } text-white text-sm px-3 py-2 rounded-lg transition`}
                    >
                      Failed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>



      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Home
