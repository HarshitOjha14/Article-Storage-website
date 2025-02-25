import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import Loginbg from '../../assets/image/articlebg.jpg';
import { useDispatch } from "react-redux";
import { login } from "../../services/operations/authApi";

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })



    const { email, password } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password, navigate))
    }
    return (
        <div className="relative  h-[100vh] flex items-center justify-center">

            <img
                src={Loginbg}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="bg-black absolute opacity-70 inset-0 w-full h-full"></div>

            <div className="relative z-10 bg-white bg-opacity-85 p-8 rounded-md shadow-lg w-[95%] max-w-md">
                <h2 className="text-3xl text-center mt-5 mb-3 font-bold text-gray-700">
                    Login
                </h2>
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            required
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            placeholder="Enter email address"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"

                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                           
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder="Enter Password"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"

                        />
                    </div>
                    <div>
                        <Link to="/forgot-password" className="hover:text-blue-500 text-sm hover:font-semibold">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-5 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>

                <div className="flex justify-center mt-6 text-sm text-gray-600">

                    <Link to="/signup" >
                        Don’t have an account ? <span className="hover:text-blue-500 hover:font-semibold">Sign Up</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
