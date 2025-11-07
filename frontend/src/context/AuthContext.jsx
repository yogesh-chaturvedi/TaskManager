import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

const AuthContextProvider = (props) => {


    const [user, setUser] = useState(null);    // To store loggedIn user's data
    const [loading, setLoading] = useState(true)


    // To fetch user 
    async function fetchUser() {
        try {
            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_BASE_URL}users/fetch`,
                withCredentials: true
            })
            const { message, success, userData } = response.data;
            if (success) {
                console.log(message);
                setUser(userData);
            }
        }
        catch (error) {
            console.error('FetchUser error', error)
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])



    const value = { user, setUser, loading, setLoading, fetchUser };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;