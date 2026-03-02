import DashboardHeader from "../components/DashboardHeader";
import { useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import {
  createDoctorSchedule,
  deleteSchedule,
  getDoctorSchedules,
  updateSchedule,
} from "../api/Doctor_Schedule_API";
import { AuthContext } from "../context/AuthProvider";
import { allDoctorsWithoutPagination } from "../api/Doctors";
function Doctor_Schedule() {
  let location = useLocation();
  let [allSchedules, setAllSchedule] = useState([]);
  let [allDoctors, setAllDoctors] = useState([]);
  let [currentPage, setCurrentPage] = useState(0);
  let [isLast, setIsLast] = useState(false);
  let [totalPages, setTotalPages] = useState(0);
  let [day, setDay] = useState("");

  let [scheduleDetails, setScheduleDetails] = useState({
    day: "",
    startTime: "",
    endTime: "",
    doctorId: "",
  });
  let [updateScheduleDetails, setUpdateScheduleDetails] = useState({
    day: "",
    startTime: "",
    endTime: "",
    doctorId: "",
  });

  let [scheduleValidationError, setScheduleValidationError] = useState({
    dayError: "",
    doctorError: "",
    endTimeError: "",
    startTimeError: "",
  });

  let [currentScheduleId, setCurrentScheduleId] = useState("");
  let { makeScheduleModel, editScheduleModel, user } = useContext(AuthContext);

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

    if (name === "day") {
      setDay(value);
      setCurrentPage(0);
    }
  };
  let fetchAllSchedules = async () => {
    try {
      let pageSize = 10;
      let res = await getDoctorSchedules(day, pageSize, currentPage,sessionStorage.getItem("token"));
      if (res.status === 200) {
        setAllSchedule(res.data.content);
        setIsLast(res.data.last);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllSchedules();
  }, [currentPage, day]);

  let handleEditSchedule = (currentSchedule) => {
    editScheduleModel.setOn();
    setCurrentScheduleId(currentSchedule.id);
    setUpdateScheduleDetails({
      day: currentSchedule.day,
      startTime: currentSchedule.startTime,
      endTime: currentSchedule.endTime,
      doctorId: currentSchedule.doctorResponseDTO.doctorId,
    });
  };

  let updateChange = (e) => {
    let { name, value } = e.target;
    setUpdateScheduleDetails({
      ...updateScheduleDetails,
      [name]: name === "doctorId" ? Number(value) : value,
    });
  };

  const submitUpdateData = async (e) => {
    e.preventDefault();
    try {
      let res = await updateSchedule(currentScheduleId, updateScheduleDetails);
      if (res.status === 200) {
        setUpdateScheduleDetails({
          day: "",
          startTime: "",
          endTime: "",
          doctorId: "",
        });
        let updateList = allSchedules.map((schedule) =>
          schedule.id === currentScheduleId
            ? { ...schedule, ...updateScheduleDetails }
            : schedule
        );
        setAllSchedule(updateList);
        editScheduleModel.setOff();

        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      let res = await deleteSchedule(id,sessionStorage.getItem("token"));
      if (res.status === 200) {
        let filteredSchedule = allSchedules.filter(
          (schedule) => schedule.id != id
        );
        setAllSchedule(filteredSchedule);
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let fetchAllDoctors = async () => {
      try {
        let res = await allDoctorsWithoutPagination(sessionStorage.getItem("token"));
        if (res.status === 200) {
          setAllDoctors(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllDoctors();
  }, []);

  let handleScheduleDetailsChange = (e) => {
    let { name, value } = e.target;

    setScheduleDetails({
      ...scheduleDetails,
      [name]: name === "doctorId" ? Number(value) : value,
    });
  };

  let scheduleDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await createDoctorSchedule(scheduleDetails,sessionStorage.getItem("token"));
      if (res.status === 200) {
        setScheduleDetails({
          day: "",
          startTime: "",
          endTime: "",
          doctorId: "",
        });
        setScheduleValidationError({
          dayError: "",
          doctorError: "",
          endTimeError: "",
          startTimeError: "",
        });
        await fetchAllSchedules();
        makeScheduleModel.setOff();
        alert(res.data.message);
      }
    } catch (error) {
      
      if (error.response.status === 400) {
        setScheduleValidationError({
          dayError: error.response.data.day,
          doctorError: error.response.data.doctorId,
          endTimeError: error.response.data.endTime,
          startTimeError: error.response.data.startTime,
        });
      }
    }
  };

  return (
    <>
      <div className="doctor-page-container dark:bg-gray-900 relative p-4">
        <DashboardHeader
          title="Doctor Schedule"
          path={location.pathname}
        ></DashboardHeader>

        <div className="w-full dark:bg-gray-800  p-4 bg-white rounded-xl px-15 shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(0,0,0,0.1)] mt-5">
          <div className="flex justify-between">
            <h1 className="text-[#2c3e50] dark:text-slate-100 font-semibold text-[1.1rem]">
              All Doctor Schedule
            </h1>
            <div className="flex items-center gap-x-10">
              <div>
                <select
                  className="appearance-none dark:text-slate-100 px-10 py-0.5 rounded outline-2 outline-gray-400 text-gray-800"
                  onChange={handleChange}
                  name="day"
                >
                  <option className="text-gray-500" value="">
                    Select Day
                  </option>
                  <option className="text-gray-500" value="SUNDAY">
                    Sunday
                  </option>
                  <option className="text-gray-500" value="MONDAY">
                    Monday
                  </option>
                  <option className="text-gray-500" value="TUESDAY">
                    Tuesday
                  </option>
                  <option className="text-gray-500" value="WEDNESDAY">
                    Wednesday
                  </option>
                  <option className="text-gray-500" value="THURSDAY">
                    Thursday
                  </option>
                  <option className="text-gray-500" value="FRIDAY">
                    Friday
                  </option>
                  <option className="text-gray-500" value="SATURDAY">
                    Saturday
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
            {allSchedules ? (
              <>
                <table className="w-full ">
                  <thead className="bg-[#f8f9fa] text-[#2c3e50]">
                    <tr className="border-b border-gray-300">
                      <th className=" px-10 py-3 text-left font-semibold">
                        Doctor Name
                      </th>
                      <th className=" px-10 py-3 text-left font-semibold">
                        Day
                      </th>
                      <th className=" px-10 py-3 text-left font-semibold">
                        Start Time
                      </th>
                      <th className=" px-10 py-3 text-left font-semibold">
                        End Time
                      </th>

                      {user.role === "ADMIN" && (
                        <th className=" px-10 py-3 text-center font-semibold">
                          Action
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {allSchedules.map((schedule, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-300 last:border-0"
                      >
                        <td className="px-10 py-3 text-left">
                          {schedule.doctorResponseDTO.doctorName}
                        </td>
                        <td className="px-10 py-3 text-left">{schedule.day}</td>
                        <td className="px-10 py-3 text-left">
                          {schedule.startTime}
                        </td>
                        <td className="px-10 py-3 text-left">
                          {schedule.endTime}
                        </td>

                        {user.role === "ADMIN" && (
                          <td className="px-10 py-3 text-center">
                            <button
                              onClick={() => handleDeleteSchedule(schedule.id)}
                              className="bg-red-500 text-white cursor-pointer px-4 py-1 mr-2 rounded-2xl text-[10px]"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => handleEditSchedule(schedule)}
                              className="bg-green-500 text-white cursor-pointer px-4 py-1 rounded-2xl text-[10px]"
                            >
                              Edit
                            </button>
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
        {makeScheduleModel.value && (
          <>
            <div className="add-user-form  absolute inset-0 bg-black/40 top-0 left-0 w-full h-full flex justify-center items-center">
              <div className="bg-white dark:bg-gray-800 dark:[&_*]:text-slate-100 p-7 rounded md:w-1/2 lg:w-1/3">
                <h3 className="text-[#2c3e50] text-[1.3rem] font-semibold mb-5">
                  Make Schedule
                </h3>

                <form onSubmit={scheduleDetailsSubmit} className="space-y-4 ">
                  {/* STARTING TIME  */}
                  <div>
                    <label className="block text-sm font-[500] text-gray-600 mb-1">
                      Starting Time :
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      value={scheduleDetails.startTime}
                      onChange={handleScheduleDetailsChange}
                      placeholder="Enter department name"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                    />
                    {scheduleValidationError.startTimeError && (
                      <>
                        <span className="text-red-500 text-sm">
                          {scheduleValidationError.startTimeError}
                        </span>
                      </>
                    )}
                  </div>
                  {/* ENDING TIME */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ending Time :
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      value={scheduleDetails.endTime}
                      placeholder="Enter Description"
                      onChange={handleScheduleDetailsChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                    />
                    {
                      scheduleValidationError.endTimeError && (<>
                       <span className="text-red-500 text-sm">
                          {scheduleValidationError.endTimeError}
                        </span>
                      </>)
                    }
                  </div>
                  {/* SET DOCTOR */}
                  <div>
                    <select
                      name="doctorId"
                      value={scheduleDetails.doctorId}
                      onChange={handleScheduleDetailsChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                    >
                      <option value="" className="dark:bg-gray-800">Select Doctor</option>

                      {allDoctors.map((doctor, index) => (
                        <option
                          key={index}
                          className="text-gray-500 dark:bg-gray-800"
                          value={doctor.doctorId}
                        >
                          {doctor.doctorName}
                        </option>
                      ))}
                    </select>
                    {scheduleValidationError.doctorError && (<>
                     <span className="text-red-500 text-sm">
                          {scheduleValidationError.doctorError}
                        </span>
                    </>)}
                  </div>
                  {/* SET DAY */}
                  <div>
                    <select
                      name="day"
                      onChange={handleScheduleDetailsChange}
                      value={scheduleDetails.day}
                      className="w-full border border-gray-300 rounded-md dark:bg-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                    >
                      <option value="">Select Day</option>
                      <option className="text-gray-500 dark:bg-gray-800" value="SUNDAY">
                        Sunday
                      </option>
                      <option className="text-gray-500 dark:bg-gray-800" value="MONDAY">
                        Monday
                      </option>
                      <option className="text-gray-500 dark:bg-gray-800" value="TUESDAY">
                        Tuesday
                      </option>
                      <option className="text-gray-500 dark:bg-gray-800" value="WEDNESDAY">
                        Wednesday
                      </option>
                      <option className="text-gray-500 dark:bg-gray-800" value="THURSDAY">
                        Thursday
                      </option>
                      <option className="text-gray-500 dark:bg-gray-800" value="FRIDAY">
                        Friday
                      </option>
                      <option className="text-gray-500 dark:bg-gray-800" value="SATURDAY">
                        Saturday
                      </option>
                    </select>

                    {
                      scheduleValidationError.dayError && (<>
                       <span className="text-red-500 text-sm">
                          {scheduleValidationError.dayError}
                        </span>
                      </>)
                    }
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-x-5 mt-8">
                    <button
                      type="button"
                      onClick={() => makeScheduleModel.setOff()}
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
          </>
        )}

        {/*===================== EDIT SCHEDULE FORM ================ */}

        {editScheduleModel.value && (
          <>
            <div className="add-user-form absolute inset-0 bg-black/40 top-0 left-0 w-full h-full flex justify-center items-center">
              <div className="bg-white p-7 rounded md:w-1/2 lg:w-1/3">
                <h3 className="text-[#2c3e50] text-[1.3rem] font-semibold mb-5">
                  Update Schedule with Id : {currentScheduleId}
                </h3>

                <form onSubmit={submitUpdateData} className="space-y-4 ">
                  {/* STARTING TIME  */}
                  <div>
                    <label className="block text-sm font-[500] text-gray-600 mb-1">
                      Starting Time :
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      value={updateScheduleDetails.startTime}
                      onChange={updateChange}
                      required
                      placeholder="Enter department name"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                    />
                  </div>
                  {/* ENDING TIME */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ending Time :
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      value={updateScheduleDetails.endTime}
                      placeholder="Enter Description"
                      onChange={updateChange}
                      required
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                    />
                  </div>
                  {/* SET DOCTOR */}
                  <div>
                    <select
                      name="doctorId"
                      value={updateScheduleDetails.doctorId}
                      onChange={updateChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                    >
                      <option value="">Select Doctor</option>

                      {allDoctors.map((doctor, index) => (
                        <option
                          key={index}
                          className="text-gray-500"
                          value={doctor.doctorId}
                        >
                          {doctor.doctorName}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* SET DAY */}
                  <div>
                    <select
                      name="day"
                      onChange={updateChange}
                      value={updateScheduleDetails.day}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                    >
                      <option value="">Select Day</option>
                      <option className="text-gray-500" value="SUNDAY">
                        Sunday
                      </option>
                      <option className="text-gray-500" value="MONDAY">
                        Monday
                      </option>
                      <option className="text-gray-500" value="TUESDAY">
                        Tuesday
                      </option>
                      <option className="text-gray-500" value="WEDNESDAY">
                        Wednesday
                      </option>
                      <option className="text-gray-500" value="THURSDAY">
                        Thursday
                      </option>
                      <option className="text-gray-500" value="FRIDAY">
                        Friday
                      </option>
                      <option className="text-gray-500" value="SATURDAY">
                        Saturday
                      </option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-x-5 mt-8">
                    <button
                      type="button"
                      onClick={() => editScheduleModel.setOff()}
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
          </>
        )}
      </div>
    </>
  );
}

export default Doctor_Schedule;
