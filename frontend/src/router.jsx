import App from './App.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Contest from './components/Contest.jsx'
import Problems from './components/Problems.jsx'
import ProblemDetail from './components/ProblemDetail.jsx'
import { createBrowserRouter } from 'react-router-dom'
import Profile  from './components/Profile.jsx'
import Admin from './components/Admin.jsx'
import AddNewProblem from './components/AddNewProblem.jsx'
import UpdateProblem from './components/UpdateProblem.jsx'

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/problems", element: <Problems /> },
  { path: "/contest", element: <Contest /> },
  { path: "/admin", element: <Admin /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/profile", element: <Profile /> },
  { path: "/problem-detail", element: <ProblemDetail /> },
  { path: "/admin/add-new-problem", element: <AddNewProblem /> },
  { path: "/admin/update-problem", element: <UpdateProblem /> }
]) 