import EventCard from "./EventCard";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getDataMonth } from "../../services/eventservice";
import { Link } from "react-router-dom";

const ThisMonth = () => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    const getMonthData = async () => {
      setLoading(true);
      const response = await getDataMonth();
      setData(response.data);
      setLoading(false);
    };

    getMonthData();
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const start = page * itemsPerPage;
  const currentItems = [];
  if (data.length > 0) {
    const numItems = Math.min(itemsPerPage, data.length);
    for (let i = 0; i < numItems; i++) {
      currentItems.push(data[(start + i) % data.length]);
    }
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const next = () => {
    if (totalPages > 1) {
      setDirection(1);
      setPage((prevPage) => (prevPage + 1) % totalPages);
    }
  };

  const prev = () => {
    if (totalPages > 1) {
      setDirection(-1);
      setPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    }
  };

  return (
    <div>
      <div className="mt-20 w-[100%]">
        <div className="w-[1200px] m-auto">
          <div className="flex gap-2 text-2xl font-semibold">
            <div className="text-[#ff942b]">What's happening</div>
            <div>this month</div>
          </div>
        </div>
      </div>

      <div>
        <div className="w-[1250px] my-10 m-auto justify-around relative flex items-center">
          <button
            className={`absolute -left-12 z-10 p-2.5 bg-slate-50 rounded-full border border-slate-100 shadow-md transition-all duration-300 ${
              data.length <= itemsPerPage
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-slate-300 cursor-pointer text-slate-500"
            }`}
            onClick={prev}
            disabled={data.length <= itemsPerPage}
          >
            <NavigateBeforeOutlinedIcon />
          </button>

          {currentItems.length > 0 ? (
            <div className="overflow-hidden w-[1200px] relative min-h-[400px]">
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="flex flex-row gap-5 justify-start w-full absolute top-0 left-0"
                >
                  {currentItems.map((item) => (
                    <Link to={`/event/${item._id}`}>
                      <EventCard
                        key={item.id}
                        item={item}
                      />
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div className=" bg-slate-50 h-[300px] w-[1200px] flex items-center justify-center rounded-lg shadow-md animate-pulse">
              <div className="text-2xl font-semibold text-center text-slate-500">
                <span className=" text-[40px]">😢</span>Oops no events found
              </div>
            </div>
          )}
          <button
            className={`absolute -right-12 z-10 p-2.5 bg-slate-50 rounded-full border border-slate-100 shadow-md transition-all duration-300 ${
              data.length <= itemsPerPage
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-slate-300 cursor-pointer text-slate-500"
            }`}
            onClick={next}
            disabled={data.length <= itemsPerPage}
          >
            <NavigateNextOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThisMonth;
