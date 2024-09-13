import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import 'boxicons'

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import UserPage from './UserPage';
import VerificationPage from './VerificationPage';
import ForgotPassword from './ForgotPassword';

function App() {
  
  return (
    <BrowserRouter>
    <div className='bg-backgroundimg bg-cover min-h-screen flex justify-center items-center brightness-75'>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/user" element={<UserPage/>} />
        <Route path="/verification" element={<VerificationPage/>} />
        <Route path="/password" element={<ForgotPassword/>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
