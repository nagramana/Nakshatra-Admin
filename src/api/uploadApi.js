// import axios from "axios";

// export const uploadImage = async (file) => {
//   const formData = new FormData();

//   formData.append("image", file);

//   const response = await axios.post(
//     "https://nakshatra-mart-backend.onrender.com/api/upload",
//     formData,
//     {
//       headers: {
//         "Content-Type":
//           "multipart/form-data",
//       },
//     }
//   );

//   return response.data.imageUrl;
// };


import axios from "axios";

const API_URL =
  "https://nakshatra-mart-backend.onrender.com";

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();

    formData.append("image", file);

    const response = await axios.post(
      `${API_URL}/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(
      "Upload Response:",
      response.data
    );

    return response.data.imageUrl; // IMPORTANT
  } catch (error) {
    console.error(
      "Upload Error:",
      error
    );

    return "";
  }
};