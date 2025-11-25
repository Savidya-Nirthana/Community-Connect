import { useState } from "react";
import Logo from "../assets/logo/logo-sample-4.png";
import { Button, TextField } from "@mui/material";
import { sendEmail } from "../services/userservices";
import Alerts from "../components/Alerts";
import Apple from "../assets/logo/apple.png";
import Google from "../assets/logo/google.png";
import Facebook from "../assets/logo/facebook.png";
import Banner from "../assets/logo/banner.jpg";

const Authentication = () => {
  const [email, setEmail] = useState(null);
  const [isOldEmail, setIsOldEmail] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmail = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsError(false);
    setMessage("");
    setOpen(false);
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
    }
    setIsLoading(false);
  };
  const handleSubmit = async () => {
    //
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
                  <div className="flex-1 h-[1px] bg-slate-400"></div>

                  <span className="mx-3 bg-white px-3 text-slate-400 font-bold z-10">
                    Or
                  </span>

                  <div className="flex-1 h-[1px] bg-slate-400"></div>
                </div>
              </div>

              <div className=" w-[400px] text-[12px] text-center mb-6">
                By clicking Continue or the Apple, Google, or Facebook icons,
                you agree to Comminity Connect's{" "}
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
                    <img src={Apple} alt="" className=" w-[20px]" />
                    <div className=" font-semibold">Sign in with Apple</div>
                  </div>
                  <div className=" flex flex-row w-[250px] border-[1.5px] rounded-md justify-around py-2 items-center mb-5">
                    <img src={Google} alt="" className=" w-[20px]" />
                    <div className=" font-semibold">Sign in with Google</div>
                  </div>
                  <div className=" flex flex-row w-[250px] border-[1.5px] rounded-md justify-around py-2 items-center">
                    <img src={Facebook} alt=" " className="w-[20px]" />
                    <div className=" font-semibold">Sign in with Facebook</div>
                  </div>
                </div>
              </div>
              <div className=" text-center font-bold text-[13px] mt-6 text-blue-700 hover:underline cursor-pointer">
                Trouble to login?
              </div>
            </div>
          )}
        </div>

        <div className=" absolute top-10 right-10">
          <Alerts
            open={open}
            setOpen={setOpen}
            message={message}
            setMessage={setMessage}
            isError={isError}
            setIsError={setIsError}
          />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
