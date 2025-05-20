import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";


const SignUp = ({setCurrentPage}) => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    //Handle SignUp Form Submit
    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageUrl = "";

        if(!fullName){
            setError("Please enter full name.");
            return;
        }

        if(!validateEmail(email)){
            setError("Please enter a valid email address.");
            return;
        }

        if(!password){
            setError("Please enter the password");
            return;
        }

        setError("");

        //SignUp API Call
        try{

            if(profilePic){
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password,
                profileImageUrl,
            });

            const { token } = response.data;

            if(token) {
                localStorage.setItem("token", token);
                updateUser(response.data);
                navigate("/dashboard");
            }
        }catch(error){
            if(error.response && error.reponse.data.message){
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
               mx-auto my-16"
  >
    <h3 className="text-lg font-semibold text-white">Create an Account</h3>
    <p className="text-xs text-[#B0B0C0] mt-[5px] mb-6">
      Join us today by entering your details below.
    </p>

    <form onSubmit={handleSignUp}>

      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

      <div className="grid grid-cols-1 gap-4">
        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="John"
          type="text"
          className="text-white placeholder-[#B0B0C0] bg-[#0A081A] border border-[#3FE1FF] rounded-md px-3 py-2"
        />

        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
          className="text-white placeholder-[#B0B0C0] bg-[#0A081A] border border-[#3FE1FF] rounded-md px-3 py-2"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
          className="text-white placeholder-[#B0B0C0] bg-[#0A081A] border border-[#3FE1FF] rounded-md px-3 py-2"
        />
      </div>

      {error && <p className="text-red-500 text-xs pb-2.5 mt-2">{error}</p>}

      <button
        type="submit"
        className="w-full py-2 mt-6 font-semibold rounded-md
                   bg-gradient-to-r from-[#3FE1FF] via-[#9378FF] to-[#DD3EFF]
                   text-[#000822] hover:brightness-110 transition"
      >
        SIGN UP
      </button>

      <p className="text-[13px] text-[#B0B0C0] mt-3">
        Already an account?{" "}
        <button
          className="font-medium underline cursor-pointer text-[#3FE1FF] hover:text-[#9378FF] transition"
          onClick={() => setCurrentPage("login")}
          type="button"
        >
          Login
        </button>
      </p>
    </form>
  </div>
);

}

export default SignUp