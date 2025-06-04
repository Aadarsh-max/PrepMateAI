import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const SignUp = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
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
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full md:w-[45vw] max-w-md p-7 flex flex-col justify-center
               bg-black rounded-lg shadow-md mx-auto my-16 border border-white"
    >
      <h3 className="text-lg font-semibold text-white">Create an Account</h3>
      <p className="text-xs text-gray-400 mt-1 mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>
        <div className="grid grid-cols-1 gap-4">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
            className="text-white placeholder-gray-500 bg-black border border-gray-600 rounded-md px-3 py-2"
            disabled={isLoading}
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
            className="text-white placeholder-gray-500 bg-black border border-gray-600 rounded-md px-3 py-2"
            disabled={isLoading}
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
            className="text-white placeholder-gray-500 bg-black border border-gray-600 rounded-md px-3 py-2"
            disabled={isLoading}
          />
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5 mt-2">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 mt-6 font-semibold rounded-md bg-white text-black hover:bg-gray-200 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing Up...
            </>
          ) : (
            "SIGN UP"
          )}
        </button>

        <p className="text-sm text-gray-400 mt-3">
          Already an account?{" "}
          <button
            className="font-medium underline cursor-pointer text-white hover:text-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage("login")}
            type="button"
            disabled={isLoading}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;