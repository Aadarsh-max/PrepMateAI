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
      <div className="flex items-center bg-black px-4 py-2 rounded-xl shadow-md border border-white/10">
        <div className="w-11 h-11 rounded-full mr-4 bg-white text-black font-bold flex items-center justify-center text-sm">
          {getInitials(user.name)}
        </div>
        <div>
          <div className="text-white text-[15px] font-semibold leading-5">
            {user.name || ""}
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition"
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
