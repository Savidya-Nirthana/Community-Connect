import BusinessImage from "../../assets/categories/Business.png";
import CommunityImage from "../../assets/categories/Communities.png";
import CouncilImage from "../../assets/categories/Councils.png";
import EntertainmentImage from "../../assets/categories/Entertainment.png";
import ReligionImage from "../../assets/categories/religions.jpg";
import EductionImage from "../../assets/categories/Education.jpg";
import GamingImage from "../../assets/categories/gaming.jpg";
import FoodImage from "../../assets/categories/food & drink.jpg";

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
          <div className="relative cursor-pointer">
            <img
              src={CouncilImage}
              alt="Community Category"
              className="w-[300px] h-[300px] rounded-lg shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
            />
            <div className="absolute top-15 left-0 w-full h-full flex items-center justify-center text-white font-semibold text-[30px]">
              Council
            </div>
          </div>
          <div className="relative cursor-pointer">
            <img
              src={EntertainmentImage}
              alt="Community Category"
              className="w-[300px] h-[300px] rounded-lg shadow-md scale-100 hover:scale-105 transition-all duration-300 cursor-pointer"
            />
            <div className="absolute top-15 left-0 w-full h-full flex items-center justify-center text-white font-semibold text-[30px]">
              Entertainment
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-10 mt-5">
        <div className="flex flex-col gap-10">
          <div className="relative cursor-pointer">
            <img
              src={EductionImage}
              alt="Community Category"
              className="w-[300px] h-[300px] rounded-lg shadow-md scale-100 hover:scale-105 transition-all duration-300 cursor-pointer"
            />
            <div className="absolute top-15 left-0 w-full h-full flex items-center justify-center text-white font-semibold text-[30px]">
              Education
            </div>
          </div>
          <div className="relative cursor-pointer">
            <img
              src={ReligionImage}
              alt="Community Category"
              className="w-[300px] h-[300px] rounded-lg shadow-md scale-100 hover:scale-105 transition-all duration-300 cursor-pointer"
            />
            <div className="absolute top-15 left-0 w-full h-full flex items-center justify-center text-white font-semibold text-[30px]">
              Religion
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-10 mt-5">
        <div className="flex flex-col gap-10">
          <div className="relative cursor-pointer">
            <img
              src={GamingImage}
              alt="Community Category"
              className="w-[300px] h-[200px] rounded-lg shadow-md scale-100 hover:scale-105 transition-all duration-300 cursor-pointer "
            />
            <div className="absolute top-15 left-0 w-full h-full flex items-center justify-center text-white font-semibold text-[30px]">
              Gaming
            </div>
          </div>
          <div className="relative cursor-pointer">
            <img
              src={FoodImage}
              alt="Community Category"
              className="w-[300px] h-[300px] rounded-lg shadow-md scale-100 hover:scale-105 transition-all duration-300 cursor-pointer"
            />
            <div className="absolute top-15 left-0 w-full h-full flex items-center justify-center text-white font-semibold text-[30px]">
              Food & Drink
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
