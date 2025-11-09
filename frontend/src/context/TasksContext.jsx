import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const TaskContext = createContext();


const TaskContextProvider = (props) => {

    const { allUsers, setAllUsers } = useContext(UserContext)
    const [allTasks, setAllTasks] = useState([])


    // to get all tasks
    async function getTasks() {
        try {
            const resposne = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_BASE_URL}task/fetch`,
                withCredentials: true
            })
            const { message, success, tasks } = resposne.data;
            if (success) {
                console.log(message);
                setAllTasks(tasks);
            }
        }
        catch (error) {
            console.error('getTasks error', error);
        }
    }

    // calling gettask 
    useEffect(() => {
        getTasks();
    }, [])


    // fetch and attach stats to allUsers 
    useEffect(() => {
        if (allUsers.length === 0 || allTasks.length === 0) return;

        const updatedUsers = allUsers.map(user => {
            const userTasks = allTasks.filter(task => task.UserId === user._id);

            const New = userTasks.filter(t => t.taskStatus === "New").length;
            const Active = userTasks.filter(t => t.taskStatus === "In Progress").length;
            const Completed = userTasks.filter(t => t.taskStatus === "Completed").length;
            const Failed = userTasks.filter(t => t.taskStatus === "Failed").length;

            return {
                ...user,
                stats: { New, Active, Completed, Failed }
            };
        });

        setAllUsers(updatedUsers);
    }, [allTasks]);


    



    const value = { allTasks, setAllTasks, getTasks };


    return (
        <TaskContext.Provider value={value}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider;
