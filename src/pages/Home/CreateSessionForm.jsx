import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForm = () => {
  // Form data state
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error message state

  const navigate = useNavigate();

  // Handle changes on inputs dynamically
  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // On form submit: validate, call APIs, navigate
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
      // Call AI API to generate questions
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

      // Create a new session with generated questions
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      // If creation successful, navigate to the session page
      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      } else {
        setError("Failed to create session. Please try again.");
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
                 bg-black rounded-xl shadow-md text-white border border-white"
    >
      <h3 className="text-xl font-semibold text-white">
        Start a New Interview Journey
      </h3>
      <p className="text-sm text-gray-400 mt-2 mb-6 leading-relaxed">
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
          className="text-white placeholder-gray-500 bg-black border border-gray-600 rounded-md px-4 py-3 w-full"
          required
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience"
          placeholder="(e.g., 1 year, 3 years, 5+ years)"
          type="number"
          min="0"
          className="text-white placeholder-gray-500 bg-black border border-gray-600 rounded-md px-4 py-3 w-full"
          required
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus On"
          placeholder="(Comma-separated, e.g., React, Node.js, MongoDB)"
          type="text"
          className="text-white placeholder-gray-500 bg-black border border-gray-600 rounded-md px-4 py-3 w-full"
          required
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Description"
          placeholder="(Any specific goals or notes for this session)"
          type="text"
          className="text-white placeholder-gray-500 bg-black border border-gray-600 rounded-md px-4 py-3 w-full"
        />

        {error && <p className="text-red-500 text-sm pb-2">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 mt-4 font-semibold rounded-md bg-white text-black
                     hover:bg-gray-200 transition flex justify-center items-center gap-2 cursor-pointer"
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
