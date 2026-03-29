import Event from "../components/Events/Event";
import NavBar from "../components/NavBar/NavBar";

const EventPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />
      <div className="pt-[80px]">
        <Event />
      </div>
    </div>
  );
};

export default EventPage;
