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
      <div className="flex items-center gap-3 bg-black px-3 py-1.5 rounded-xl shadow-md border border-white/10 h-12">
        <div className="w-9 h-9 rounded-full bg-white text-black font-bold flex items-center justify-center text-sm">
          {getInitials(user.name)}
        </div>
        <div className="flex flex-col justify-center leading-tight">
          <span className="text-white text-sm font-semibold">
            {user.name || ""}
          </span>
          <button
            onClick={handleLogout}
            className="text-xs font-medium text-gray-400 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
