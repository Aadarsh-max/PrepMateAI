import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      if (setPreview) setPreview(preview);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) setPreview(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-[#0A081A] border-2 border-[#3FE1FF] rounded-full relative cursor-pointer shadow-md">
          <LuUser className="text-4xl text-[#B0B0C0]" />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-[#3FE1FF] via-[#9378FF] to-[#DD3EFF] text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer shadow-lg"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#9378FF]"
          />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-[#DD3EFF] text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer shadow-lg"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
