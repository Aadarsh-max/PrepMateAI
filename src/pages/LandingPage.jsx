import React, { useContext, useState } from "react";

import IMG from "../assets/img1.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };
 return (
  <>
    <div className="w-full min-h-full bg-white text-gray-900 relative">
      <div className="w-[500px] bg-blue-100/40 blur-[65px] absolute top-0 left-0" />

      <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-gray-900">PrepMate AI</div>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              className="bg-gray-900 text-white text-sm font-semibold px-7 py-2.5 rounded-full border border-gray-900
                       hover:bg-white hover:text-gray-900 transition-colors cursor-pointer shadow-sm"
              onClick={() => setOpenAuthModal(true)}
            >
              Login / Sign Up
            </button>
          )}
        </header>

        {/* Hero Content */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
            <div className="flex items-center justify-left mb-2">
              <div className="flex items-center gap-2 text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-200">
                <LuSparkles />
                AI Powered
              </div>
            </div>

            <h1 className="text-5xl font-medium mb-6 leading-tight text-gray-900">
              Ace Interviews with <br />
              <span className="text-blue-600 font-semibold">
                AI-Powered
              </span>{" "}
              Learning
            </h1>
          </div>

          <div className="w-full md:w-1/2">
            <p className="text-sm text-gray-600 mr-0 md:mr-20 mb-12">
              Get role-specific questions, expand answers when you need them,
              dive deeper into concepts, and organize everything your way.
              From preparation to mastery - your ultimate interview toolkit is
              here.
            </p>

            <button
              className="bg-gray-900 text-white text-sm font-semibold px-7 py-2.5 rounded-full border border-gray-900
                       hover:bg-white hover:text-gray-900 transition-colors cursor-pointer shadow-sm"
              onClick={handleCTA}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="w-full min-h-full relative z-10 bg-white">
      <section className="flex items-center justify-center -mt-36">
        <img
          src={IMG}
          alt="Hero_img"
          className="w-[80vw] rounded-lg shadow-md"
        />
      </section>

      <div className="w-full min-h-full mt-10 bg-white">
        <div className="container mx-auto px-4 pt-10 pb-20">
          <section className="mt-5">
            <h2 className="text-2xl font-medium text-center mb-12 text-gray-900">
              Features That Make You Shine
            </h2>

            <div className="flex flex-col items-center gap-8">
              {/* First 3 cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {APP_FEATURES.slice(0, 3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200"
                  >
                    <h3 className="text-base font-semibold mb-3 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Remaining 2 cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {APP_FEATURES.slice(3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200"
                  >
                    <h3 className="text-base font-semibold mb-3 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="text-lg bg-gray-50 text-center p-5 mt-5 border-t border-gray-200">
        <p className="text-gray-500 mb-2 text-xl">Created By</p>
        <p className="font-semibold text-gray-800 text-lg">Prapti Churi</p>
        <p className="font-semibold text-gray-800 text-lg">Dhvani Sawani</p>
        <p className="font-semibold text-gray-800 text-lg">Aadarsh Shrivastav</p>
      </div>
    </div>

    <Modal
      isOpen={openAuthModal}
      onClose={() => {
        setOpenAuthModal(false);
        setCurrentPage("login");
      }}
      hideHeader
    >
      <div>
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && (
          <SignUp setCurrentPage={setCurrentPage} />
        )}
      </div>
    </Modal>
  </>
);

};

export default LandingPage;
