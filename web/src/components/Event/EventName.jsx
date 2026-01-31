import { TextField } from "@mui/material";

const EventName = ({
  eventName,
  setEventName,
  setPosition
}) => {
  return (
    <div className=" m-20 mt-30">
      <div className=" text-[40px] font-semibold">
        Let's start with your event <br /> name
      </div>
      <TextField
        error={eventName.length > 0 && eventName.length <= 6}
        id="standard-basic"
        label="Enter your event name"
        variant="standard"
        sx={{
          width: "500px",
          backgroundColor: "white",
          marginTop: "20px",
          "& .MuiInputBase-input": {
            fontSize: "40px",
            padding: "5px 0",
          },
          "& .MuiInputLabel-root": {
            fontSize: "30px",
          },
          "& .MuiFormHelperText-root": {
            fontSize: "14px",
            marginTop: "10px",
          },
        }}
        onChange={(e) => setEventName(e.target.value)}
        value={eventName}
        helperText={
          eventName.length > 0 && eventName.length <= 6
            ? "Event name must be at least 7 characters long"
            : ""
        }
      />
      <br />
      <div className=" mt-30">
        <button
          className={` px-20 py-5 rounded-4xl ${
            eventName.length > 6 ? "bg-[#ff942b]" : "bg-slate-300"
          } text-white float-end`}
          onClick={() => {
            setPosition(1);
          }}
          disabled={eventName.length <= 6}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default EventName;
