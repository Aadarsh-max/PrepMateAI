import React from "react";
import { Link } from "react-router-dom";
import ProfileInfoCard from "../Cards/ProfileInfoCard";

const Navbar = () => {
  return (
    <div className="h-16 bg-black/90 border-b border-white/10 backdrop-blur-md py-2.5 px-4 md:px-0 sticky top-0 z-30 shadow-sm">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to="/dashboard">
          <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
            PrepMate AI
          </h2>
        </Link>

        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
