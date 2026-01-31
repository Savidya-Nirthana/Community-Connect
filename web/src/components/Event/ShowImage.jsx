import { useRef, useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const ShowImage = ({
  bannerPreview,
  setBannerPreview,
  banner,
  setBanner,
  setPosition
}) => {
  const fileInputRef = useRef(null);
  const openFilePicker = () => {
    fileInputRef.current.click();
  };
  const handlefileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerPreview(URL.createObjectURL(file));
      setBanner(file);
    }
  };

  return (
    <div className="">
      <div className=" text-[40px] font-semibold">
        Let’s make your event look great
      </div>
      <div className="w-full flex items-center justify-center h-[400px] z-0">
        <div className="bg-slate-200 w-[600px] h-[300px] rounded-[20px] relative">
          {bannerPreview ? (
            <img
              src={bannerPreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-[20px]"
            />
          ) : (
            <div className="flex-col flex items-center justify-center gap-3 h-full">
              <div
                className=" flex flex-col items-center justify-center cursor-pointer"
                onClick={openFilePicker}
              >
                <DriveFolderUploadOutlinedIcon />
                <div>Upload Image</div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handlefileChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        className={` px-20 py-5 rounded-4xl ${
           "bg-[#ff942b]"
        } text-white float-end  mr-10`}
        onClick={() => {
          setPosition(4);
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default ShowImage;
