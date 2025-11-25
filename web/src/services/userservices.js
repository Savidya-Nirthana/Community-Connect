import API from "./axiosinstant";
const BASE_URL = "api/v1/user";

export const sendEmail = async (email) => {
  try {
    const response = await API.post(
      `${BASE_URL}/otpReq`,
      { email },
      { withCredentials: true }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
