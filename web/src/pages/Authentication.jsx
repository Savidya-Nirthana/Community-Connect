import { useContext, useState } from "react";
import Logo from "../assets/logo/logo-sample-4.png";
import { Button, TextField } from "@mui/material";
import { registerUser, sendEmail, sendOtp } from "../services/userservices";
import Apple from "../assets/logo/apple.png";
import Google from "../assets/logo/google.png";
import Facebook from "../assets/logo/facebook.png";
import Banner from "../assets/logo/banner.jpg";
import { useNotification } from "../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Authentication = () => {
  const { showNotification } = useNotification();
  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOldEmail, setIsOldEmail] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [getNewInfo, setGetNewInfo] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(null);
  const [occupation, setOccupation] = useState("");
  const { getData } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleEmail = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsError(false);
    setMessage("");
    setIsLoading(true);
    if (!email) {
      setMessage("Please enter valid email to proceed");
      setIsError(true);
      setIsLoading(false);
      return;
    }
    if (!emailRegex.test(email)) {
      setMessage("Please enter valid email to proceed");
      setIsError(true);
      setIsLoading(false);
      return;
    }
    const response = await sendEmail(email);
    if (response.status === 200) {
      setShowOtp(true);
      setIsOldEmail(response.data.isOldUser);
      showNotification("Otp send successfully", "success");
    }
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await sendOtp(otp, email, isOldEmail);

    if (response?.status == 200) {
      setShowOtp(false);
      if (!isOldEmail) {
        setGetNewInfo(true);
      }
      setIsLoading(false);
      showNotification(response.data.message, "success");
      getData();
      navigate("/home");
    } else {
      setIsError(true);
      showNotification(response.message, "error");
      setIsLoading(false);
    }
  };

  const handleAccountCreation = async () => {
    const enteredDate = new Date(dob);
    if (!firstName || !lastName || !dob) {
      setIsError(true);
      setMessage("Required field not set");
      return;
    }

    if (enteredDate > Date.now()) {
      setIsLoading(true);
      setIsError(true);
      setMessage("Please ente valid date");
      return null;
    }
    const response = await registerUser(
      email,
      firstName,
      lastName,
      dob,
      occupation
    );
    if (response.status == 200) {
      setIsOldEmail(false);
      setShowOtp(false);
      showNotification(response.data.message, "success");
      getData();
      navigate("/home");
    } else {
      setIsOldEmail(false);
      setShowOtp(false);
      showNotification(response.message, "error");
    }
    setGetNewInfo(false);
    setIsLoading(false);
  };
  return (
    <div
      className=" w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
      style={{ backgroundImage: `url(${Banner})` }}
    >
      <div className="">
        <div className=" bg-white p-10">
          <div className=" flex items-center justify-start">
            <img src={Logo} className=" w-[50px] h-[50px]" />
            <div>
              <span className=" text-[#ff942b] font-bold ">Community</span>{" "}
              <span className=" font-bold text-slate-600">Connect</span>
            </div>
          </div>

          {getNewInfo ? (
            <>
              <div className=" text-4xl pl-2 my-7 font-semibold">
                Welcome!
                <br /> Tell me about you
              </div>
              <div className=" flex flex-col gap-6">
                <TextField
                  required={true}
                  label={"First name"}
                  className=" w-[400px]"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                <TextField
                  required={true}
                  label={"Last name"}
                  className=" w-[400px]"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
                <div className="">
                  <TextField
                    type="date"
                    label={"Date of birth"}
                    onChange={(e) => setDob(e.target.value)}
                    className=" w-[400px]"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required={true}
                  />
                </div>
                <TextField
                  label={"Occupation"}
                  className=" w-[400px]"
                  onChange={(e) => setOccupation(e.target.value)}
                  value={occupation}
                />
                {isError && (
                  <div className="  text-red-600 font-medium text-[13px] mt-[-18px] ml-1">
                    {message}
                  </div>
                )}
                <Button
                  fullWidth
                  loading={isLoading}
                  loadingPosition="end"
                  sx={{
                    backgroundColor: "#ff942b",

                    width: "400px",
                  }}
                  variant="contained"
                  onClick={handleAccountCreation}
                >
                  Create an account
                </Button>
              </div>
            </>
          ) : (
            <>
              {!showOtp ? (
                <div className=" text-4xl pl-2 my-7 font-semibold">
                  Welcome!
                  <br /> What's your email?
                </div>
              ) : (
                <div className=" text-4xl pl-2 my-7 font-semibold">
                  Enter otp code
                  <br /> Check your email.
                </div>
              )}
              <div>
                <div className=" relative ">
                  <TextField
                    required={true}
                    label={"Email"}
                    className=" w-[400px]"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={showOtp}
                    value={email}
                  />
                  {showOtp && (
                    <div className=" absolute top-3 right-0 ">
                      <Button variant="text" onClick={() => setShowOtp(false)}>
                        edit
                      </Button>
                    </div>
                  )}
                </div>
                {showOtp && (
                  <div>
                    <TextField
                      required
                      label={"Enter one-time-password"}
                      className=" w-[400px]"
                      sx={{
                        marginY: 2,
                      }}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                )}
                {isError && (
                  <div className="  text-red-600 font-medium text-[13px]">
                    {message}
                  </div>
                )}
                {!showOtp ? (
                  <Button
                    fullWidth
                    loading={isLoading}
                    loadingPosition="end"
                    sx={{
                      backgroundColor: "#ff942b",
                      marginY: 2,
                      width: "400px",
                    }}
                    variant="contained"
                    onClick={handleEmail}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    loading={isLoading}
                    loadingPosition="end"
                    sx={{
                      backgroundColor: "#ff942b",

                      width: "400px",
                    }}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
              </div>
              {!showOtp && (
                <div>
                  <div className="w-[400px] mx-auto mb-6 mt-4 relative">
                    <div className="flex items-center">
                      <div className="flex-1 h-px bg-slate-400"></div>

                      <span className="mx-3 bg-white px-3 text-slate-400 font-bold z-10">
                        Or
                      </span>

                      <div className="flex-1 h-px bg-slate-400"></div>
                    </div>
                  </div>

                  <div className=" w-[400px] text-[12px] text-center mb-6">
                    By clicking Continue or the Apple, Google, or Facebook
                    icons, you agree to Comminity Connect's{" "}
                    <span className=" font-bold text-[13px] text-blue-700 hover:underline cursor-pointer">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className=" font-bold text-[13px] text-blue-700 hover:underline cursor-pointer">
                      Privacy Policy
                    </span>
                    .
                  </div>
                  <div className=" w-[400px] flex justify-center">
                    <div>
                      <div className=" flex flex-row w-[250px] border-[1.5px] rounded-md justify-around py-2 items-center mb-5">
                        <img src={Apple} alt="" className=" w-5" />
                        <div className=" font-semibold">Sign in with Apple</div>
                      </div>
                      <div className=" flex flex-row w-[250px] border-[1.5px] rounded-md justify-around py-2 items-center mb-5">
                        <img src={Google} alt="" className=" w-5" />
                        <div className=" font-semibold">
                          Sign in with Google
                        </div>
                      </div>
                      <div className=" flex flex-row w-[250px] border-[1.5px] rounded-md justify-around py-2 items-center">
                        <img src={Facebook} alt=" " className="w-5" />
                        <div className=" font-semibold">
                          Sign in with Facebook
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" text-center font-bold text-[13px] mt-6 text-blue-700 hover:underline cursor-pointer">
                    Trouble to login?
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
