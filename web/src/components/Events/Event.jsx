import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../services/eventservice";
import { DateCalendar } from "@mui/x-date-pickers";
import ExploreIcon from '@mui/icons-material/Explore';


const Event = () => {
  const [hoverLocation, setHoverLocation] = useState(false);
  const [eventData, setEventData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getPageContent = async () => {
      const response = await getEventById(id);
      console.log(response.data);
      setEventData(response.data);
    };
    getPageContent();
  }, [id]);
  return (
    <div className=" top-10 max-w-[1000px] mx-auto">
      {/* <p>{eventData?.description}</p> */}
      {/* <p>{eventData?.date}</p> */}
      {/* <p>{eventData?.start_time}</p>  */}
      {/* <p>{eventData?.location}</p> */}
      <div className=" mb-10">
        <h1 className="text-2xl font-bold pt-10 pb-3">{eventData?.title}</h1>
        <div className="flex justify-start gap-5">
          <p className="text-lg text-orange-400  bg-amber-100 w-fit px-2 py-1 rounded-lg">{eventData?.category}</p>
          <p className=" bg-green-400 text-white w-fit px-2 py-1 rounded-lg">{eventData?.price}</p>
          <div onMouseEnter={() => setHoverLocation(true)} onMouseLeave={() => setHoverLocation(false)} className=" flex items-center relative">
         
          <p className=" font-semibold">{eventData?.location.name.toUpperCase()}</p>
          {hoverLocation && (
            <div className="absolute bg-white p-2 rounded-lg shadow-md flex gap-2 top-8 w-[200px] break-words">
              <p>{eventData?.location.address}</p>
              <div className=" cursor-pointer hover:text-orange-400 transition-colors duration-300"  onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=" + eventData?.location.lat + "," + eventData?.location.lng, "_blank")}>
               <ExploreIcon/>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>


      <div className=" flex">

        <div className=" flex justify-start">
          <img src={eventData?.bannerUrl} alt="" className="w-[800px] rounded-lg" />
        </div>


      </div>

        <div className="flex justify-between mt-10">
          <div className="w-[50%] text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quisquam excepturi laborum quia doloribus iste reprehenderit et, neque quam repudiandae provident soluta beatae. Ad reprehenderit aut eveniet odit ipsam ipsum?
          </div>
          <div className=" rounded-lg p-5 border-[0.5px] border-[#ff942b] shadow-[#ff942b] shadow-sm h-[350px] w-[400px]">
            <DateCalendar/>
          </div>
        </div>
    </div>
  );
};

export default Event;
