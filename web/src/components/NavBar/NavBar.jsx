import Logo from "../../assets/logo/logo-sample-4.png";
import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { logOut } from "../../services/userservices";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { pink } from "@mui/material/colors";

import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const NavBar = ({ setCreateEvent }) => {
  const [showNavDrop, setShowNavDrop] = useState(false);
  const { setUser, user } = useContext(AuthContext);
  const [showUserNav, setUserNav] = useState(false);
  const navigation = useNavigate();
  const handleLogOut = async () => {
    const response = await logOut();
    setUser(null);
    navigation("/home", { replace: true });
  };
  return (
    <div
      className="flex flex-row items-center gap-8 py-3 px-3 bg-white shadow-md z-10 fixed w-full z-[100]"
      onMouseLeave={() => {
        setShowNavDrop(false);
        setUserNav(false);
      }}
    >
      <div className="flex items-center justify-start">
        <img src={Logo} className="w-[50px] h-[50px]" />
        <div>
          <span className="text-[#ff942b] font-bold">Community</span>{" "}
          <span className="font-bold text-slate-600">Connect</span>
        </div>
      </div>

      <div className="relative flex-1 max-w-[500px] ">
        <input
          type="text"
          className="w-full bg-slate-100 py-4 pl-4 pr-12 rounded-md placeholder:text-[16px]"
          placeholder="Search event"
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <SearchIcon className="text-gray-500" />
        </div>
      </div>

      <div
        className="flex gap-3 items-center justify-center hover:bg-slate-50 px-2 py-3 rounded-md cursor-pointer"
        onMouseEnter={() => setShowNavDrop(false)}
        onClick={() => setCreateEvent(true)}
      >
        <div className="text-slate-700 font-semibold text-[16px]">
          Create an Event
        </div>
        <AddIcon />
      </div>

      <div
        className="flex flex-row items-center justify-center gap-3 hover:bg-slate-50 px-2 py-3 rounded-md cursor-pointer"
        onMouseEnter={() => setShowNavDrop(false)}
      >
        <div className="text-slate-700 font-semibold text-[16px]">
          Favourites
        </div>
        <FavoriteBorderIcon sx={{ color: pink[500] }} />
      </div>
      <div className=" relative">
        <div
          className=" w-[50px] h-[50px] bg-slate-50 flex flex-row items-center justify-center rounded-full border border-slate-50 hover:border-slate-400 hover:bg-slate-100 cursor-pointer transition-all duration-300"
          onMouseEnter={() => {
            setShowNavDrop(true);
            setUserNav(false);
          }}
        >
          <MoreHorizIcon />
        </div>
        {showNavDrop && (
          <div
            className=" absolute w-[220px] flex-col flex bg-white items-start p-5 gap-3 rounded-md border-[1px] border-slate-200 shadow-md top-[60px]"
            onMouseLeave={() => setShowNavDrop(false)}
            onMouseEnter={() => setShowNavDrop(true)}
          >
            <div className="flex      hover:bg-slate-50 px-2 py-3 rounded-md cursor-pointer w-[180px]">
              <div className="text-slate-700 font-semibold text-[16px]">
                Help Center
              </div>
            </div>

            <div className="flex   hover:bg-slate-50 px-2 py-3 rounded-md cursor-pointer w-[180px]">
              <div className="text-slate-700 font-semibold text-[16px]">
                Report Content
              </div>
            </div>
          </div>
        )}
      </div>
      <div onMouseEnter={() => setShowNavDrop(false)}>
        {user ? (
          <div
            className=" flex flex-row items-center justify-center gap-3 hover:bg-slate-50 px-2 py-3 rounded-md cursor-pointer relative"
            onMouseEnter={() => setUserNav(true)}
          >
            <AccountCircleOutlinedIcon />
            <div className="text-slate-700 font-semibold text-[16px]">
              {user.email}
            </div>
            {showUserNav && (
              <div
                className=" absolute w-[220px] flex-col flex bg-white items-start p-5 gap-3 rounded-md border-[1px] border-slate-200 shadow-md top-[60px]"
                onMouseLeave={() => setUserNav(false)}
              >
                <div className="flex      hover:bg-slate-50 px-2 py-3 rounded-md cursor-pointer w-[180px]">
                  <div className="text-slate-700 font-semibold text-[16px]">
                    Browse event
                  </div>
                </div>

                <div className="flex   hover:bg-slate-50 px-2 py-3 rounded-md cursor-pointer w-[180px]">
                  <div className="text-slate-700 font-semibold text-[16px]">
                    Manage my event
                  </div>
                </div>
                <div className="flex   hover:bg-slate-50 px-2 py-3 rounded-md cursor-pointer w-[180px]">
                  <div className="text-slate-700 font-semibold text-[16px]">
                    Liked
                  </div>
                </div>
                <div className="flex   hover:bg-slate-50 px-2 py-3 rounded-md cursor-pointer w-[180px]">
                  <div className="text-slate-700 font-semibold text-[16px]">
                    My account
                  </div>
                </div>
                <div
                  className="flex   hover:bg-slate-50 px-2 py-3 rounded-md cursor-pointer w-[180px]"
                  onClick={handleLogOut}
                >
                  <div className="text-slate-700 font-semibold text-[16px]">
                    Log out
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to={"/signin"}>
            <Button
              variant="contained"
              href="#contained-buttons"
              sx={{ backgroundColor: "black" }}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
