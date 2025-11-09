import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

const AuthContextProvider = (props) => {


    const [user, setUser] = useState(null);    // To store loggedIn user's data
    const [loading, setLoading] = useState(true)


    // To fetch user 
    async function verify() {
        try {
            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_BASE_URL}users/verify`,
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
            setUser(null);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        verify();
    }, [])


    const value = { user, setUser, loading, setLoading, verify };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;