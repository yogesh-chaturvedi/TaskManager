import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const [allUsers, setAllUsers] = useState([]);
    console.log('allUsers', allUsers)

    async function getAllUser() {
        try {
            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_BASE_URL}users/fetch`,
                withCredentials: true
            })
            const { message, success, users } = response.data;
            if (success) {
                console.log(message);
                setAllUsers(users);
            }
        }
        catch (error) {
            console.error('getAllUser error', error)
        }
    }


    useEffect(() => {
        getAllUser()
    }, [])


    const value = { allUsers, setAllUsers, getAllUser };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;