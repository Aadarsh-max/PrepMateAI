import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
    const [email, setEmail] =useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const {updateUser} = useContext(UserContext);
    const navigate = useNavigate();
    
    //Handle Login Form Submit
    const handleLogin = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)){
            setError("Please enter a valid email address.");
            return;
        }

        if(!password){
            setError("Please enter the password");
            return;
        }

        setError("");

        //Login API Call
        try{
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });

            const { token } = response.data;

            if(token) {
                localStorage.setItem("token", token);
                updateUser(response.data);
                navigate("/dashboard");
            }
        }catch(error){
            if(error.response && error.response.data.message) {
                setError(error.response.data.message);
            }else{
                setError("Something went wrong. Please try again.")
            }
        }
    };

return (
  <div
    className="w-full md:w-[45vw] max-w-md p-7 flex flex-col justify-center
               bg-[#0A081A] rounded-lg shadow-lg
               mx-auto my-16" // centers horizontally and adds vertical margin
  >
    <h3 className="text-lg font-semibold text-white">Welcome Back</h3>
    <p className="text-xs text-[#B0B0C0] mt-[5px] mb-6">
      Please enter your details to log in
    </p>

    <form onSubmit={handleLogin}>
      <Input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        label="Email Address"
        placeholder="john@example.com"
        type="text"
        className="text-white placeholder-[#B0B0C0] bg-[#0A081A] border border-[#3FE1FF] rounded-md px-3 py-2 mb-4"
      />

      <Input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        label="Password"
        placeholder="Min 8 Characters"
        type="password"
        className="text-white placeholder-[#B0B0C0] bg-[#0A081A] border border-[#3FE1FF] rounded-md px-3 py-2 mb-4"
      />

      {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

      <button
        type="submit"
        className="w-full py-2 mt-2 font-semibold rounded-md
                   bg-gradient-to-r from-[#3FE1FF] via-[#9378FF] to-[#DD3EFF]
                   text-[#000822] hover:brightness-110 transition"
      >
        LOGIN
      </button>

      <p className="text-[13px] text-[#B0B0C0] mt-3">
        Don't have an account?{" "}
        <button
          className="font-medium underline cursor-pointer
                     text-[#3FE1FF] hover:text-[#9378FF] transition"
          onClick={() => {
            setCurrentPage("signup");
          }}
          type="button"
        >
          SignUp
        </button>
      </p>
    </form>
  </div>
);

}

export default Login; 