import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../utils/axios'; // Import the Axios instance

const LoginComponent = () => {
  const navigate = useNavigate();
  const [isOtpView, setIsOtpView] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value !== '' && index < 3) {
        const nextInput = document.querySelector(`input[name='otp-${index + 1}']`);
        nextInput?.focus();
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Input validation
    if (!phone || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    api.post('/commonauth/login', {
        phone_number: phone,
        password,
        reg_type:"agent",
    })
    .then((response) => {
        const data = response.data;
        if (data.message === "Login successful") {
            console.log(data);
            toast.success('Login successful! Redirecting...');
            localStorage.setItem('token_agents', data.token);
            localStorage.setItem('agent_id', data.data._id);
            // Add slight delay before navigation for better UX
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } else {
            toast.error(data.message || 'Login failed');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    });
  };

  return (
    <div className="login min-h-screen max-h-screen overflow-hidden flex flex-col bg-gradient-to-br from-teal-400 via-blue-400 to-blue-500">
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                <div className="bg-white rounded-lg p-6 px-10">
                {!isOtpView ? (
                    <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm mb-1">Enter your phone number</label>
                        <div className="flex">
                        <div>
                            <div className="bg-orange-50 rounded-l px-3 py-2 w-full border-r">+91</div>
                        </div>
                        <input
                            type="tel"
                            className="bg-orange-50 outline-none rounded-r px-3 py-2 w-full"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="9876543210"
                        />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm mb-1">Enter your password</label>
                        <input  
                        type="password"
                        className="bg-orange-50 outline-none rounded px-3 py-2 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-emerald-400 text-white rounded py-2 mb-4 hover:bg-emerald-500"
                    >
                        Login
                    </button>
                    <div className="text-center text-sm">
                        <span className="text-gray-600">Don't have an account? </span>
                        <div onClick={()=>navigate('/signup')} className="text-emerald-400">Register</div>
                    </div>
                    <div className="flex items-center my-4">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-3 text-gray-500 text-sm">OR</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>
                    <div className="text-center text-sm mb-2">Get OTP via</div>
                    <div className="flex justify-center gap-4">
                        <button className="p-2 rounded-sm bg-orange-50">
                        <img src="/assets/mail.svg" alt="Gmail" className="w-6 h-6" />
                        </button>
                        <button className="p-2 rounded-sm bg-orange-50">
                        <img src="/assets/msg.svg" alt="WhatsApp" className="w-6 h-6" />
                        </button>
                        <button className="p-2 rounded-sm bg-orange-50">
                        <img src="/assets/wa.svg" alt="SMS" className="w-6 h-6" />
                        </button>
                    </div>
                    </form>
                ) : (
                    <div>
                        <div className="mb-6">
                            <label className="block text-sm mb-1">What's your Phone number?</label>
                            <div className="flex">
                            <select className="bg-orange-50 rounded-l px-2 py-2 border-r">
                                <option>+91</option>
                            </select>
                            <input
                                type="tel"
                                className="bg-orange-50 rounded-r px-3 py-2 w-full"
                                value={phone}
                                readOnly
                            />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm mb-1">Enter the 4 digit code sent to you at</label>
                            <div className="flex gap-2 mb-2">
                            {otp.map((digit, index) => (
                                <input
                                key={index}
                                type="text"
                                name={`otp-${index}`}
                                className="w-12 h-12 text-center border rounded bg-orange-50"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                />
                            ))}
                            </div>
                            <a href="#" className="text-sm text-gray-600">I didn't receive a code. Resend code</a>
                        </div>
                        <button
                            onClick={() => {navigate('/')}}
                            className="w-full bg-emerald-400 text-white rounded py-2 hover:bg-emerald-500"
                        >
                            Login
                        </button>
                    </div>
                )}
                </div>
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginComponent;