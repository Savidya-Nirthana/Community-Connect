import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { AnimatePresence, motion } from "motion/react";
import { Button, CircularProgress } from "@mui/material";
import {
  getBanner,
  removeBanner,
  upadateDatabase,
  uploadBanner,
} from "../../services/webuiservices";
import { useNotification } from "../../contexts/NotificationContext";

const BannerContainer = () => {
  const { user, loading } = useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const [checked, setChecked] = useState(false);
  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [isBannerRemover, setIsRemoveBanner] = useState(false);
  const fileInputRef = useRef(null);
  const [refresh, setRefresh] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    const getUrl = async () => {
      setLoadingContent(true);
      const bannerUrl = await getBanner();
      setBanner(bannerUrl.data.url);
      setLoadingContent(false);
    };

    getUrl();
  }, [refresh]);

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handlefileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const bannerRemove = async () => {
    setLoadingContent(true);
    if (preview) {
      setPreview(null);
      setIsRemoveBanner(false);
    } else {
      const response = await removeBanner();
      if (response.status === 200) {
        showNotification(response.data.message, "success");
        setIsRemoveBanner(false);
        setBanner(null);
        setRefresh((prev) => setRefresh(!prev));
      }
    }
    setLoadingContent(false);
  };

  const changeImage = async () => {
    setChecked(true);
    setLoadingContent(true);
    const response = await uploadBanner(image);
    if (response.status === 200) {
      const result = await upadateDatabase(response.data.path);
      if (result.status === 200) {
        showNotification(result.data.message, "success");
        setChecked(false);
        setPreview(null);
        setRefresh((prev) => setRefresh(!prev));
        setLoadingContent(false);
        return;
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-[500px]  z-0 pt-[150px]">
        <div className="bg-slate-200 w-[1200px] h-[400px] rounded-[20px] relative animate-pulse">
          <div className="flex-col flex gap-3 absolute bottom-20 right-20"></div>
        </div>
      </div>
    );
  }
  return (
    <>
      {user?.role === "admin" ? (
        <div className="w-full flex items-center justify-center h-[500px] z-0 pt-[150px]">
          <div className="bg-slate-200 w-[1200px] h-[400px] rounded-[20px] relative">
            {(preview || banner) && (
              <div className=" absolute right-[-30px] top-0 cursor-pointer">
                <div className=" flex flex-col gap-2">
                  <CancelOutlinedIcon
                    sx={{ color: "red" }}
                    onClick={() => setIsRemoveBanner(true)}
                  />

                  {preview && (
                    <CheckCircleOutlineIcon
                      sx={{ color: "green" }}
                      onClick={changeImage}
                    />
                  )}
                </div>
              </div>
            )}
            {preview || banner ? (
              <img
                src={preview ? preview : banner}
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
          <AnimatePresence>
            {checked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-222 bg-[#00000065] overflow-y-auto flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                  }}
                  className=""
                >
                  <div className=" bg-white w-[300px] text-center rounded-md py-5">
                    {!loadingContent ? (
                      <div>
                        <div className=" mb-4">
                          Are you sure you want change the banner?
                        </div>
                        <div className=" flex flex-row  items-center justify-around w-[230px] m-auto">
                          <Button
                            sx={{ backgroundColor: "red", color: "white" }}
                            onClick={changeImage}
                          >
                            Yes
                          </Button>
                          <Button
                            onClick={() => setChecked(false)}
                            sx={{ backgroundColor: "black", color: "white" }}
                          >
                            No
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <CircularProgress size="3rem" />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
            {isBannerRemover && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-222 bg-[#00000065] overflow-y-auto flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                  }}
                  className=""
                >
                  <div className=" bg-white w-[300px] text-center rounded-md py-5">
                    {!loadingContent ? (
                      <div>
                        <div className=" mb-4">
                          Are you sure you want remove the banner?
                        </div>
                        <div className=" flex flex-row  items-center justify-around w-[230px] m-auto">
                          <Button
                            sx={{ backgroundColor: "red", color: "white" }}
                            onClick={bannerRemove}
                          >
                            Yes
                          </Button>
                          <Button
                            onClick={() => setIsRemoveBanner(false)}
                            sx={{ backgroundColor: "black", color: "white" }}
                          >
                            No
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <CircularProgress size="3rem" />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : !loadingContent ? (
        <div className="w-full flex items-center justify-center h-[500px] pt-[150px]">
          <div className="bg-slate-200 w-[1200px] h-[400px] rounded-[20px] relative overflow-hidden">
            <img
              src={banner}
              // alt="Preview"
              className="w-full h-full object-cover rounded-[20px]"
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center h-[500px]  z-0 pt-[150px]">
          <div className="bg-slate-200 w-[1200px] h-[400px] rounded-[20px] relative animate-pulse">
            <div className="flex-col flex gap-3 absolute bottom-20 right-20"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default BannerContainer;
