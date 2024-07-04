import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './components/AuthContext';
import { IdProvider } from './components/IdContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> 
    <AuthProvider>
      <IdProvider>
       <RouterProvider router={router}/>
      </IdProvider>
    </AuthProvider>,
  // </React.StrictMode>,
)
