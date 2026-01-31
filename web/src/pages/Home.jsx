import { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import BannerContainer from "../components/banner/BannerContainer";
import CreateEvent from "../components/Event/CreateEvent";
import { AnimatePresence, motion } from "motion/react";
import ProtectedComponents from "../routes/ProtectedComponents";
import ThisMonth from "../components/Events/ThisMonth";
const Home = () => {
  const [createEvent, setCreateEvent] = useState(false);

  return (
    <div>
      <NavBar setCreateEvent={setCreateEvent} />
      <BannerContainer />
      <ThisMonth />
      <AnimatePresence>
        {createEvent && (
          <ProtectedComponents>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-full bg-white shadow-xl z-50"
            >
              <CreateEvent setCreateEvent={setCreateEvent} />
            </motion.div>
          </ProtectedComponents>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
