import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import Contest from './components/Contest.jsx'
import Problems from './components/Problems.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/problems",
    element: <Problems/>
  },
  {
    path: "/contest",
    element: <Contest/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  }
]) 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
)
