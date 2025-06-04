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
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
            className="text-white placeholder-gray-500 bg-black border border-gray-600 rounded-md px-3 py-2"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
            className="text-white placeholder-gray-500 bg-black border border-gray-600 rounded-md px-3 py-2"
          />
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5 mt-2">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 mt-6 font-semibold rounded-md bg-white text-black hover:bg-gray-200 transition cursor-pointer"
        >
          SIGN UP
        </button>

        <p className="text-sm text-gray-400 mt-3">
          Already an account?{" "}
          <button
            className="font-medium underline cursor-pointer text-white hover:text-gray-200 transition"
            onClick={() => setCurrentPage("login")}
            type="button"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
