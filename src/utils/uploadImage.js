import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    //file image to form data
    formData.append('image', imageFile);

    try {
  const response = await axiosInstance.post("/auth/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (!response.data || !response.data.imageUrl) {
    throw new Error("Invalid image upload response.");
  }

  return response.data.imageUrl;

} catch (error) {
  console.error("Upload failed:", error.response?.data || error.message);
  // Show toast or alert to user
}

};

export default uploadImage;