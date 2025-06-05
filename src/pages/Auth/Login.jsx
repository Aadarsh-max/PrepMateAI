import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // NEW

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    setIsLoading(true); // NEW

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false); // NEW
    }
  };

  return (
  <div
    className="w-full md:w-[45vw] max-w-md p-7 flex flex-col justify-center
               bg-white rounded-xl shadow-md mx-auto my-16 border border-gray-200"
  >
    <h3 className="text-lg font-semibold text-gray-900">Welcome Back</h3>
    <p className="text-xs text-gray-600 mt-1 mb-6">
      Please enter your details to log in
    </p>

    <form onSubmit={handleLogin}>
      <Input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        label="Email Address"
        placeholder="john@example.com"
        type="text"
        className="text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-100"
        disabled={isLoading}
      />

      <Input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        label="Password"
        placeholder="Min 8 Characters"
        type="password"
        className="text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-100"
        disabled={isLoading}
      />

      {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 mt-2 font-semibold rounded-md bg-black text-white hover:bg-gray-800 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Logging in...
          </>
        ) : (
          "LOGIN"
        )}
      </button>

      <p className="text-sm text-gray-600 mt-3">
        Don't have an account?{" "}
        <button
          className="font-medium underline cursor-pointer text-gray-800 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage("signup")}
          type="button"
          disabled={isLoading}
        >
          SignUp
        </button>
      </p>
    </form>
  </div>
);

};

export default Login;
