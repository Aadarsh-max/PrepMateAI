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
      <div className="w-full min-h-full bg-[#0A081A] text-white relative">
        <div className="w-[500px] bg-[#0DC6FF]/10 blur-[65px] absolute top-0 left-0" />

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-2xl font-bold bg-clip-text bg-gradient-to-br from-[#3FE1FF] via-[#9378FF] to-[#DD3EFF] animate-text-shine">
              PrepMate AI
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-[#3FE1FF] to-[#DD3EFF] text-sm font-semibold text-[#000822] px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer shadow-md hover:shadow-[#0DC6FF]/50"
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
                <div className="flex items-center gap-2 text-[13px] text-[#0DC6FF] font-semibold bg-[#0DC6FF]/10 px-3 py-1 rounded-full border border-[#0DC6FF]/30">
                  <LuSparkles />
                  AI Powered
                </div>
              </div>

              <h1 className="text-5xl font-medium mb-6 leading-tight text-white">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#3FE1FF] via-[#9378FF] to-[#DD3EFF] animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-[#B0B0C0] mr-0 md:mr-20 mb-60">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery - your ultimate interview toolkit is
                here.
              </p>

              <button
                className="bg-gradient-to-r from-[#3FE1FF] to-[#DD3EFF] text-sm font-semibold text-[#000822] px-7 py-2.5 rounded-full hover:from-[#DD3EFF] hover:to-[#3FE1FF] hover:text-white border border-[#0DC6FF]/30 transition-colors cursor-pointer shadow-md hover:shadow-[#9378FF]/60"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-full relative z-10 bg-[#0A081A]">
        <section className="flex items-center justify-center -mt-36">
          <img
            src={IMG}
            alt="Hero_img"
            className="w-[80vw] rounded-lg shadow-lg shadow-cyan-400/10"
          />
        </section>

        <div className="w-full min-h-full mt-10 bg-[#0A081A]">
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
                      className="bg-[#15132B] p-6 rounded-xl shadow-xs hover:shadow-lg hover:shadow-[#0DC6FF]/20 transition border border-[#0DC6FF]/10 text-white"
                    >
                      <h3 className="text-base font-semibold mb-3 text-[#0DC6FF]">
                        {feature.title}
                      </h3>
                      <p className="text-[#B0B0C0]">{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* Remaining 2 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#15132B] p-6 rounded-xl shadow-xs hover:shadow-lg hover:shadow-[#0DC6FF]/20 transition border border-[#0DC6FF]/10 text-white"
                    >
                      <h3 className="text-base font-semibold mb-3 text-[#0DC6FF]">
                        {feature.title}
                      </h3>
                      <p className="text-[#B0B0C0]">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="text-lg bg-[#0F0D26] text-center p-5 mt-5 border-t border-[#2c2c3c]">
          <p className="text-[#B0B0C0] mb-2 text-xl">Created By</p>
          <p className="glow-text font-semibold text-lg">Prapti Churi</p>
          <p className="glow-text font-semibold text-lg">Dhvani Sawani</p>
          <p className="glow-text font-semibold text-lg">Aadarsh Shrivastav</p>
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
