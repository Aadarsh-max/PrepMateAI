export const BASE_URL = "http://localhost:8000"; 

export const API_PATHS = {
    AUTH:{
        REGISTER: "/api/auth/register", //signup
        LOGIN: "/api/auth/login", //authenticate user
        GET_PROFILE: "/api/auth/profile", //Get user details
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image" //upload profile pic
    },

    AI: {

        GENERATE_QUESTIONS: "/api/ai/generate-questions", //generate interview questions & answers
        GENERATE_EXPLANATION: "/api/ai/generate-explanation", //generate concept explanation
    },

    SESSION: {
        CREATE: "/api/sessions/create", //create interview session
        GET_ALL: "/api/sessions/my-sessions", //get all user sessions
        GET_ONE: (id) => `/api/sessions/${id}`, //get session details with questions
        DELETE: (id) => `/api/sessions/${id}`, //delete session
    },

    QUESTION: {
        ADD_TO_SESSION: "/api/questions/add", //add more questions
        PIN: (id) => `/api/questions/${id}/pin`, // pin or unpin a question
        UPDATE_NOTE: (id) => `/api/questions/${id}/note`, //update or add a note to a question
    },
};