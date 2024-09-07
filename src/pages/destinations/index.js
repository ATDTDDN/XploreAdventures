import Navbar from "@/components/Fragments/Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ModalDetailDestination from "@/components/Elements/ModalDetailDestination";
import { useDispatch } from "react-redux";
import { setShowModal } from "@/redux/slice/showModalSlice";
import destinationsData from "@/public/destinations.json";

const Index = () => {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");
  const [showDetailDestination, setShowDetailDestination] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const dispatch = useDispatch();

  // Load destinations from JSON file
  useEffect(() => {
    const filteredDestinations = destinationsData.data.filter((destination) =>
      destination.title.toLowerCase().includes(search.toLowerCase())
    );
    setDestinations(filteredDestinations);
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const formatNumber = (number) => {
    return `Rs ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const handleShowDetailDestination = async (destinationId) => {
    const selected = destinationsData.data.find(
      (dest) => dest.id === destinationId
    );
    setSelectedDestination(selected);
    setShowDetailDestination(true);
    dispatch(setShowModal(true));
  };

  return (
    <div className="cursor-default lg:cursor-none flex flex-col relative w-full h-screen font-poppins text-primaryblack dark:text-slate-200 bg-white dark:bg-primaryblack text-[10px] lg:text-[11px] xl:text-[13px]">
      <Navbar />
      <div className="absolute z-0 w-1/3 rounded-full bg-primaryyellow dark:bg-primaryblue bg-opacity-10 dark:bg-opacity-20 h-1/2 blur-3xl right-10 top-20"></div>
      <div className="absolute bottom-0 z-0 w-1/3 rounded-full bg-primaryyellow dark:bg-primaryblue bg-opacity-10 dark:bg-opacity-20 h-1/2 blur-3xl left-10"></div>
      <div className="relative flex flex-col w-full h-screen px-4 pt-20 overflow-y-scroll xl:pt-24 sm:px-10 no-scrollbar lg:px-36">
        <div className="flex flex-col w-full h-full gap-20 xs:gap-16 sm:gap-4 xl:gap-7">
          <div className="flex flex-col items-center justify-between sm:flex-row h-14">
            <div className="flex flex-col text-xl text-center sm:text-left sm:text-base lg:text-xl xl:text-2xl">
              <h1 className="font-bold tracking-tight font-volkhov">
                Explore Destinations
              </h1>
              <h1 className="overflow-hidden font-bold tracking-tight font-volkhov text-primaryred dark:text-primaryyellow whitespace-nowrap sm:animate-typing">
                Find Yours!
              </h1>
            </div>
            <div className="flex flex-wrap-reverse items-center justify-center gap-2 my-2 sm:flex-row sm:justify-end md:gap-3 xl:gap-4">
              <h1 className={`text-slate-400 ${search === "" ? "hidden" : ""}`}>
                <b>{destinations.length}</b>{" "}
                {destinations.length > 1 ? "destinations" : "destination"} found
              </h1>
              <div className="flex items-center gap-2 md:gap-3 xl:gap-4">
                <div className="flex w-40 py-3 bg-white rounded-lg lg:w-44 xl:w-48 dark:bg-primaryblack shadow-label dark:shadow-primarygray text-primaryblack dark:text-slate-200">
                  <div className="px-4">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <input
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search Destination"
                    className="pr-4 bg-transparent outline-none w-28 lg:w-32 xl:w-36 placeholder:text-slate-300 dark:placeholder:text-slate-500 dark:text-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 overflow-y-scroll rounded-t-xl no-scrollbar">
            <div className="flex flex-wrap h-fit w-full gap-[2%]">
              {destinations.map((destination, index) => (
                <button
                  key={index}
                  onClick={() => handleShowDetailDestination(destination.id)}
                  className="cursor-scale cursor-default lg:cursor-none w-full xs:w-[49%] md:w-[32%] mb-[1.5%] relative overflow-hidden bg-white dark:bg-primaryblack border border-white dark:border-primaryblack hover:border-primaryred dark:hover:border-primaryred text-primaryblack rounded-xl h-56 xl:h-68" // Increased height
                >
                  {destination.imageUrls[0] &&
                  destination.imageUrls[0].startsWith("https://") &&
                  (destination.imageUrls[0].includes(".jpg") ||
                    destination.imageUrls[0].includes(".png") ||
                    destination.imageUrls[0].includes("images")) ? (
                    <img
                      src={destination.imageUrls[0]}
                      className="object-cover relative w-full bg-slate-200 h-[78%] xl:h-[75%]" // Adjusted image height
                    ></img>
                  ) : (
                    <Image
                      src="/images/KedarKantha.jpg"
                      className="object-cover relative w-full h-[80%]"
                      width={500}
                      height={500}
                      alt="Unknown Profile"
                    />
                  )}
                  <div className="flex relative justify-between font-medium items-center w-full h-[22%] xl:h-[25%] px-4">
                    {" "}
                    {/* Adjusted height */}
                    <div className="flex flex-col w-4/6 gap-[3px] xl:gap-1 text-start">
                      <h1 className="capitalize dark:text-slate-200">
                        {destination.title}
                      </h1>
                      <div className="text-[8px] lg:text-[9px] xl:text-[11px] flex items-start gap-1 lg:gap-[6px] xl:gap-2">
                        <i className="fa-solid fa-location-dot mt-[1px] lg:mt-[2px] xl:mt-[3px] text-primaryred"></i>
                        <h1 className="capitalize text-primarygray dark:text-slate-400">{`${destination.city}, ${destination.province}`}</h1>
                      </div>
                    </div>
                    <div className="flex flex-col items-end w-2/6 gap-[3px] xl:gap-1">
                      <div className="relative flex w-fit">
                        <div className="absolute z-10 w-full h-[2px] bg-primaryred rounded-full -rotate-6 top-[40%]"></div>
                        <h1 className="relative text-primarygray dark:text-slate-400 text-[8px] lg:text-[9px] xl:text-[11px]">
                          {formatNumber(destination.price)}
                        </h1>
                      </div>
                      <h1 className="text-primaryblue">{`${formatNumber(
                        destination.price_discount
                      )}`}</h1>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ModalDetailDestination
        showDetailDestination={showDetailDestination}
        setShowDetailDestination={setShowDetailDestination}
        selectedDestination={selectedDestination}
        setSelectedDestination={setSelectedDestination}
      />
    </div>
  );
};

export default Index;
