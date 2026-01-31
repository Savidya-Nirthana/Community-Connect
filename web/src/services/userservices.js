import API from "./axiosinstant";
const BASE_URL = "api/v1/user";

export const sendEmail = async (email) => {
  try {
    const response = await API.post(
      `${BASE_URL}/otpReq`,
      { email },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const sendOtp = async (otp, email, isOldEmail) => {
  try {
    const response = await API.post(
      `${BASE_URL}/otpSend`,
      { otp, email, isOldEmail },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
};

export const registerUser = async (
  email,
  firstname,
  lastname,
  dob,
  occupation
) => {
  try {
    const response = await API.post(
      `${BASE_URL}/registerUser`,
      { email, firstname, lastname, dob, occupation },
      { withCredentials: true }
    );

    console.log(response);
    return response;
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const verifyUser = async () => {
  try {
    const response = await API.post(
      `${BASE_URL}/getData`,
      {},
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const logOut = async () => {
  try {
    const response = await API.post(
      `${BASE_URL}/logOut`,
      {},
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
