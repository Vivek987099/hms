import React, { useEffect, useState } from "react";
import DonctorInfoCard from "./DonctorInfoCard";
import { getDoctors } from "../api/Doctors";

function ExpertDoctors() {
  let [doctors, setDoctors] = useState([]);

  const getAllDoctors = async () => {
    let res = await getDoctors();
    if (res.status === 200) {
      setDoctors(res.data);
    }
  };
  useEffect(() => {
    getAllDoctors();
  }, []);
  useEffect(() => {
    console.log(doctors);
  }, [doctors]);

  return (
    <>
      <div className="bg-[#e8eff0] py-4 container-fluid">
        <div className="container ">
          <div className="text-center after:content-[''] after:block after:w-30 after:h-1 after:bg-[#06adaa] after:mx-auto after:mt-3">
            <h1 className="font-bold text-4xl mt-10 text-gray-800 font-poppins]">
              Our Expert Doctors
            </h1>
            <p className="mt-3 text-gray-500 text-[1.1rem] px-5 lg:w-[60%] mx-auto leading-5 md:leading-5 lg:leading-6">
              Meet our team of highly skilled and compassionate medical
              professionals, dedicated to delivering exceptional healthcare with
              expertise and care.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-5">
            {doctors.map((doctor) => (
              <DonctorInfoCard
                key={doctor.doctorId}
                specialization={doctor.specialization}
                doctorName={doctor.doctorName}
              ></DonctorInfoCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpertDoctors;
