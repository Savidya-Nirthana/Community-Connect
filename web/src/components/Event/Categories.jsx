import BusinessImage from "../../assets/categories/Business.png";
import CommunityImage from "../../assets/categories/Communities.png";
import CouncilImage from "../../assets/categories/Councils.png";
import EntertainmentImage from "../../assets/categories/Entertainment.png";

const Categories = () => {
  return (
    <div className="flex flex-col md:flex-row items-center my-10 px-10 gap-10">
      <div className="ml-5 flex flex-col gap-10 mt-[-120px]">
        <div className="relative">
          <img
            src={BusinessImage}
            alt="Business Category"
            className="w-[300px] h-auto rounded-lg shadow-md"
          />
          <div className="absolute top-15 left-0 w-full h-full flex items-center justify-center text-white font-semibold text-[30px]">
            Buisness
          </div>
        </div>
        <div className="relative">
          <img
            src={CommunityImage}
            alt="Community Category"
            className="w-[300px] h-auto rounded-lg shadow-md"
          />
          <div className="absolute top-15 left-0 w-full h-full flex items-center justify-center text-white font-semibold text-[30px]">
            Community
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-10 mt-5">
        <div className="text-4xl font-semibold ">
          <span>Trusted By</span>
          <br /> <span>industries like</span>
          <br /> <span>Yours.</span>
        </div>
        <div className="flex flex-col gap-10">
          <div className="relative">
            <img
              src={CouncilImage}
              alt="Community Category"
              className="w-[300px] h-[300px] rounded-lg shadow-md"
            />
            <div className="absolute top-15 left-0 w-full h-full flex items-center justify-center text-white font-semibold text-[30px]">
              Council
            </div>
          </div>
          <div className="relative">
            <img
              src={EntertainmentImage}
              alt="Community Category"
              className="w-[300px] h-[300px] rounded-lg shadow-md"
            />
            <div className="absolute top-15 left-0 w-full h-full flex items-center justify-center text-white font-semibold text-[30px]">
              Entertainment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
