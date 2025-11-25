import { Button, TextField } from "@mui/material";
import Logo from "../assets/logo/logo-sample-4.png";
const SignIn = () => {
  return (
    <div className=" bg-white p-10">
      <div className=" flex items-center justify-start">
        <img src={Logo} className=" w-[50px] h-[50px]" />
        <div>
          <span className=" text-[#ff942b] font-bold ">Community</span>{" "}
          <span className=" font-bold text-slate-600">Connect</span>
        </div>
      </div>
      <div className=" text-4xl pl-2 my-10 font-semibold">
        Welcome back!
        <br /> What's your email?
      </div>
      <div>
        <TextField required label={"Email"} className=" w-[400px]" />
        <br />
        <Button
          fullWidth
          loading={false}
          loadingPosition="end"
          sx={{
            backgroundColor: "#ff942b",
            marginY: 2,
            width: "400px",
          }}
          variant="contained"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
