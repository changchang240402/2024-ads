import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import './index.css'
import Login from './pages/Login/Login'
import Navigation from './components/Navigation/Navigation'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='' element={<Login/>}></Route>
      <Route path='dashboard/*' element={<Navigation/>}></Route>
    </Routes>
    <ToastContainer />
  </Router>
)
