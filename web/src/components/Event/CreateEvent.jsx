import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState } from "react";
import eventImg from "../../assets/event/event.jpg";
import MultiDatePicker from "./MultiDatePicker";
import { AnimatePresence, motion } from "motion/react";
import EventName from "./EventName";
import ShowLoaction from "./ShowLocation";
import ShowImage from "./ShowImage";
import MoreDetails from "./MoreDetails";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { IconButton } from "@mui/material";
import { createEvent } from "../../services/eventservice";
import { useNotification } from "../../contexts/NotificationContext";

const CreateEvent = ({ setCreateEvent }) => {
  const { showNotification } = useNotification();
  const [eventName, setEventName] = useState("");

  const [selectedDates, setSelectedDates] = useState([]);

  const [bannerPreview, setBannerPreview] = useState(null);
  const [banner, setBanner] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [selectCategory, setSelectCategory] = useState(null);
  const [description, setDescription] = useState(null);

  const [position, setPosition] = useState(0);

  const [startTime, setStartTime] = useState(null);

  const [maxPostion, setMaxPosition] = useState(0);

  const [loading, setLoading] = useState(false);

  const [price, setPrice] = useState("Free")

  const submit = async () => {
    setLoading(true);
    const submit_data = {
      event_name: eventName,
      selected_dates: selectedDates,
      banner: banner,
      select_location: selectedLocation,
      select_category: selectCategory,
      description: description,
      start_time: startTime,
      price: price
    };

    console.log(submit_data);

    const response = await createEvent(submit_data);
    if (response.status === 201) {
      setLoading(false);
      showNotification(response.data.message, "success");
      setCreateEvent(false);
    }
  };

  useEffect(() => {
    const maxSet = () => {
      if (position >= maxPostion) {
        setMaxPosition(position);
      }
    };
    maxSet();
  }, [position]);

  const items = [
    <EventName
      eventName={eventName}
      setEventName={setEventName}
      setPosition={setPosition}
    />,
    <MultiDatePicker
      selectedDates={selectedDates}
      setSelectedDates={setSelectedDates}
      setStartTime={setStartTime}
      setPosition={setPosition}
    />,
    <ShowLoaction
      selectedLocation={selectedLocation}
      setSelectedLocation={setSelectedLocation}
      setPosition={setPosition}
    />,
    <ShowImage
      bannerPreview={bannerPreview}
      setBannerPreview={setBannerPreview}
      banner={banner}
      setBanner={setBanner}
      setPosition={setPosition}
    />,
    <MoreDetails
      selectCategory={selectCategory}
      setSelectCategory={setSelectCategory}
      description={description}
      setDescription={setDescription}
      setPosition={setPosition}
      submit={submit}
      setPrice={setPrice}
    />,
  ];

  const next = () => {
    if (position < maxPostion) {
      setPosition(position + 1);
    } else {
      setPosition(0);
    }
  };

  const prev = () => {
    if (position > 0) {
      setPosition(position - 1);
    } else {
      setPosition(4);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="text-white text-xl">Creating Event...</div>
        </div>
      )}
      <div className=" w-full h-screen bg-white fixed inset-0 z-100 flex justify-between">
        <div className=" w-[120%]">
          <div className=" flex flex-row justify-between mx-5 mt-8">
            <IconButton
              onClick={prev}
              disabled={position === 0}
              sx={{ opacity: position === 0 ? 0.3 : 1 }}
            >
              <NavigateBeforeIcon />
            </IconButton>

            <IconButton
              onClick={next}
              disabled={position === maxPostion}
              sx={{ opacity: position === 5 - 1 ? 0.3 : 1 }}
            >
              <NavigateNextIcon />
            </IconButton>
          </div>
          <div className=" flex flex-row mx-20 my-10 gap-5  items-center">
            <CloseIcon
              sx={{ fontSize: "23px", cursor: "pointer" }}
              onClick={() => setCreateEvent(false)}
            />
            <div className=" text-[28px] font-semibold">Create an event</div>
          </div>
          <AnimatePresence>
            <motion.div
              className=" m-25 mt-10"
              key="show-calendar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {items[position]}
            </motion.div>
          </AnimatePresence>
        </div>
        <div>
          <img src={eventImg} className=" " />
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
