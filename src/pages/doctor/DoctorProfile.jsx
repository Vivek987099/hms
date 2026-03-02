import React, { useEffect, useState } from "react";

import photo from "/src/assets/logo/profile-Avatar.jpg";
import { getDoctorProfile } from "../../api/Doctors";

function DoctorProfile() {
  let [profileDetails, setProfileDetails] = useState({
    name: "",
    fee: "",
    profile: "",
    specialization: "",
    joiningDate: "",
  });

  let fetchDoctorProfile = async () => {
    try {
      let res = await getDoctorProfile(sessionStorage.getItem("token"));
      if (res.status === 200) {
        setProfileDetails({
          name: res.data.doctorName,
          fee: res.data.fee,
          profile: res.data.profilePhotoUrl,
          specialization: res.data.specialization,
          joiningDate: res.data.created_at,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  return (
    <div className="w-full mx-auto bg-white/70 backdrop-blur-lg shadow-xl  p-6 flex flex-col md:flex-row gap-6">
      {/* Doctor Image */}
      <div className="flex-shrink-0 flex justify-center">
        <img
          src={`https://hms-backend-production-c52b.up.railway.app/file/${profileDetails.profile}`}
          alt="Doctor"
          className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-500"
        />
      </div>

      {/* Doctor Info */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Dr. {profileDetails.name}
            </h2>
            <p className="text-blue-600 font-medium">
              {profileDetails.specialization}
            </p>
            {/* <p className="text-gray-500 text-sm">
              Department: {}
            </p> */}
          </div>
        </div>

        {/* Appointment Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex gap-x-4">
            <p className="text-gray-500">Deparment</p>
            <p className="font-semibold text-blue-600">Neurology</p>
          </div>

          <div>
            <p className="text-gray-500">Consultation Fee</p>
            <p className="font-semibold text-blue-600">{profileDetails.fee}</p>
          </div>
           <div>
            <p className="text-gray-500">Joining Date</p>
            <p className="font-semibold text-blue-600">{profileDetails.joiningDate}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            className="w-full md:w-auto px-6 py-2 rounded-xl text-white font-semibold 
          bg-gradient-to-r from-blue-500 to-indigo-600 
          hover:scale-105 transition-transform shadow-lg"
          >
            Request for Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
