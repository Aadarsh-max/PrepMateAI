import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

 
  const logEvent = (level, message, data = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      component: "Login",
      message,
      ...data,
    };

    console.log(
      `[${level.toUpperCase()}] ${timestamp} - Login Component: ${message}`,
      data
    );
  };
  React.useEffect(() => {
    logEvent("info", "Login component mounted");

    return () => {
      logEvent("info", "Login component unmounted");
    };
  }, []);

  const handleEmailChange = ({ target }) => {
    const newEmail = target.value;
    logEvent("debug", "Email input changed", {
      emailLength: newEmail.length,
      hasAtSymbol: newEmail.includes("@"),
    });
    setEmail(newEmail);
  };

  const handlePasswordChange = ({ target }) => {
    const newPassword = target.value;
    logEvent("debug", "Password input changed", {
      passwordLength: newPassword.length,
      hasMinLength: newPassword.length >= 8,
    });
    setPassword(newPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    logEvent("info", "Login form submitted", {
      email: email,
      hasPassword: !!password,
    });

    if (!validateEmail(email)) {
      logEvent("warning", "Email validation failed", {
        email: email,
        reason: "Invalid email format",
      });
      setError("Please enter a valid email address.");
      return;
    }

    logEvent("debug", "Email validation passed", { email: email });

    if (!password) {
      logEvent("warning", "Password validation failed", {
        reason: "Password is empty",
      });
      setError("Please enter the password");
      return;
    }

    logEvent("debug", "Password validation passed");
    setError("");

    //Login API Call
    try {
      logEvent("info", "Starting login API call", {
        endpoint: API_PATHS.AUTH.LOGIN,
        email: email,
      });

      const startTime = performance.now();

      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const endTime = performance.now();
      const apiCallDuration = endTime - startTime;

      logEvent("info", "Login API call successful", {
        responseStatus: response.status,
        responseStatusText: response.statusText,
        apiCallDuration: `${apiCallDuration.toFixed(2)}ms`,
        hasToken: !!response.data?.token,
        responseDataKeys: Object.keys(response.data || {}),
      });

      const { token } = response.data;

      if (token) {
        logEvent("info", "Token received, storing in localStorage", {
          tokenLength: token.length,
          tokenPrefix: token.substring(0, 10) + "...",
        });

        localStorage.setItem("token", token);

        logEvent("info", "Updating user context", {
          userData: {
            ...response.data,
            token: "[REDACTED]", 
          },
        });

        updateUser(response.data);

        logEvent("info", "Navigating to dashboard");
        navigate("/dashboard");

        logEvent("success", "Login process completed successfully");
      } else {
        logEvent("error", "No token received in response", {
          responseData: response.data,
        });
        setError("Login failed. No authentication token received.");
      }
    } catch (error) {
      const endTime = performance.now();

      logEvent("error", "Login API call failed", {
        error: error.message,
        errorStack: error.stack,
        responseStatus: error.response?.status,
        responseStatusText: error.response?.statusText,
        responseData: error.response?.data,
        requestConfig: {
          url: error.config?.url,
          method: error.config?.method,
          timeout: error.config?.timeout,
        },
      });

      if (error.response && error.response.data.message) {
        logEvent("warning", "Setting error message from API response", {
          errorMessage: error.response.data.message,
        });
        setError(error.response.data.message);
      } else {
        logEvent("warning", "Setting generic error message", {
          originalError: error.message,
        });
        setError("Something went wrong. Please try again.");
      }
    }
  };

  // Navigation logging
  const handleSignUpClick = () => {
    logEvent("info", "User clicked SignUp button");
    setCurrentPage("signup");
  };

  return (
    <div
      className="w-full md:w-[45vw] max-w-md p-7 flex flex-col justify-center
               bg-black rounded-lg shadow-md mx-auto my-16 border border-white"
    >
      <h3 className="text-lg font-semibold text-white">Welcome Back</h3>
      <p className="text-xs text-gray-400 mt-1 mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={handleEmailChange}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
          className="text-white placeholder-gray-500 bg-black border border-gray-600 rounded-md px-3 py-2 mb-4"
        />

        <Input
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
          className="text-white placeholder-gray-500 bg-black border border-gray-600 rounded-md px-3 py-2 mb-4"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 mt-2 font-semibold rounded-md bg-white text-black hover:bg-gray-200 transition cursor-pointer"
        >
          LOGIN
        </button>

        <p className="text-sm text-gray-400 mt-3">
          Don't have an account?{" "}
          <button
            className="font-medium underline cursor-pointer text-white hover:text-gray-200 transition"
            onClick={handleSignUpClick}
            type="button"
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
