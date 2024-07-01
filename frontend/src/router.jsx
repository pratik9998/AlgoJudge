import App from './App.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Contest from './components/Contest.jsx'
import Problems from './components/Problems.jsx'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  { path: "/", element: <App/>},
  { path: "/problems", element: <Problems/>},
  { path: "/contest", element: <Contest/>},
  { path: "/login", element: <Login/>},
  { path: "/register", element: <Register/>}
]) 