import React, { useState } from "react";
import Navbar from "@/components/Fragments/Navbar";
import HeaderSection from "@/components/Fragments/HeaderSection";
import FacilitiesSection from "@/components/Fragments/FacilitiesSection";
import PromoSection from "@/components/Fragments/PromoSection";
import DestinationSection from "@/components/Fragments/DestinationSection";
import BannerSection from "@/components/Fragments/BannerSection";
import FooterSection from "@/components/Fragments/FooterSection";
import ModalDetailPromo from "@/components/Elements/ModalDetailPromo";
import promoData from "../public/promos.json"; // Adjust the path as needed

const Index = () => {
  const [showDetailPromo, setShowDetailPromo] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);

  // Function to handle promo details
  const handleShowDetailPromo = (promoId) => {
    const promo = promoData.data.find((promo) => promo.id === promoId);
    setSelectedPromo(promo);
    setShowDetailPromo(true);
  };

  return (
    <div className="relative cursor-default lg:cursor-none flex flex-col font-poppins text-[13px] text-primaryblack dark:text-slate-200">
      <Navbar />
      <div className="relative flex flex-col h-screen gap-12 px-4 overflow-y-scroll bg-white sm:gap-16 xl:gap-20 sm:px-10 dark:bg-primaryblack no-scrollbar lg:px-36">
        <HeaderSection />
        <FacilitiesSection />
        <PromoSection handleShowDetailPromo={handleShowDetailPromo} />
        <DestinationSection />
        <BannerSection />
        <FooterSection />
      </div>
      <ModalDetailPromo
        showDetailPromo={showDetailPromo}
        setShowDetailPromo={setShowDetailPromo}
        selectedPromo={selectedPromo}
        setSelectedPromo={setSelectedPromo}
      />
    </div>
  );
};

export default Index;
