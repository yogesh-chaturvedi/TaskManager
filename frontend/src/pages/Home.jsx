import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {

  const [stats, setStats] = useState([
    { id: 1, title: "New Tasks", number: 13 },
    { id: 2, title: "Completed Tasks", number: 8 },
    { id: 3, title: "Accepted Tasks", number: 4 },
    { id: 3, title: "Failed Tasks", number: 1 },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      category: "Design",
      date: "Nov 7, 2025",
      title: "Create Landing Page UI",
      description:
        "Design a modern, responsive landing page layout for the TaskManager app using Figma.",
      status: "Pending",
    },
    {
      id: 2,
      category: "Development",
      date: "Nov 6, 2025",
      title: "Implement User Authentication",
      description:
        "Build secure signup and login functionality using JWT and bcrypt in the backend.",
      status: "In Progress",
    },
    {
      id: 3,
      category: "Testing",
      date: "Nov 5, 2025",
      title: "Test Task CRUD Features",
      description:
        "Manually test all create, read, update, and delete operations in the TaskManager app.",
      status: "Completed",
    },
    {
      id: 4,
      category: "UI/UX",
      date: "Nov 4, 2025",
      title: "Improve Dashboard Layout",
      description:
        "Redesign the dashboard to include a better grid system and consistent color palette.",
      status: "Pending",
    },
    {
      id: 5,
      category: "Bug Fix",
      date: "Nov 3, 2025",
      title: "Fix Logout Redirect Issue",
      description:
        "Resolve the issue where users remain logged in even after clicking the logout button.",
      status: "Failed",
    },
  ]);

  return (
    <div>
      <Navbar />

      {/* home */}
      <div className='border-2 border-red-400 bg-black flex flex-col gap-5 px-16 py-5 min-h-[calc(100vh-70px)]'>

        {/* work status */}
        <div className='flex justify-between border-2 border-red-400'>

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
        <div>
          <h1 className='mb-1 text-red-600 font-extrabold text-3xl'>Tasks</h1>
          {/* tasks details */}
          <div className='border-2 border-red-400 flex gap-5 flex-wrap'>

            {tasks.map((task, index) => {
              return <div key={index} className="bg-gray-900 text-gray-200  flex-shrink-0 shadow-md  rounded-2xl p-5 w-full max-w-md border border-gray-200 hover:shadow-lg transition-all duration-300">

                {/* 🔹 Top Section */}
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                    {task.category}
                  </span>
                  <span className="text-sm text-gray-500">{task.date}</span>
                </div>

                {/* 🔹 Title & Description */}
                <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
                <p className="text-gray-600 text-sm mt-2">{task.description}</p>

                {/* 🔹 Action Buttons */}
                <div className="flex justify-between mt-5">
                  <button className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-600 transition">
                    Mark as Completed
                  </button>
                  <button className="bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                    In Progress
                  </button>
                  <button className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    Mark as Failed
                  </button>
                </div>

              </div>
            })}

          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Home
