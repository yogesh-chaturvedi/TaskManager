import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext.jsx'
import TaskContextProvider from './context/TasksContext.jsx'
import UserContextProvider from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
          <UserContextProvider>
        <TaskContextProvider>
            <App />
        </TaskContextProvider>
          </UserContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
