import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function CustomDay(props) {
  const { day, selectedDates, ...other } = props;
  const dateString = dayjs(day).format("YYYY-MM-DD");

  const isSelected = selectedDates.includes(dateString);

  return (
    <PickersDay
      {...other}
      day={day}
      sx={{
        backgroundColor: isSelected ? "#ff942b" : "inherit",
        color: isSelected ? "white" : "black",
        borderRadius: "50%",
        "&:hover": {
          backgroundColor: isSelected ? "#ff942b" : "#ddd",
        },
      }}
    />
  );
}

const MultiDatePicker = ({ selectedDates, setSelectedDates, setStartTime ,setPosition }) => {
  const toggleDate = (date) => {
    const dateString = dayjs(date).format("YYYY-MM-DD");

    if (selectedDates.includes(dateString)) {
      setSelectedDates(selectedDates.filter((d) => d !== dateString));
    } else {
      setSelectedDates([...selectedDates, dateString]);
    }
  };
  return (
    <div>
      <div className=" text-[40px] font-semibold mb-10">
        When is your event happening?
      </div>
      <DateCalendar
        disablePast
        onChange={(newDate) => toggleDate(newDate)}
        slots={{ day: CustomDay }}
        slotProps={{ day: { selectedDates } }}
      />

      <div className="flex flex-row gap-2 justify-end mr-20">
        <div className="font-semibold text-[20px]">Start time: </div>
        <input type="time" onChange={(e) => setStartTime(e.target.value)} />
      </div>
      <button
        className={` px-20 py-5 rounded-4xl ${
          selectedDates.length > 0 ? "bg-[#ff942b]" : "bg-slate-300"
        } text-white float-end mr-20 mt-10`}
        onClick={() => {
          setPosition(2);
        }}
        disabled={selectedDates.length <= 0}
      >
        Continue
      </button>
    </div>
  );
};

export default MultiDatePicker;
