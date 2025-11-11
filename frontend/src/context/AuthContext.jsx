import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const navigate = useNavigate();

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

    
    // logout function
    async function handleLogout() {
        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_BASE_URL}auth/logout`,
                withCredentials: true
            })
            const { message, success } = response.data;
            if (success) {
                setUser(null)
                toast(message, {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate('/login')
            }
        }
        catch (error) {
            console.error('Logout Error', error);
        }
    }


    const value = { user, setUser, loading, setLoading, verify, handleLogout };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;