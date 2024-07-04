import React from 'react'
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext';

const Navbar = () => {

    const { user } = useAuth();
    // console.log(user);

    return (
        <div className="w-full flex items-center justify-between bg-white px-6">
            <img src={logo} alt='' className="w-[160px] cursor-pointer" Link to='/' />

            <ul className="flex-1 list-none text-center">
                <Link to='/problems'><li className="inline-block m-[10px_20px] text-[18px] cursor-pointer">Problems</li></Link>
                <Link to='/contest'><li className="inline-block m-[10px_20px] text-[18px] cursor-pointer">Contest</li></Link>
                { user && user.user_type=="admin" ? <Link to='/adminpanel'><li className="inline-block m-[10px_20px] text-[18px] cursor-pointer">AdminPanel</li></Link> : ""}
            </ul>
            {user ? (
                <Link to="/profile">
                <img src={user.profilePhoto} alt="Profile" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                </Link>
              ) : (
                <div className="relative flex h-full items-center">
                    <div className="relative flex items-center space-x-2">
                        <div className="items-center flex whitespace-nowrap">
                            <Link to='/register' className="text-text-secondary dark:text-text-secondaryLinkhover:text-text-primary dark:hover:text-text-primary hidden lg:flex">Register</Link>
                            <span className="mx-3 hidden lg:inline-block text-text-secondary dark:text-text-secondary">or</span>
                            <Link to='/login' className="text-text-secondary dark:text-text-secondary hover:text-text-primary dark:hover:text-text-primary hidden lg:flex" >Sign in</Link>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Navbar
