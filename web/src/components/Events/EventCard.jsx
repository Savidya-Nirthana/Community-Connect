import TestImage from "../../assets/event/test1.jpeg";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Button } from "@mui/material";
const EventCard = ({ item }) => {
  return (
    <div>
      <div className=" border border-slate-200 shadow-lg shadow-slate-200 rounded-md p-2">
        <div className=" w-[250px] m-auto">
          <img src={item.bannerUrl} className="rounded-md w-[250px] h-[200px]" />
        </div>
        <div className=" text-xl my-2 font-semibold ml-2">{item.title}</div>
        <div className=" flex flex-row gap-3 text-slate-600 ml-2 mb-2">
          <CalendarTodayIcon />
          <div>{item.date.length > 1 ? item.date[0].split("T")[0] : item.date[0].split("T")[0]}</div> <span className="text-[#ff942b]">{item.date.length > 1 ? "Onwards" : ""}</span>
          <div>{item.start_time}</div>
        </div>
        <div className=" flex gap-3 text-slate-600 ml-2">
          <LocationOnOutlinedIcon />
          <div>{item.location.address.substring(0,27)}</div>
        </div>
        <div className=" flex-row font-semibold text-xl text-[#ff942b] my-2 ml-2">
          <div>$ {item.price}</div>
        </div>
        <Button variant="contained" className=" w-[265px] m-auto">
          Join the Event
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
