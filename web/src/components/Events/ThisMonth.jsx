import EventCard from "./EventCard";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const ThisMonth = () => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 4;

  const items = Array.from({ length: 20 }).map((_, i) => ({ id: i }));

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
  const currentItems = items.slice(start, start + itemsPerPage);

  const next = () => {
    if ((page + 1) * itemsPerPage < items.length) {
      setDirection(1);
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page > 0) {
      setDirection(-1);
      setPage(page - 1);
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
        <div className="w-[1200px] my-10 m-auto justify-around relative flex items-center">
          <button
            className={`absolute -left-12 z-10 p-2.5 bg-slate-50 rounded-full border border-slate-100 shadow-md transition-all duration-300 ${
              page === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-slate-300 cursor-pointer text-slate-500"
            }`}
            onClick={prev}
            disabled={page === 0}
          >
            <NavigateBeforeOutlinedIcon />
          </button>

          <div className="overflow-hidden w-[1200px]">
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
                className="flex flex-row gap-5 justify-around w-full"
              >
                {currentItems.map((item) => (
                  <EventCard key={item.id} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            className={`absolute -right-12 z-10 p-2.5 bg-slate-50 rounded-full border border-slate-100 shadow-md transition-all duration-300 ${
              (page + 1) * itemsPerPage >= items.length
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-slate-300 cursor-pointer text-slate-500"
            }`}
            onClick={next}
            disabled={(page + 1) * itemsPerPage >= items.length}
          >
            <NavigateNextOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThisMonth;
