import API from "./axiosinstant";
const BASE_URL = "api/v1/ui";

export const uploadBanner = async (image) => {
  console.log("image upload service");
  try {
    const formData = new FormData();
    formData.append("file", image);
    const response = await API.post(`${BASE_URL}/bannerUpload`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const upadateDatabase = async (url) => {
  try {
    const response = await API.post(
      `${BASE_URL}/databaseUpdate`,
      { url },
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getBanner = async () => {
  try {
    const response = await API.get(`${BASE_URL}/getBanner`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const removeBanner = async () => {
  try {
    const response = await API.get(`${BASE_URL}/removeBanner`);
    return response;
  } catch (e) {
    console.log(e);
  }
};
