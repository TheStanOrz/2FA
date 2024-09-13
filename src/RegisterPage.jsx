import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, emailRegex } from '../public/constant';

const RegisterPage = () => {
    const [registerAccount, setRegisterAccount] = useState(null);
    const [registerPassword, setRegisterPassword] = useState(null);
    const navigate = useNavigate();
    const handleRegisterAccountChange = (e) => {
        setRegisterAccount(e.target.value);
    }
    const handleRegisterPasswordChange = (e) => {
        setRegisterPassword(e.target.value);
    }
    const handleSignUpButton = async () => {
        if(!registerAccount||!registerPassword){
            alert("Please enter your sign up information.")
        }
        else if(emailRegex.test(registerAccount)){
            try {
                const userCredential =  await createUserWithEmailAndPassword(auth,registerAccount,registerPassword);
                await sendEmailVerification(userCredential.user);
                alert(`Verification email has been sent to ${registerAccount}.`);
                navigate('/');
            } catch(error){
                if(error.message.includes("6 characters")) alert("Password should be at least 6 characters.");
                else if(error.message.includes("email-already-in-use")) alert("Email already in use.");
                console.log(error);
            }
        }
        else{
            alert("Please enter a valid email format.")
        }
    }
    return (
    <div className='flex flex-col text-white items-center h-[500px] w-1/4 border-2 rounded-2xl backdrop-blur backdrop-brightness-50'>
        <h1 className='mt-5 text-5xl font-bold'>Sign Up</h1>
        <div className='mt-5 w-4/5 flex flex-row'>
            <span className='absolute pt-0.5 mt-11 ml-2'>
                <box-icon name='envelope' color='white'></box-icon>
            </span>
            <input onChange={handleRegisterAccountChange} placeholder='Please enter your email.' className='placeholder-white w-full mt-10 bg-transparent border-2 rounded-lg outline-none p-1 pl-9 pr-3'></input>
        </div>
        <div className='w-4/5 flex flex-row'>
            <span className='absolute pt-0.5 mt-11 ml-2'>
                <box-icon name='lock-alt' color='white'></box-icon>
            </span>
            <input type='password' onChange={handleRegisterPasswordChange} placeholder='Please enter your password.' className='placeholder-white w-full mt-10 bg-transparent border-2 rounded-lg outline-none p-1 pl-9 pr-3'></input>
        </div>
        <div className='w-4/5 flex flex-col items-center mt-20'>
            <button onClick={() => {handleSignUpButton()}} className='w-full mt-3 mb-1 bg-white p-2 rounded-xl text-black hover:bg-slate-500 hover:text-white duration-500'>Sign Up</button>
            <p>Already have an account?<Link to='/' className='ml-1 font-bold hover:underline'>Login</Link></p>
        </div>
    </div>
  )
}

export default RegisterPage
