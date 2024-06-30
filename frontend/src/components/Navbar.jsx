import React from 'react'
import logo from '../assets/images/logo.png'


const Navbar = () => {
    
    return (
        <div class="w-full flex items-center justify-between bg-white px-6">
            <img src={logo} alt='' class="w-[160px] cursor-pointer" />

            <ul class="flex-1 list-none text-center">
                <li class="inline-block m-[10px_20px] text-[18px] cursor-pointer">Home</li>
                <li class="inline-block m-[10px_20px] text-[18px] cursor-pointer">Problems</li>
                <li class="inline-block m-[10px_20px] text-[18px] cursor-pointer">Contest</li>
            </ul>

            <div class="relative flex h-full items-center">
                <div class="relative flex items-center space-x-2">
                    <div class="items-center flex whitespace-nowrap">
                        <a class="text-text-secondary dark:text-text-secondary hover:text-text-primary dark:hover:text-text-primary hidden lg:flex" href=''>Register</a>
                        <span class="mx-3 hidden lg:inline-block text-text-secondary dark:text-text-secondary">or</span>
                        <a class="text-text-secondary dark:text-text-secondary hover:text-text-primary dark:hover:text-text-primary hidden lg:flex" href=''>Sign in</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar
