import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/");
    };

    const getInitials = (name) => {
        if (!name) return "";
        const nameParts = name.trim().split(" ");
        const initials = nameParts.map((part) => part.charAt(0).toUpperCase());
        return initials.slice(0, 2).join("");
    };

    return (
        user && (
            <div className="flex items-center bg-[#0A081A] px-4 py-2 rounded-xl shadow-lg">
                <div className="w-11 h-11 rounded-full mr-4 bg-[#3FE1FF] text-black font-bold flex items-center justify-center text-sm">
                    {getInitials(user.name)}
                </div>
                <div>
                    <div className="text-[15px] font-bold leading-5 bg-gradient-to-r from-[#3FE1FF] via-[#9378FF] to-[#DD3EFF] text-transparent bg-clip-text">
                        {user.name || ""}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-sm font-semibold text-[#3FE1FF] hover:text-white hover:underline transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        )
    );
};

export default ProfileInfoCard;
