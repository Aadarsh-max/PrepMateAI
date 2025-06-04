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

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //Handle Login Form Submit
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

    //Login API Call
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
      if (error.response && error.response.data.message) {
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
      <h3 className="text-lg font-semibold text-white">Welcome Back</h3>
      <p className="text-xs text-gray-400 mt-1 mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
          className="text-white placeholder-gray-500 bg-black border border-gray-600 rounded-md px-3 py-2 mb-4"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
          className="text-white placeholder-gray-500 bg-black border border-gray-600 rounded-md px-3 py-2 mb-4"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 mt-2 font-semibold rounded-md bg-white text-black hover:bg-gray-200 transition cursor-pointer"
        >
          LOGIN
        </button>

        <p className="text-sm text-gray-400 mt-3">
          Don't have an account?{" "}
          <button
            className="font-medium underline cursor-pointer text-white hover:text-gray-200 transition"
            onClick={() => setCurrentPage("signup")}
            type="button"
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
