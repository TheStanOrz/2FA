import React from 'react'
import { auth } from '../public/constant'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const UserPage = () => {
    const navigate = useNavigate();
    const handleSignOutButton = () => {
        signOut(auth);
        navigate('/');
    }
    return (
    <div className='flex flex-col text-white items-center h-[400px] w-1/4 border-2 rounded-2xl backdrop-blur backdrop-brightness-50'>
        <h1 className='mt-5 text-5xl font-bold'>User Inf.</h1>
        <p className='mt-20'>Current User : </p>
        <p className='mt-10 font-bold text-xl'>{auth.currentUser.email}</p>
        <button onClick={() => {handleSignOutButton()}} className='w-4/5 mt-10 mb-1 bg-white p-2 rounded-xl text-black hover:bg-slate-500 hover:text-white duration-500'>Sign Out</button>
    </div>
  )
}

export default UserPage
