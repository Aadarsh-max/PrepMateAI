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
      <div className="w-full min-h-full bg-black text-white relative">
        <div className="w-[500px] bg-white/5 blur-[65px] absolute top-0 left-0" />

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-2xl font-bold text-white">PrepMate AI</div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-white text-black text-sm font-semibold px-7 py-2.5 rounded-full border border-white
                         hover:bg-black hover:text-white transition-colors cursor-pointer shadow-sm"
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
                <div className="flex items-center gap-2 text-xs font-semibold bg-white/10 text-white px-3 py-1 rounded-full border border-white/30">
                  <LuSparkles />
                  AI Powered
                </div>
              </div>

              <h1 className="text-5xl font-medium mb-6 leading-tight text-white">
                Ace Interviews with <br />
                <span className="text-white font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-sm text-gray-400 mr-0 md:mr-20 mb-60">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery - your ultimate interview toolkit is
                here.
              </p>

              <button
                className="bg-white text-black text-sm font-semibold px-7 py-2.5 rounded-full border border-white/30
                         hover:bg-black hover:text-white transition-colors cursor-pointer shadow-sm"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-full relative z-10 bg-black">
        <section className="flex items-center justify-center -mt-36">
          <img
            src={IMG}
            alt="Hero_img"
            className="w-[80vw] rounded-lg shadow-lg shadow-white/10"
          />
        </section>

        <div className="w-full min-h-full mt-10 bg-black">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="text-2xl font-medium text-center mb-12 text-white">
                Features That Make You Shine
              </h2>

              <div className="flex flex-col items-center gap-8">
                {/* First 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-gray-900 p-6 rounded-xl shadow-xs hover:shadow-md hover:shadow-white/20
                               transition border border-white/10 text-white"
                    >
                      <h3 className="text-base font-semibold mb-3 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* Remaining 2 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-gray-900 p-6 rounded-xl shadow-xs hover:shadow-md hover:shadow-white/20
                               transition border border-white/10 text-white"
                    >
                      <h3 className="text-base font-semibold mb-3 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="text-lg bg-[#121021] text-center p-5 mt-5 border-t border-white/10">
          <p className="text-gray-400 mb-2 text-xl">Created By</p>
          <p className="font-semibold text-white text-lg">Prapti Churi</p>
          <p className="font-semibold text-white text-lg">Dhvani Sawani</p>
          <p className="font-semibold text-white text-lg">Aadarsh Shrivastav</p>
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
