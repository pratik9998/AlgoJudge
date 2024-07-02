import { useState } from 'react'
import './index.css' 
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
     <div class="w-screen min-h-screen bg-[#ced8ff] m-0 p-0 box-border font-sans" >       
        <Navbar/>
        <Footer/>
     </div>
  )
}

export default App
