import DashboardHeader from "../components/DashboardHeader";
import { useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import {
  getAllAppointments,
  makeAppointment,
  updateStatus,
} from "../api/AppointApi";
import { FaChevronRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import { getDoctorByDepartment } from "../api/Doctors";

function Appointments() {
  let location = useLocation();
  let [allAppointments, setAllAppointments] = useState([]);
  let [currentPage, setCurrentPage] = useState(0);
  let [isLast, setIsLast] = useState(false);
  let [totalPages, setTotalPages] = useState(0);
  let [changeStatus, setChangeStatus] = useState("");
  let [doctorByDepartment, setDoctorByDepartment] = useState([]);

  let [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    time: "",
    doctorId: "",
    patientId: "",
  });

  let [status, setStatus] = useState("");
  let [currentAptId, setCurrentAptId] = useState(null);

  let handleUpdateEdit = (appointment) => {
    setCurrentAptId(appointment.appointmentId);
    setStatus(appointment.status);

    updateAppointmentModel.setOn();
  };

  let submitStatus = async (e) => {
    try {
      e.preventDefault();
      let res = await updateStatus(currentAptId, status);
      if (res.status === 200) {
        setStatus("");
        fetchAllAppointments();
        updateAppointmentModel.setOff();
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let {
    makeAppointmentModel,
    allDepartment,
    fetchAllDepartment,
    allPatients,
    fetchAllPatients,
    updateAppointmentModel,
    user,
  } = useContext(AuthContext);

  let fetchAllAppointments = async () => {
    try {
      let pageSize = 10;
      let res = await getAllAppointments(changeStatus, pageSize, currentPage);
      if (res.status === 200) {
        setAllAppointments(res.data.content);
        setIsLast(res.data.last);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllAppointments();
  }, [currentPage, changeStatus]);
  useEffect(() => {
    fetchAllDepartment();
    fetchAllPatients();
  }, []);

  let handleNextPage = () => {
    if (isLast) setCurrentPage(0);
    else setCurrentPage((prev) => prev + 1);
  };
  let handlePreviousPage = () => {
    if (currentPage === 0) setCurrentPage(totalPages - 1);
    else setCurrentPage((prev) => prev - 1);
  };
  let handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "status") {
      setChangeStatus(value);
      setCurrentPage(0);
    }
  };

  let handleAppointDataChange = (e) => {
    let { name, value } = e.target;
    setAppointmentDetails({ ...appointmentDetails, [name]: value });
  };
  let handleDepartmentChange = async (e) => {
    let departmentId = e.target.value;
    setAppointmentDetails({ ...appointmentDetails, doctorId: "" });

    try {
      let res = await getDoctorByDepartment(departmentId);
      if (res.status === 200) {
        setDoctorByDepartment(res.data);
      }
    } catch (error) {
      console.log(error);
    }

    console.log("departmentId : ", departmentId);
  };

  let submitAppointmentData = async (e) => {
    e.preventDefault();
    try {
      let res = await makeAppointment(appointmentDetails);
      if (res.status === 200) {
        setAppointmentDetails({
          date: "",
          time: "",
          doctorId: "",
          patientId: "",
        });

        fetchAllAppointments();
        makeAppointmentModel.setOff();
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }

    console.log(appointmentDetails);
  };

  return (
    <>
      <div className="doctor-page-container p-4 relative">
        <DashboardHeader
          title="Appointments"
          path={location.pathname}
        ></DashboardHeader>
        <div className="w-full   p-4 bg-white rounded-xl px-15 shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(0,0,0,0.1)] mt-5">
          <div className="flex justify-between">
            <h1 className="text-[#2c3e50] font-semibold text-[1.1rem]">
              All Appointments
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
            {allAppointments ? (
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

                      {user.role === "ADMIN" && (
                        <th className=" px-10 py-3 text-left font-semibold">
                          Action
                        </th>
                      )}
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

                        {user.role === "ADMIN" && (
                          <td className=" px-10 py-3 text-center font-semibold  ">
                            <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row">
                              <button className="bg-red-500 text-white cursor-pointer px-4 py-1 mr-2  rounded-2xl text-[10px]">
                                Delete
                              </button>
                              <button
                                onClick={() => handleUpdateEdit(appointment)}
                                className="bg-green-500 text-white cursor-pointer px-4 py-1 rounded-2xl text-[10px]"
                              >
                                Edit
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <h1>Appointments Are unavailable </h1>
              </>
            )}
          </div>
        </div>
        {makeAppointmentModel.value && (
          <div className="add-user-form absolute inset-0 bg-black/40 top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="bg-white p-7 rounded md:w-1/2 lg:w-1/3">
              <h3 className="text-[#2c3e50] text-[1.3rem] font-semibold mb-5">
                Make an appointment
              </h3>

              <form onSubmit={submitAppointmentData} className="space-y-4 ">
                {/* date */}
                <div>
                  <label className="block text-sm font-[500] text-gray-600 mb-1">
                    Date :
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    onChange={handleAppointDataChange}
                    value={appointmentDetails.date}
                    placeholder="Enter username"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time :
                  </label>
                  <input
                    type="time"
                    name="time"
                    onChange={handleAppointDataChange}
                    value={appointmentDetails.time}
                    placeholder="example@gmail.com"
                    required
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  />
                </div>

                <div>
                  <select
                    name="patientId"
                    value={appointmentDetails.patientId}
                    onChange={(e) =>
                      setAppointmentDetails({
                        ...appointmentDetails,
                        patientId: Number(e.target.value),
                      })
                    }
                    className="w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  >
                    <option value="">Select Patient </option>
                    {allPatients.map((patient, index) => (
                      <option key={index} value={patient.patientId}>
                        {patient.patientName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    name="departmentId"
                    onChange={handleDepartmentChange}
                    className="w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  >
                    <option value="">Select Department</option>
                    {allDepartment.map((department, index) => (
                      <option key={index} value={department.departId}>
                        {department.departmentName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    name="doctorId"
                    value={appointmentDetails.doctorId}
                    onChange={(e) =>
                      setAppointmentDetails({
                        ...appointmentDetails,
                        doctorId: Number(e.target.value),
                      })
                    }
                    className="w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  >
                    <option value="">Select Doctor </option>
                    {doctorByDepartment.map((doctor, index) => (
                      <option key={index} value={doctor.doctorId}>
                        {doctor.doctorName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-x-5 mt-8">
                  <button
                    type="button"
                    onClick={() => makeAppointmentModel.setOff()}
                    className="cursor-pointer w-1/3 bg-[#707070] text-white py-2 rounded-md font-semibold hover:bg-[#565656] transition duration-300"
                  >
                    cencel
                  </button>

                  <button
                    type="submit"
                    className="cursor-pointer w-1/3 bg-[#06adaa] text-white py-2 rounded-md font-semibold hover:bg-[#08908d] transition duration-300"
                  >
                    save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ============================  UPDATE APPOINTMENT MODEL ========================= */}

        {updateAppointmentModel.value && (
          <div className="add-user-form absolute inset-0 bg-black/40 top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="bg-white p-7 rounded md:w-1/2 lg:w-1/3">
              <h3 className="text-[#2c3e50] text-[1.3rem] font-semibold mb-5">
                Update Appointment Status
              </h3>

              <form onSubmit={submitStatus} className="space-y-4 ">
                {/* date */}

                <div>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  >
                    <option value="">Select Status </option>

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

                {/* Submit Button */}
                <div className="flex justify-end gap-x-5 mt-8">
                  <button
                    type="button"
                    onClick={() => updateAppointmentModel.setOff()}
                    className="cursor-pointer w-1/3 bg-[#707070] text-white py-2 rounded-md font-semibold hover:bg-[#565656] transition duration-300"
                  >
                    cencel
                  </button>

                  <button
                    type="submit"
                    className="cursor-pointer w-1/3 bg-[#06adaa] text-white py-2 rounded-md font-semibold hover:bg-[#08908d] transition duration-300"
                  >
                    save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Appointments;
