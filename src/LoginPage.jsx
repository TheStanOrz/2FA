import { Link, useNavigate } from 'react-router-dom';
import 'boxicons'
import { useState } from 'react';
import { auth, db, emailRegex } from '../public/constant';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import emailjs from 'emailjs-com'; // 引入 EmailJS 函式庫

const LoginPage = () => {
    const [userAccount, setUserAccount] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const navigate = useNavigate();
    const email = emailjs.init()
    const generateCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString(); // 6位驗證碼
    };
    const handleAccountChange = (e) => {
        setUserAccount(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setUserPassword(e.target.value);
    }
    const handleLoginButton = async () => {
        if(!userAccount||!userPassword){
            alert("Please enter your login information.")
        }
        else if(emailRegex.test(userAccount)){
            try {
                await signInWithEmailAndPassword(auth,userAccount,userPassword);
                const user = auth.currentUser;
                if(user.emailVerified){
                    const Code = generateCode();
                    const docRef = doc(db,'VerificationCode',auth.currentUser.email);
                    await setDoc(docRef,{
                        Code : Code,
                        TimeStamp : Timestamp.now(),
                    });
                    const templateParams = {
                        from_name:'2FA',
                        to_name:auth.currentUser.email,
                        user_email: auth.currentUser.email, 
                        message:`Your Verification Code : \n ${Code}`,
                    };
            
                    emailjs.send(
                        'service_dnsvgwt',    
                        'template_bkgv18d',   
                        templateParams,       
                        '_lhGS_1zos92-jV4P'        
                    )
                    .then((result) => {
                        console.log('Email sent:', result.text);
                        alert('Verification email sent successfully.');
                        navigate('/verification');
                    });
                }
                else{
                    alert('Email not verified.')
                    await signOut(auth);
                }
            } catch(error){
                if(error.message.includes("auth/invalid-credential")) alert("Auth invalid credential.");
                console.log(error);
            }
        }
        else{
            alert("Please enter a valid email format.")
        }
    }
    return (
    <div className='flex flex-col text-white items-center h-[500px] w-1/4 border-2 rounded-2xl backdrop-blur backdrop-brightness-50'>
        <h1 className='mt-5 text-5xl font-bold'>Login</h1>
        <div className='mt-5 w-4/5 flex flex-row'>
            <span className='absolute pt-0.5 mt-11 ml-2'>
                <box-icon name='envelope' color='white'></box-icon>
            </span>
            <input onChange={handleAccountChange} placeholder='Please enter your email.' className='placeholder-white w-full mt-10 bg-transparent border-2 rounded-lg outline-none p-1 pl-9 pr-3'></input>
        </div>
        <div className='w-4/5 flex flex-row'>
            <span className='absolute pt-0.5 mt-11 ml-2'>
                <box-icon name='lock-alt' color='white'></box-icon>
            </span>
            <input type='password' onChange={handlePasswordChange} placeholder='Please enter your password.' className='placeholder-white w-full mt-10 bg-transparent border-2 rounded-lg outline-none p-1 pl-9 pr-3'></input>
        </div>
        <div className='w-4/5 flex flex-col items-center mt-20'>
            <Link to='/password' className='ml-auto  font-bold hover:underline'>Forgot password?</Link>
            <button onClick={() => handleLoginButton()} className='w-full mt-3 mb-1 bg-white p-2 rounded-xl text-black hover:bg-slate-500 hover:text-white duration-500'>Login</button>
            <p>Don't have an account?<Link to='/register' className='ml-1 font-bold hover:underline'>Register</Link></p>
        </div>
    </div>
  )
}

export default LoginPage
