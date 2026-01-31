import TestImage from "../../assets/event/test1.jpeg";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Button } from "@mui/material";
const EventCard = () => {
  return (
    <div>
      <div className=" border border-slate-200 shadow-lg shadow-slate-200 rounded-md p-2">
        <div className=" w-[250px] m-auto">
          <img src={TestImage} className="rounded-md" />
        </div>
        <div className=" text-xl my-2 font-semibold ml-2">Beats and Bars</div>
        <div className=" flex flex-row gap-3 text-slate-600 ml-2 mb-2">
          <CalendarTodayIcon />
          <div>Dec 23, 2025</div>
          <div>6.00 P.M</div>
        </div>
        <div className=" flex gap-3 text-slate-600 ml-2">
          <LocationOnOutlinedIcon />
          <div>Lional wendt, Colombo</div>
        </div>
        <div className=" flex-row font-semibold text-xl text-[#ff942b] my-2 ml-2">
          <div>Free</div>
        </div>
        <Button variant="contained" className=" w-[250px] m-auto">
          Join the Event
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
