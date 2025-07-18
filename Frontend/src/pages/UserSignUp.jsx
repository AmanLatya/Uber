import React, {use, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

const UserSignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // const [userData, setUserData] = useState({});

    const {user,setUser} = useContext(UserDataContext);
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        // handle form submission here
        const newUser = {
            fullName:{
                firstName: firstName,
                lastName: lastName,
            },
            email: email,
            password: password,
        }
        
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

        if(response.status === 201){
            const data = response.data;
            setUser(data.user)
            console.log("User registered successfully:", response.data);
            localStorage.setItem("userToken", data.token);
            navigate("/home");
        }

        // setUserData(newUser);
        setEmail("");
        setPassword("");
        setFirstName("");   
        setLastName("");
    };

    return (
        <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] min-h-screen flex items-center justify-center px-4">
            <div className="relative z-10 bg-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md text-black">
                <div className="flex justify-center mb-6">
                    <img
                        className="w-40"
                        src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png"
                        alt="Uber Logo"
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-black-700 text-lg font-medium mb-2">
                            What's your name
                        </label>
                        <div className="flex space-x-2">
                            <input
                                value={firstName}
                                onChange = {(e) =>{
                                    setFirstName(e.target.value);
                                }}
                                type="text"
                                required
                                placeholder="First Name"
                                className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base font-medium focus:outline-none focus:ring-2 focus:ring-black"
                            
                            />
                            <input
                                value={lastName}
                                onChange = {(e) =>{
                                    setLastName(e.target.value);
                                }}
                                type="text"
                                placeholder="Last Name"
                                className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base font-medium focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-black-700 text-lg font-medium mb-1">
                            What is your email
                        </label>
                        <input
                            value={email}
                            onChange = {(e) =>{
                                setEmail(e.target.value);
                            }}
                            required
                            type="email"
                            placeholder="example@gmail.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base font-medium focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label className="block text-black-700 text-lg font-medium mb-1">
                            Enter Password
                        </label>
                        <input
                            value={password}
                            onChange = {(e) =>{
                                setPassword(e.target.value);
                            }}
                            required
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base font-medium focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 hover:bg-gray-800 transition duration-200"
                    >
                        Create Account
                    </button>
                </form>

                <p className="pt-4 text-center text-lg">
                    Already have an account?{" "}
                    <Link to="/user-login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </Link>
                </p>

                {/* Optional Captain Signin Button */}
                {/* <div className="mt-6 text-center">
                    <Link
                        to="/caption-login"
                        className="inline-block bg-yellow-500 text-white py-2 px-4 rounded-xl hover:bg-yellow-600 transition duration-200"
                    >
                        Sign in as Captain
                    </Link>
                </div> */}
            </div>
        </div>
    );
};

export default UserSignUp;
