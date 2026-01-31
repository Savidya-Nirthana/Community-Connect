import { useEffect, useRef, useState } from "react";
import { useMap } from "../../services/loactionservice";
import { Input, TextField } from "@mui/material";

const ShowLoaction = ({
  selectedLocation,
  setSelectedLocation,
  setPosition
}) => {
  const { isLoaded } = useMap();
  if (!isLoaded) return <div>Loading Google Map</div>;
  return (
    <div>
      <SearchBox
        isLoaded={isLoaded}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        setPosition={setPosition}
      />
    </div>
  );
};

export default ShowLoaction;

const SearchBox = ({
  isLoaded,
  selectedLocation,
  setSelectedLocation,
  setPosition
}) => {
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    console.log("use effect running");
    if (!window.google || !autoCompleteRef.current) return;
    const autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        types: ["geocode"],
        componentRestrictions: { country: "LK" },
      }
    );

    const listener = autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        console.error("No details available for input: '" + place.name + "'");
        return;
      }

      const locationData = {
        name: place.name,
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      setSelectedLocation(locationData);
    });

    return () => {
      window.google.maps.event.removeListener(listener);
    };
  }, [isLoaded]);

  return (
    <div>
      <div className=" text-[40px] font-semibold">
        Where will your event take <br /> place?
      </div>
      <TextField
        inputRef={autoCompleteRef}
        id="standard-basic"
        label="Enter event location"
        variant="standard"
        sx={{
          width: "500px",
          "& .MuiInputBase-input": {
            fontSize: "40px",
            padding: "5px 0",
          },
          "& .MuiInputLabel-root": {
            fontSize: "30px",
          },
          backgroundColor: "white",
          marginTop: "40px",
        }}
      />
      <button
        className={` px-20 py-5 rounded-4xl ${
          selectedLocation ? "bg-[#ff942b]" : "bg-slate-300"
        } text-white float-end mt-25 mr-10`}
        onClick={() => {
          setPosition(3)
        }}
        disabled={!selectedLocation}
      >
        Continue
      </button>
    </div>
  );
};
