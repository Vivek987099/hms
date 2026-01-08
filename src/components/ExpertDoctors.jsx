import React, { useEffect, useState } from "react";
import DonctorInfoCard from "./DonctorInfoCard";
import { getDoctors } from "../api/Doctors";

function ExpertDoctors() {
  let [doctors, setDoctors] = useState([]);

  const getAllDoctors = async () => {
    let res = await getDoctors();
    if (res.status === 200) {
      setDoctors(res.data.content);
    }
  };
  useEffect(() => {
    getAllDoctors();
    
   
    
    
    
  }, []);

  return (
    <>
      <div className="bg-[#e8eff0]">
        <div className="container mx-auto ">
          <div className="text-center after:content-[''] after:block after:w-30 after:h-1 after:bg-[#06adaa] after:mx-auto after:mt-3">
            <h1 className="font-bold text-4xl  text-gray-800 font-poppins]">
              Our Expert Doctors
            </h1>
            <p className="mt-3 text-gray-500 text-[1.1rem] px-5 lg:w-[60%] mx-auto leading-5 md:leading-5 lg:leading-6">
              Meet our team of highly skilled and compassionate medical
              professionals, dedicated to delivering exceptional healthcare with
              expertise and care.
            </p>
          </div>
          <div className="w-full flex items-center">
            <div className=" mt-10 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-5 lg:gap-8 px-5 lg:px-0 pb-10">
              {doctors.map((doctor) => (
                <DonctorInfoCard
                  key={doctor.doctorId}
                  specialization={doctor.specialization}
                  doctorName={doctor.doctorName}
                  profilePhotoUrl={doctor.profilePhotoUrl}
                ></DonctorInfoCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpertDoctors;
