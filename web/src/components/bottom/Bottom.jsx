import { Button } from "@mui/material";
// import {logo} from "../../assets/logo-sample-4.png";

const Bottom = () => {
  return (
    <div>
      <div className="w-full flex flex-col items-center justify-center bg-slate-900 py-20">
        <div className=" text-[50px] text-white">
          Community Connecting just in time
        </div>
        <div className=" text-[30px] text-white pb-5">
          Create your event in 2 minutes
        </div>
        <Button
          sx={{
            backgroundColor: "blue",
            color: "white",
          }}
        >
          Get Started
        </Button>
      </div>
      <div>
        <div className=" h-90 w-full bg-slate-100 flex justify-center gap-50 items-start pt-20 text-xl">
          <div>
            <div className=" text-2xl font-semibold">Product</div>
            <div>Feature</div>
            <div>Event Registration</div>
            <div>Resources</div>
            <div>Enterprise</div>
            <div>Pricing</div>
          </div>
          <div>
            <div className=" text-2xl font-semibold">Event Booking</div>
            <div>About Us</div>
            <div>Blog</div>
            <div>Sign Up</div>
            <div>SignIn</div>
            <div>Affiliate</div>
          </div>
          <div>
            <div className=" text-2xl font-semibold">Help Support</div>
            <div>Contact Us</div>
            <div>Help Center</div>
            <div>Developers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
