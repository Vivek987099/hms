import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { getAppointmentByDoctor } from "../../api/AppointApi";
import DashboardHeader from "../DashboardHeader";
import { useLocation } from "react-router";

function DoctorAppointment() {
  let [currentPage, setCurrentPage] = useState(0);
  let [changeStatus, setChangeStatus] = useState("");
  let [allAppointments, setAllAppointments] = useState([]);
  let [isLast, setIsLast] = useState(false);

  let location = useLocation();

  let handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "status") {
      setChangeStatus(value);
      setCurrentPage(0);
    }
  };
  let handleNextPage = () => {
    if (isLast) setCurrentPage(0);
    else setCurrentPage((prev) => prev + 1);
  };
  let handlePreviousPage = () => {
    if (currentPage === 0) setCurrentPage(totalPages - 1);
    else setCurrentPage((prev) => prev - 1);
  };

  let fetchAllAppointments = async () => {
    try {
      let pageSize = 10;
      let res = await getAppointmentByDoctor(sessionStorage.getItem("token"));
      if (res.status === 200) {
        setAllAppointments(res.data);
        // setIsLast(res.data.last);
        // setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllAppointments();
  }, []);
  return (
    <>
      <div className="p-4">
        <DashboardHeader
          title="Appointments"
          path={location.pathname}
        ></DashboardHeader>
        <div className="w-full   p-4 bg-white rounded-xl px-15 shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(0,0,0,0.1)] mt-5">
          <div className="flex justify-between">
            <h1 className="text-[#2c3e50] font-semibold text-[1.1rem]">
              Your Appointments
            </h1>
            <div className="flex items-center gap-x-10">
              <div>
                
                <select
                  className="appearance-none px-10 py-0.5 rounded outline-2 outline-gray-400 text-gray-800"
                  onChange={handleChange}
                  name="status"
                >
                  <option className="text-gray-500" value="">
                    Select City
                  </option>
                  <option className="text-gray-500" value="BOOKED">
                    BOOKED
                  </option>
                  <option className="text-gray-500" value="COMPLETED">
                    COMPLETED
                  </option>
                  <option className="text-gray-500" value="CANCELED">
                    CANCLED
                  </option>
                </select>
              </div>
              <div className="flex items-center gap-2 text-[#7f8c8d] mt-1">
                <button
                  onClick={handlePreviousPage}
                  className="cursor-pointer p-1.5 bg-blue-50 hover:bg-blue-100 rounded-full"
                >
                  <FaAngleLeft />
                </button>
                <span className="text-sm md:text-base lg:text-lg">
                  {currentPage + 1}
                </span>
                <button
                  onClick={handleNextPage}
                  className="cursor-pointer p-1.5 bg-blue-50 hover:bg-blue-100 rounded-full"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-5 overflow-x-auto outline-2 outline-gray-200 rounded-lg">
            {allAppointments.length > 0 ? (
              <>
                <table className="w-full ">
                  <thead className="bg-[#f8f9fa] text-[#2c3e50]">
                    <tr className="border-b border-gray-300">
                      <th className=" px-10 py-3 text-left font-semibold">
                        Patient Name
                      </th>
                      <th className=" px-10 py-3 text-left font-semibold">
                        Appointment With Dr.
                      </th>

                      <th className=" px-10 py-3 text-left font-semibold">
                        Appointment Date
                      </th>
                      <th className=" px-10 py-3 text-left font-semibold">
                        Appointment Time
                      </th>
                      <th className=" px-10 py-3 text-left font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAppointments.map((appointment, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-300 last:border-0"
                      >
                        <td className="px-10 py-3 text-left whitespace-nowrap">
                          {appointment.patientResponseDTO.patientName}
                        </td>
                        <td className="px-10 py-3 text-left whitespace-nowrap">
                          {appointment.doctorResponseDTO.doctorName}
                        </td>

                        <td className="px-10 py-3 text-left whitespace-nowrap">
                          {appointment.date}
                        </td>
                        <td className="px-10 py-3 text-left whitespace-nowrap">
                          {appointment.time}
                        </td>
                        <td className="px-10 py-3 text-left whitespace-nowrap">
                          {appointment.status === "BOOKED" && (
                            <>
                              <span className="bg-amber-400 w-30 text-center text-sm block text-white px-4 py-2 font-semibold rounded-2xl">
                                BOOKED
                              </span>
                            </>
                          )}
                          {appointment.status === "CANCELED" && (
                            <>
                              <span className="bg-red-600 t w-30 text-center text-sm block text-white px-4 py-2 font-semibold rounded-2xl">
                                CANCELED
                              </span>
                            </>
                          )}
                          {appointment.status === "COMPLETED" && (
                            <>
                              <span className="bg-green-400 w-30 text-center text-sm block text-white px-4 py-2 font-semibold rounded-2xl">
                                COMPLETED
                              </span>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center p-5">
                  <h1 className="text-sm  lg:text-lg font-semibold text-gray-600">
                    Appointments Are unavailable{" "}
                  </h1>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorAppointment;
