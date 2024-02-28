import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import './index.css'
import Login from './pages/Login/Login'
import UserNavigation from './components/Navigation/UserNavigation'
import AdminNavigation from './components/Navigation/AdminNavigation'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <Routes>
            <Route path='' element={<Login />} />
            <Route path='dashboard/*' element={<UserNavigation />} />
            <Route path='admin/*' element={<AdminNavigation />} />
        </Routes>
        <ToastContainer />
    </Router>
)
