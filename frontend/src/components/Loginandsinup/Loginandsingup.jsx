import { useState} from "react";
import login from "../../assets/login.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {server} from '../../constants/config';
import {useDispatch} from 'react-redux';
import { userExists } from "../../redux/reducers/authslice";

const Loginandsignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  
  const [error, setError] = useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(""); 
    setFormData({ email: "", username: "", password: "", confirmPassword: "" });
  };

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const endpoint = isLogin
      ? `${server}/api/v1/Login`
      : `${server}/api/v1/sing_up`;

    const payload = isLogin
      ? {
          usernameOrEmail: formData.email,
          password: formData.password,
        }
      : {
          email: formData.email,
          username: formData.username,
          password: formData.password,
        };

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },  
    };

    try {
      const response=await axios.post(endpoint, payload, config);
      toast.success("Successfully Logged")
      dispatch(userExists(response.data.data));
      navigate("/");
    } catch (error) {
      toast.error("Invalid Username or Password");
    }
  };

  return (
    <div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <h1 className="mb-3 text-4xl font-bold">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p className="font-light text-gray-400 mb-8">
            {isLogin
              ? "Welcome back! Please enter your details."
              : "Create an account to get started."}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="py-4">
              <label htmlFor="email" className="mb-2 text-md block">
                {isLogin ? "Email or Username" : "Email"}
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                placeholder="Enter your email"
              />
            </div>
            {!isLogin && (
              <div className="py-4">
                <label htmlFor="username" className="mb-2 text-md block">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  placeholder="Enter your username"
                />
              </div>
            )}
            <div className="py-4">
              <label htmlFor="password" className="mb-2 text-md block">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                placeholder="Enter your password"
              />
            </div>
            {!isLogin && (
              <div className="py-4">
                <label htmlFor="confirmPassword" className="mb-2 text-md block">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  placeholder="Confirm your password"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-500">{error}</p>
                )}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-lg mb-6 transition hover:bg-white hover:text-black hover:border hover:border-gray-300"
              aria-label={isLogin ? "Sign in" : "Sign up"}
            >
              {isLogin ? "Sign in" : "Sign up"}
            </button>
          </form>
          <p className="text-center text-gray-400">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  className="font-bold text-black hover:underline"
                  onClick={toggleForm}
                >
                  Sign up for free
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  className="font-bold text-black hover:underline"
                  onClick={toggleForm}
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
        <div>
          <img
            src={login}
            alt="Login Illustration"
            className="w-[500px] rounded-r-2xl object-cover max-w-full h-auto  sharp"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Loginandsignup;