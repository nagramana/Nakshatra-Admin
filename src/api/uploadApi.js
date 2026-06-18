import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await axios.post(
    "https://nakshatra-mart-backend.onrender.com/api/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data.imageUrl;
};