import Navbar from "@/components/Fragments/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import itineraryData from "@/public/itineraries.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "@/components/Elements/Modal"; 
import { sendToWhatsapp } from "@/utils/whatsapp"; 

const Itinerary = () => {
  const [itinerary, setItinerary] = useState(null);
  const router = useRouter();
  const { title } = router.query;

  useEffect(() => {
    if (title) {
      const selectedItinerary = itineraryData.find(
        (itinerary) => itinerary.title.toLowerCase() === title.toLowerCase()
      );
      setItinerary(selectedItinerary);
    }
  }, [title]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const [showModal, setShowModal] = useState(false);

  const handleBookNowClick = () => {
    setShowModal(true);
  };

  const handleModalSubmit = (formData) => {
    const message = `New booking for ${itinerary.title}:\n\n${JSON.stringify(formData, null, 2)}`;
    sendToWhatsapp(message); 
    setShowModal(false);
  };

  if (!itinerary) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Navbar />
        <h1 className="text-2xl font-semibold">Loading itinerary...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-20 pb-8">
        <h1 className="text-4xl font-bold mb-4">{itinerary.title}</h1>

        <div className="mb-6">
          <Slider {...settings}>
            {itinerary.imageUrls.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`${itinerary.title} image ${index + 1}`}
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </Slider>
        </div>

        <p className="text-lg mb-6">{itinerary.description}</p>

        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-4">Quick Facts:</h3> 
          <ul className="list-disc list-inside ml-6 mb-4"> 
            <li className="text-base font-medium">Max Altitude: {itinerary.maxAltitude}</li>
            <li className="text-base font-medium">Difficulty: {itinerary.difficulty}</li>
            <li className="text-base font-medium">Total Distance: {itinerary.totalDistance}</li>
            <li className="text-base font-medium">Best Time to Visit: {itinerary.bestTimeToVisit}</li>
            <li className="text-base font-medium">Geographical Coordinates: {itinerary.geographicalCoordinates}</li>
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">
            Itinerary for each day:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itinerary.days.map((day, index) => (
              <div
                key={index}
                className={`rounded-lg shadow-md p-6 
                  ${
                    index % 2 === 0
                      ? "bg-gray-100" 
                      : "bg-blue-50" 
                  }
                `}
              >
                <h3 className="text-xl font-medium mb-2">
                  Day {day.dayNumber}
                </h3>
                <p className="mb-2">{day.description}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {day.detailedDescription}
                </p>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Distance:</span>
                  <span>{day.distance}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Duration:</span>
                  <span>{day.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Altitude:</span>
                  <span>{day.altitude}</span>
                </div>
                <h4 className="text-lg font-medium mt-4">Highlights:</h4>
                <ul className="list-disc list-inside">
                  {day.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Inclusions:</h3> 
          <ul className="list-disc list-inside ml-6 mb-4"> 
            {itinerary.inclusions.map((inclusion, idx) => (
              <li key={idx} className="text-base font-medium">{inclusion}</li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold mb-4">Exclusions:</h3> 
          <ul className="list-disc list-inside ml-6"> 
            {itinerary.exclusions.map((exclusion, idx) => (
              <li key={idx} className="text-base font-medium">{exclusion}</li>
            ))}
          </ul>
        </div>

        {/* "Book Now" button */}
        <div className="mt-8 flex justify-center"> 
          <button
            onClick={handleBookNowClick}
            className="bg-primaryblue hover:bg-bluehover text-white font-bold py-2 px-4 rounded"
          >
            Book Now
          </button>
        </div>

        {/* Render the modal conditionally */}
        {showModal && (
          <Modal 
            title={`Book ${itinerary.title}`} 
            onClose={() => setShowModal(false)}
            onSubmit={handleModalSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Itinerary;