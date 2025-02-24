import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../utils/axios'; // Import the Axios instance

function SignUp() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: '',
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSignUp = () => {
        console.log('Form Data:', formData);
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        api.post('/commonauth/register', {
            business_name: formData.companyName,
            owner_name: formData.fullName,
            email: formData.email,
            phone_number: formData.phone,
            password: formData.password,
            reg_type: 'agent',
            isActive: false,
            isNew: true,
        })
        .then((response) => {
            const data = response.data;
            console.log('Success:', data);
            if (data.message === 'The email or phone number is already registered') {
                toast.error(data.message);
                return;
            }
            toast.success('Sign up successful');
            navigate('/login');
        })
        .catch((error) => {
            console.error('Error:', error);
            toast.error('Sign up failed');
        });
    };

    return (
    <div className="login min-h-screen max-h-screen overflow-scroll flex flex-col bg-gradient-to-br from-teal-400 via-blue-400 to-blue-500">
       <Header />
       <ToastContainer />
       <div className="flex-1 flex items-center justify-center p-4 gap-10 h-full w-[60%] max-lg:w-[100%] m-auto">
            <div className='bg-white flex items-center justify-center min-w-full p-4 rounded-lg min-h-[28em]'>
                <div className='w-[50%] flex flex-col gap-4'>
                    <div className="text-start mb-8 pl-10 w-full">
                        <h1 className="text-4xl font-bold text-teal-600 mb-2">trrip</h1>
                        <h2 className="text-2xl text-black font-medium">
                            Empowering Agents <br /> to Earn More on <br /> Every Trip
                        </h2>
                    </div>

                    {/* Icons */}
                    <div className="flex flex-1 pl-5 gap-1 items-start flex-col justify-evenly w-[80%]">
                        <div className="text-start flex gap-0 items-center justify-start">
                            <div className="min-w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <img src="/assets/check.svg" alt="We bring tourists to you" className="w-6 h-6" />
                            </div>
                            <div className="text-black text-xs">Turn Every Traveler's Journey into Your Earning Opportunity</div>
                        </div>
                        <div className="text-start flex gap-0 items-center justify-start">
                            <div className="min-w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <img src="/assets/check.svg" alt="Your authentic food reaches" className="w-6 h-6" />
                            </div>
                            <div className="text-black text-xs">Earn on Every Booking, Connect with More Travelers</div>
                        </div>
                        <div className="text-start flex gap-0 items-center justify-start">
                            <div className="min-w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <img src="/assets/check.svg" alt="Increase your potential customer" className="w-6 h-6" />
                            </div>
                            <div className="text-black text-xs">Maximize Your Income as a Trrip.Live Agent</div>
                        </div>
                    </div>
                </div>

                <div className='w-[50%]'>
                    <div className="max-w-md mx-auto p-4 bg-white rounded">
                        <h2 className="text-xl font-medium mb-4 text-center">Registration Form</h2>
                        {[
                            { label: 'Enter Your Company Name', name: 'companyName', type: 'text', placeholder: 'Enter your company name' },
                            { label: 'Enter Your Full Name', name: 'fullName', type: 'text', placeholder: 'Enter your full name' },
                            { label: 'Enter Your Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
                            { label: 'Enter Your Phone Number', name: 'phone', type: 'tel', placeholder: '9876543210' },
                            { label: 'Create Password', name: 'password', type: 'password', placeholder: 'Create a password' },
                            { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: 'Confirm your password' },
                        ].map((field, index) => (
                            <div className="mb-4" key={index}>
                                <label className="block text-[13px] mb-[2px]">{field.label}</label>
                                {field.name === 'phone' ? (
                                    <div className="flex">
                                        <div className="bg-orange-50 rounded-l px-3 py-2 w-auto border-r">+91</div>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            className="bg-orange-50 outline-none rounded-r text-[13px] px-3 py-1 w-full"
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                        />
                                    </div>
                                ) : (
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        className="bg-orange-50 outline-none rounded text-[13px] px-3 py-1 w-full"
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                    />
                                )}
                            </div>
                        ))}
                        <button
                            className="w-full bg-emerald-400 text-white rounded-lg py-2 mt-4 mb-1 hover:bg-emerald-500"
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </button>
                        <div className="text-start text-sm">
                            <span className="text-gray-600">Have an account already? </span>
                        <a href="#" className="text-emerald-400" onClick={()=>{navigate('/login')}}>Login</a>
                    </div>
                    </div>
                </div>
            </div>
      </div>

      <Footer />
    </div>
  )
}

export default SignUp
