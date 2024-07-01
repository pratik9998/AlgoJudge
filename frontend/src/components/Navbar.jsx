import React from 'react'
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    
    return (
        <div class="w-full flex items-center justify-between bg-white px-6">
            <img src={logo} alt='' class="w-[160px] cursor-pointer" Link to='/' />

            <ul class="flex-1 list-none text-center">
                <Link to='/'><li class="inline-block m-[10px_20px] text-[18px] cursor-pointer">Home</li></Link>
                <Link to='/problems'><li class="inline-block m-[10px_20px] text-[18px] cursor-pointer">Problems</li></Link>
                <Link to='/contest'><li class="inline-block m-[10px_20px] text-[18px] cursor-pointer">Contest</li></Link>
            </ul>

            <div class="relative flex h-full items-center">
                <div class="relative flex items-center space-x-2">
                    <div class="items-center flex whitespace-nowrap">
                        <Link class="text-text-secondary dark:text-text-secondaryLinkhover:text-text-primary dark:hover:text-text-primary hidden lg:flex" to='/register'>Register</Link>
                        <span class="mx-3 hidden lg:inline-block text-text-secondary dark:text-text-secondary">or</span>
                        <Link class="text-text-secondary dark:text-text-secondary hover:text-text-primary dark:hover:text-text-primary hidden lg:flex" to='/login'>Sign in</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar
