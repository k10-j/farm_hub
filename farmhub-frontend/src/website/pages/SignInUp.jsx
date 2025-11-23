import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LeafIcon, MailIcon, LockIcon, UserIcon, PhoneIcon, MapPinIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
export function SignInUp() {
    const location = useLocation();
    const initialMode = location.state?.mode || 'signin';
    const [isSignUp, setIsSignUp] = useState(false);

    useEffect(() => {
        if (location.state?.mode === 'signup') {
            setIsSignUp(true);
        } else {
            setIsSignUp(false);
        }
    }, [location.state]);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let url = "";
            let payload = {};

            if (isSignUp) {
                // SIGN UP PAYLOAD
                payload = {
                    full_name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone_number: formData.phone,
                    location: formData.location,
                };
                url = "https://farm-hub.onrender.com/api/auth/register";
            } else {
                // SIGN IN PAYLOAD
                payload = {
                    email: formData.email,
                    password: formData.password,
                };
                url = "https://farm-hub.onrender.com/api/auth/login";
            }

            console.log("Sending payload:", payload);

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                credentials: "include"
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Error response:", data);
                throw new Error(data.message || "Request failed");
            }

            console.log(isSignUp ? "Registration successful:" : "Login successful:", data);

            // Store user data in localStorage for auth context
            if (data && data.id) {
                localStorage.setItem("user", JSON.stringify(data));
                // Auth context will pick this up
            }

            // Example: navigate to dashboard on success
            navigate("/dashboard");

        } catch (error) {
            console.error("Error:", error.message);
        }
    };


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };
    return <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 md:pt-56 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
            <motion.div initial={{
                opacity: 0,
                x: -50
            }} animate={{
                opacity: 1,
                x: 0
            }} transition={{
                duration: 0.6
            }} className="hidden lg:block">
                <Link to="/" className="flex items-center space-x-3 mb-8">
                    <div className="bg-green-600 p-3 rounded-xl">
                        <LeafIcon className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-green-700">FarmHub</span>
                </Link>
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Empowering Rwandan Farmers Through Digital Innovation
                </h1>
                <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-gray-700">AI-powered pest diagnosis</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-gray-700">Affordable equipment rental</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-gray-700">Direct marketplace access</p>
                    </div>
                </div>
                <div className="bg-green-600 rounded-2xl p-6 text-white">
                    <p className="text-3xl font-bold mb-2">10,000+</p>
                    <p className="text-green-100">Farmers already using FarmHub</p>
                </div>
            </motion.div>
            {/* Right Side - Auth Form */}
            <motion.div initial={{
                opacity: 0,
                x: 50
            }} animate={{
                opacity: 1,
                x: 0
            }} transition={{
                duration: 0.6
            }} className="w-full relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
                    {/* Mobile Logo */}
                    <Link to="/" className="flex lg:hidden items-center justify-center space-x-2 mb-8">
                        <div className="bg-green-600 p-2 rounded-lg">
                            <LeafIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-green-700">FarmHub</span>
                    </Link>
                    {/* Toggle Buttons */}
                    <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
                        <button onClick={() => setIsSignUp(false)} className={`flex-1 py-3 rounded-md font-medium transition-all ${!isSignUp ? 'bg-white text-green-700 shadow-md' : 'text-gray-600'}`}>
                            Sign In
                        </button>
                        <button onClick={() => setIsSignUp(true)} className={`flex-1 py-3 rounded-md font-medium transition-all ${isSignUp ? 'bg-white text-green-700 shadow-md' : 'text-gray-600'}`}>
                            Sign Up
                        </button>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {isSignUp ? 'Create your account' : 'Welcome back'}
                    </h2>
                    <p className="text-gray-600 mb-8">
                        {isSignUp ? 'Join thousands of farmers growing their success' : 'Sign in to continue to your dashboard'}
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {isSignUp && <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required={isSignUp} className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="John Doe" />
                            </div>
                        </div>}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="john@example.com" />
                            </div>
                        </div>
                        {isSignUp && <>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required={isSignUp} className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="+250 XXX XXX XXX" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <div className="relative">
                                    <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required={isSignUp} className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Kigali, Rwanda" />
                                </div>
                            </div>
                        </>}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} required className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="••••••••" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        {isSignUp && <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type={showPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required={isSignUp} className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="••••••••" />
                            </div>
                        </div>}
                        {!isSignUp && <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                                <span className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                            <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium">
                                Forgot password?
                            </a>
                        </div>}
                        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl">
                            {isSignUp ? 'Create Account' : 'Sign In'}
                        </button>
                        {isSignUp && <p className="text-xs text-gray-500 text-center">
                            By signing up, you agree to our{' '}
                            <a href="#" className="text-green-600 hover:underline">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-green-600 hover:underline">
                                Privacy Policy
                            </a>
                        </p>}
                    </form>
                </div>
            </motion.div>
        </div>
    </div>;
};

export default SignInUp;
