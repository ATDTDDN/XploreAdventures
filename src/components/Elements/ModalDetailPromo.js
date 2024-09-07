import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setShowModal } from "@/redux/slice/showModalSlice";

const ModalDetailPromo = ({
  showDetailPromo,
  setShowDetailPromo,
  selectedPromo,
  setSelectedPromo,
}) => {
  const dispatch = useDispatch();

  const handleCloseEditPromo = () => {
    setShowDetailPromo(false);
    dispatch(setShowModal(false));
    setSelectedPromo(null);
  };

  const formatNumber = (number) => {
    return `Rs ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    selectedPromo && (
      <>
        <div
          className={`absolute z-30 w-full h-full opacity-40 bg-primaryblack dark:bg-primarygray dark:opacity-60 ${
            showDetailPromo === true ? "" : "hidden"
          }`}
        ></div>
        <div
          className={`${
            showDetailPromo === true ? "" : "hidden"
          } absolute z-30 flex items-center justify-center w-full h-full`}
        >
          <div
            className={`bg-white dark:bg-primaryblack shadow-lg rounded-lg text-[10px] lg:text-[11px] xl:text-[13px] flex justify-center relative text-primaryblack dark:text-slate-200 h-fit w-fit`}
          >
            <div className="absolute flex justify-end w-full p-2">
              <button
                onClick={handleCloseEditPromo}
                className="w-8 h-8 text-base rounded-lg cursor-default cursor-scale lg:cursor-none lg:text-lg xl:text-xl hover:text-primaryred dark:hover:text-primaryred"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full pt-4 sm:pt-5 p-5">
              <div className="flex flex-col items-start justify-center w-full h-fit">
                <div className="flex flex-col items-center w-full gap-4 sm:items-start sm:flex-row">
                  <h1 className="flex -mb-2 text-lg font-semibold capitalize lg:text-xl xl:text-2xl sm:hidden">
                    {selectedPromo.title}
                  </h1>
                  {selectedPromo.imageUrl && (
                    <div className="w-[230px] xs:w-[300px] sm:w-[260px] xl:w-[300px] overflow-hidden rounded-lg h-[160px] lg:h-[180px] xl:h-[200px]">
                      {(selectedPromo.imageUrl.includes(".jpg") ||
                        selectedPromo.imageUrl.includes(".png") ||
                        selectedPromo.imageUrl.includes("images")) ? (
                        <img
                          src={selectedPromo.imageUrl}
                          className="object-cover w-full h-full"
                        ></img>
                      ) : (
                        <Image
                          src="/images/no-image.png"
                          className="object-cover w-full h-full"
                          width={500}
                          height={500}
                          alt="Unknown Profile"
                        />
                      )}
                    </div>
                  )}
                  <div className="flex flex-col w-[230px] xs:w-[300px] lg:w-[380px] xl:w-[450px] gap-1 text-primaryblack dark:text-slate-200">
                    <h1 className="hidden text-lg font-semibold capitalize lg:text-xl xl:text-2xl sm:flex">
                      {selectedPromo.title}
                    </h1>
                    <div className="flex flex-col justify-between w-full gap-2 pt-2 pb-3 pl-3 pr-2 mb-2 rounded-lg xs:flex-row xs:pb-2 bg-slate-100 dark:bg-slate-700 xs:gap-0">
                      <div className="flex flex-col items-start justify-between">
                        <h1 className="text-lg font-semibold lg:text-xl xl:text-2xl text-primaryblue">
                          {formatNumber(selectedPromo.promo_discount_price)}
                        </h1>
                        <h1 className="text-[8px] lg:text-[9px] xl:text-[11px]">
                          **Inclusive of all taxes.
                        </h1>
                      </div>
                      <div className="flex flex-col items-start justify-between gap-1 xs:items-end xs:gap-0">
                        <a
                          href={`/itinerary?title=${selectedPromo.title}`} // Update the link to your itinerary page
                          className="text-primaryblue dark:text-primaryyellow underline"
                        >
                          View Itinerary
                        </a>
                        <button
                          onClick={() => (window.location.href = "/book-now")} // Update the link to your booking page
                          className="px-4 py-2 mt-2 bg-primaryblue text-white rounded-lg hover:bg-bluehover"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col w-full gap-2 overflow-y-scroll no-scrollbar max-h-[100px] xs:max-h-[85px] h-fit">
                      <div className="flex w-auto gap-8 ml-3">
                        <h1 className="w-[35%] text-primarygray dark:text-slate-400">
                          Description
                        </h1>
                        <h1 className="w-[65%]">{selectedPromo.description}</h1>
                      </div>
                      <div className="flex w-auto gap-8 ml-3">
                        <h1 className="w-[35%] text-primarygray dark:text-slate-400">
                          Duration
                        </h1>
                        <h1 className="w-[65%]">
                          {selectedPromo.terms_condition}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default ModalDetailPromo;
