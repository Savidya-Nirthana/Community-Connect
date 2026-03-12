import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";

const categories = [
  "Music & Concerts",
  "Festivals",
  "Sports & Fitness",
  "Workshops & Classes",
  "Business & Networking",
  "Conferences & Seminars",
  "Arts & Culture",
  "Food & Drink",
  "Charity & Fundraising",
  "Community & Local Events",
  "Religious / Spiritual",
  "Family & Kids",
  "Technology & Innovation",
  "Education & Training",
  "Health & Wellness",
  "Parties & Social Gatherings",
  "Travel & Outdoor Activities",
  "Film & Entertainment",
  "Gaming & eSports",
  "Exhibitions & Trade Shows",
];

const MoreDetails = ({
  selectCategory,
  setSelectCategory,
  description,
  setDescription,
  setPosition,
  submit,
  setPrice,
}) => {
  const [isCheck, setIsCheck] = useState(true);
  return (
    <div className="">
      <div className=" text-[40px] font-semibold">
        Add some details about your event
      </div>

      <div className=" mt-10 flex flex-col gap-5">
        <FormControl fullWidth sx={{ fontSize: "20px" }}>
          <InputLabel id="select-category">Select Category</InputLabel>
          <Select
            labelId="select-category"
            id="category-select"
            value={selectCategory}
            label="Select Category"
            onChange={(e) => setSelectCategory(e.target.value)}
          >
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          <TextareaAutosize
            minRows={4}
            placeholder="Write something about your event..."
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox defaultChecked onClick={() => setIsCheck(!isCheck)} />
          }
          label="Free"
        />
        {!isCheck ? (
          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
            <FilledInput
              id="filled-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>
        ) : null}
      </div>
      <button
        className={` px-20 py-5 rounded-4xl mt-10 ${
          selectCategory && description ? "bg-[#ff942b]" : "bg-slate-300"
        } text-white float-end  mr-10 `}
        onClick={submit}
        disabled={!selectCategory && !description}
      >
        Continue
      </button>
    </div>
  );
};

export default MoreDetails;
