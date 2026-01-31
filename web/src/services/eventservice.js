import API from "./axiosinstant";
const BASE_URL = "api/v1/event";

export const createEvent = async (submit_data) => {
  try {
    if (submit_data.banner) {
      const formData = new FormData();
      formData.append("banner", submit_data.banner);
      const upload_response = await API.post(
        `${BASE_URL}/uploadBanner`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      submit_data.banner = upload_response.data.bannerUrl;
      // console.log("Banner uploaded:", submit_data.banner);
    }

    const response = await API.post(
      `${BASE_URL}/createEvent`,
      submit_data,
      { withCredentials: true }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
