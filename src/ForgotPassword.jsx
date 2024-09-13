import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, emailRegex } from '../public/constant';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
    const [userEmail, setUserEmail] = useState(null);
    const navigate = useNavigate();
    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    }
    const handleResetButton = async () => {
        if(!userEmail){
            alert("Please enter your email.");
        }
        else if(emailRegex.test(userEmail)){
            await sendPasswordResetEmail(auth,userEmail);
            alert("Password reset email has been sent.");
            navigate('/');
        }
        else{
            alert("Please enter a valid email format.");
        }
    }
    return (
    <div className='flex flex-col text-white items-center h-[250px] w-1/4 border-2 rounded-2xl backdrop-blur backdrop-brightness-50'>
        <h1 className='mt-5 text-3xl font-bold'>Forgot Password?</h1>
        <div className='flex flex-col w-4/5'>
        <div className='mt-5 w-full flex flex-row'>
            <span className='absolute pt-0.5 mt-11 ml-2'>
                <box-icon name='envelope' color='white'></box-icon>
            </span>
            <input onChange={handleEmailChange} placeholder='Please enter your email.' className='placeholder-white w-full mt-10 bg-transparent border-2 rounded-lg outline-none p-1 pl-9 pr-3'></input>
        </div>
        <button onClick={() => handleResetButton()} className='w-full mt-3 mb-1 bg-white p-2 rounded-xl text-black hover:bg-slate-500 hover:text-white duration-500'>Reset Password</button>
        <Link to='/' className='ml-auto  font-bold hover:underline'>Login Page</Link>
        </div>
        
    </div>
  )
}

export default ForgotPassword
