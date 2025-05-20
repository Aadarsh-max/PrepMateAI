import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;
    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      //Ai API to generate questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });
      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="max-w-[750px] w-full mx-auto p-10 flex flex-col justify-center
               bg-[#0A081A] rounded-xl shadow-[0_0_25px_rgba(63,225,255,0.1)]
               text-white"
    >
      <h3 className="text-xl font-semibold text-[#3FE1FF]">
        Start a New Interview Journey
      </h3>
      <p className="text-sm text-[#B0B0C0] mt-2 mb-6 leading-relaxed">
        Fill out a few quick details and unlock your personalized set of
        interview questions!
      </p>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-6">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="(e.g., Frontend Developer, UI/UX Designer, etc.)"
          type="text"
          className="text-white placeholder-[#B0B0C0] bg-[#0A081A] border border-[#3FE1FF] rounded-md px-4 py-3 w-full"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience"
          placeholder="(e.g., 1 year, 3 years, 5+ years)"
          type="number"
          className="text-white placeholder-[#B0B0C0] bg-[#0A081A] border border-[#3FE1FF] rounded-md px-4 py-3 w-full"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus On"
          placeholder="(Comma-separated, e.g., React, Node.js, MongoDB)"
          type="text"
          className="text-white placeholder-[#B0B0C0] bg-[#0A081A] border border-[#3FE1FF] rounded-md px-4 py-3 w-full"
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Description"
          placeholder="(Any specific goals or notes for this session)"
          type="text"
          className="text-white placeholder-[#B0B0C0] bg-[#0A081A] border border-[#3FE1FF] rounded-md px-4 py-3 w-full"
        />

        {error && <p className="text-pink-500 text-sm pb-2">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 mt-4 font-semibold rounded-md
                   bg-gradient-to-r from-[#3FE1FF] via-[#9378FF] to-[#DD3EFF]
                   text-[#000822] hover:brightness-110 transition flex justify-center items-center gap-2"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />}
          Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
