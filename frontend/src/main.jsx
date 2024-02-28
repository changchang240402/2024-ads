import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import './index.css'
import Login from './pages/Login/Login'
import UserNavigation from './components/Navigation/UserNavigation'
import AdminNavigation from './components/Navigation/AdminNavigation'
import store from '../src/redux/store/index';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path='' element={<Login />} />
                <Route path='dashboard/*' element={<UserNavigation />} />
            <Route path='admin/*' element={<AdminNavigation />} />
            </Routes>
            <ToastContainer />
        </Router>
    </Provider>
)
