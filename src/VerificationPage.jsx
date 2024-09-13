import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../public/constant';
import 'boxicons';
import { useNavigate } from 'react-router-dom';

const VerificationPage = () => {
    const length = 6;
    const [code, setCode] = useState(Array(length).fill(''));
    const [loading, setLoading] = useState(null);
    const [correct, setCorrect] = useState(null);
    const [verificationCode, setVerificationCode] = useState(null);
    const navigate = useNavigate();
    const inputs = Array.from({ length }, (_, i) => i);

    useEffect(() => {
        // Fetch the verification code when the component mounts
        fetchDoc();
    }, []);

    const handleChange = (value, index) => {
        // 只允許數字
        if (/^[0-9]$/.test(value) || value === '') {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value && index < length - 1) {
                document.getElementById(`code-input-${index + 1}`).focus();
            }
            if (newCode.every(num => num !== '')) {
                setLoading(true);
                // Perform verification after the code is fully entered
                if (verificationCode) {
                    // Check if the code is correct
                    if (verificationCode === newCode.join('')) {
                        setCorrect(true);
                        setTimeout(() => {
                            navigate('/user');
                        }, 1000);
                    } else {
                        setCorrect(false);
                        setCode(Array(length).fill(''));
                        document.getElementById('code-input-0').focus();
                    }
                } else {
                    // Verification code is not yet available
                    setLoading(false);
                }
                setLoading(false);
            }
        }
    };

    const handleBackspace = (value, index) => {
        if (value === '' && index > 0) {
            document.getElementById(`code-input-${index - 1}`).focus();
        }
    };

    const fetchDoc = async () => {
        try {
            const docRef = doc(db, 'VerificationCode', auth.currentUser.email);
            const docSnap = await getDoc(docRef);
            setVerificationCode(docSnap.data().Code);
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    };

    return (
        <div className='flex flex-col text-white items-center h-[300px] w-1/4 border-2 rounded-2xl backdrop-blur backdrop-brightness-50'>
            <p className='mt-20 text-2xl'>Verification Code : </p>
            <div className="w-4/5 flex justify-center gap-3 mt-10 mb-5">
                {inputs.map((_, index) => (
                    <input
                        key={index}
                        id={`code-input-${index}`}
                        type="text"
                        maxLength="1"
                        className="w-10 h-10 text-center text-black border-2 border-gray-300 rounded-md text-lg"
                        value={code[index]}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => e.key === 'Backspace' ? handleBackspace(e.target.value, index) : null}
                    />
                ))}
            </div>

            {loading === null ? (
                <></>
            ) : loading ? (
                <box-icon size='lg' color='white' name='loader' animation='spin'></box-icon>
            ) : (
                <box-icon size='lg' color='white' name={`${correct ? 'check' : 'x'}`}></box-icon>
            )}
        </div>
    );
};

export default VerificationPage;
