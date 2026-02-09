import React, { useContext, useEffect, useState } from "react";
import DashboardHeader from "./../components/DashboardHeader";
import { useLocation } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import {
  createDoctor,
  deleteDoctorById,
  getAllDoctors,
  updateDoctor,
} from "../api/Doctors";
import { FaChevronRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { getUserByRole } from "../api/User";

function Doctors() {
  let location = useLocation();
  let { user } = useContext(AuthContext);
  let { addDoctorModel, allDepartment, fetchAllDepartment, updateDoctorModel } =
    useContext(AuthContext);
  const [doctorDetails, setdoctorDetails] = useState({
    doctorName: "",
    specialization: "",
    fee: "",
    departmentId: "",
  });
  const [updateDoctorDetails, setUpdateDoctorDetails] = useState({
    doctorName: "",
    specialization: "",
    profilePhotoUrl: "",
    fee: "",
    email: "",
    departmentId: "",
  });

  let [validationsError, setValidationsError] = useState({
    departmentId: "",
    doctorName: "",
    email: "",
    fee: "",
    specialization: "",
  });

  const [currentDoctorId, setCurrentDoctorId] = useState(null);

  let [doctorUsers, setDoctorUsers] = useState([]);
  let [userId, setUserId] = useState("");
  let [userIdError, setUserIdError] = useState("");

  const [file, setFile] = useState(null);
  let [allDoctors, setAllDoctors] = useState([]);
  let [currentPage, setCurrentPage] = useState(0);
  let [isLast, setIsLast] = useState(false);
  let [totalPages, setTotalPages] = useState(0);
  let [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setdoctorDetails({
      ...doctorDetails,
      [name]: name === "departmentId" ? Number(value) : value,
    });
  };
  let handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let formData = new FormData();



      formData.append(
        "doctor",
        new Blob([JSON.stringify(doctorDetails)], { type: "application/json" }),
      );
      formData.append("file", file);

      if(!userId){
        
        setUserIdError("Please select user for doctor");
        setLoading(false);
        return;
      }

      let res = await createDoctor(userId, formData);
      console.log(res.status);

      if (res.status === 200) {
        setLoading(false);
        setdoctorDetails({
          doctorName: "",
          specialization: "",
          fee: "",
        });
        setValidationsError({
          departmentId: "",
          doctorName: "",
          email: "",
          fee: "",
          specialization: "",
        });
        fetchAllDoctors();
        addDoctorModel.setOff();
        alert(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response);

       if (error.response.status === 409){
        alert(error.response.data.message)

       }
      
      if (error.response.status === 400) {
        setLoading(false);
        
       

        setValidationsError({
          departmentId: error.response.data.departmentId,
          doctorName: error.response.data.doctorName,
          email: error.response.data.email,
          fee: error.response.data.fee,
          specialization: error.response.data.specialization,
        });
      }
    }

    // Handle form submission, such as sending the data to an API
  };

  let submitCancel = () => {
    addDoctorModel.setOff();
    setValidationsError({
      departmentId: "",
      doctorName: "",
      email: "",
      fee: "",
      specialization: "",
    });
  };

  let fetchAllDoctors = async () => {
    let res = await getAllDoctors();
    if (res.status === 200) {
      setAllDoctors(res.data.content);
      setIsLast(res.data.last);
      setTotalPages(res.data.totalPages);
    }
  };

  useEffect(() => {
    fetchAllDoctors();
    fetchAllDepartment();
    fetchAllDoctorUser();
  }, []);
  let handleNextPage = () => {
    if (isLast) setCurrentPage(0);
    else setCurrentPage((prev) => prev + 1);
  };
  let handlePreviousPage = () => {
    if (currentPage === 0) setCurrentPage(totalPages - 1);
    else setCurrentPage((prev) => prev - 1);
  };

  let handleDeleteUser = async (doctorId) => {
    try {
      let res = await deleteDoctorById(doctorId);
      if (res.status === 200) {
        alert("doctor deleted successfully");
        let filteredDoctors = allDoctors.filter(
          (doctor) => doctor.doctorId !== doctorId,
        );
        setAllDoctors(filteredDoctors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let handleEditDoctor = (currentDoctor, departmentId) => {
    updateDoctorModel.setOn();
    setCurrentDoctorId(currentDoctor.doctorId);
    setUpdateDoctorDetails({
      doctorName: currentDoctor.doctorName,
      specialization: currentDoctor.specialization,
      profilePhotoUrl: currentDoctor.profilePhotoUrl,
      fee: currentDoctor.fee,
      email: currentDoctor.email,
      departmentId: departmentId,
    });
  };

  const updateDataChange = (e) => {
    let { name, value } = e.target;
    setUpdateDoctorDetails({
      ...updateDoctorDetails,
      [name]: name === "departmentId" ? Number(value) : value,
    });
  };

  const submitUpdateData = async (e) => {
    e.preventDefault();
    console.log(currentDoctorId);
    console.log(updateDoctorDetails);
    try {
      let res = await updateDoctor(currentDoctorId, updateDoctorDetails);
      if (res.status === 200) {
        let updatedList = allDoctors.map((doctor) =>
          doctor.doctorId === currentDoctorId
            ? { ...doctor, ...updateDoctorDetails }
            : doctor,
        );
        setAllDoctors(updatedList);
        setUpdateDoctorDetails({
          doctorName: "",
          specialization: "",
          profilePhotoUrl: "",
          fee: "",
          email: "",
          departmentId: "",
        });
        updateDoctorModel.setOff();
        alert(res.data.message);
      }
    } catch (error) {
      error;
    }
  };

  let fetchAllDoctorUser = async () => {
    try {
      let res = await getUserByRole("DOCTOR");
      if (res.status === 200) {
        setDoctorUsers(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      <div className="doctor-page-container relative p-4">
        <DashboardHeader
          title="Doctors"
          path={location.pathname}
        ></DashboardHeader>
        <div className="w-full   p-4 bg-white rounded-xl lg:px-15 shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(0,0,0,0.1)] mt-5">
          <div className="flex justify-between">
            <h1 className="text-[#2c3e50] font-semibold text-[1.1rem]">
              All Doctors
            </h1>
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
          <div className="mt-5 overflow-x-auto outline-2 outline-gray-200 rounded-lg hidden lg:block">
            <table className="w-full ">
              <thead className="bg-[#f8f9fa] text-[#2c3e50]">
                <tr className="border-b border-gray-300">
                  <th className=" px-10 py-3 text-left font-semibold">
                    Profile Photo
                  </th>

                  <th className=" px-10 py-3 text-left font-semibold">
                    Doctor Name
                  </th>
                  <th className=" px-10 py-3 text-left font-semibold">
                    Department
                  </th>
                  <th className=" px-10 py-3 text-left font-semibold">
                    Specialization
                  </th>
                  <th className=" px-10 py-3 text-left font-semibold">Fee</th>

                  {user.role === "ADMIN" && (
                    <th className=" px-10 py-3 text-center font-semibold">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {allDoctors.map((doctor, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 last:border-0"
                  >
                    <td className="px-10 py-3 text-left">
                      <div className=" size-12 rounded-full overflow-hidden">
                        <img
                          alt="profile"
                          src={`http://localhost:8080/file/${doctor.profilePhotoUrl}`}
                          className="w-full h-auto"
                        />
                      </div>
                    </td>
                    <td className="px-10 py-3 text-left">
                      {doctor.doctorName}
                    </td>

                    <td className="px-10 py-3 text-left">
                      {doctor.departmentResponseDTO.departmentName}
                    </td>
                    <td className="px-10 py-3 text-left">
                      {doctor.specialization}
                    </td>
                    <td className=" px-10 py-3 text-left font-semibold">
                      {doctor.fee}
                    </td>

                    {user.role === "ADMIN" && (
                      <td className=" px-10 py-3 text-center font-semibold">
                        <button
                          onClick={() => handleDeleteUser(doctor.doctorId)}
                          className="bg-red-500 text-white cursor-pointer px-4 py-1 mr-2 rounded-2xl text-[10px]"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            handleEditDoctor(
                              doctor,
                              doctor.departmentResponseDTO.departId,
                            )
                          }
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
          </div>
          <div className="card-wrapper w-full p-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  mt-5 lg:hidden">
            {allDoctors &&
              allDoctors.map((doctor, index) => (
                <div
                  key={index}
                  className="card h-full w-full   rounded overflow-hidden transition-all duration-300 shadow-[0px_8px_10px_rgba(0,0,0,0.1)] hover:shadow-[0px_8px_10px_rgba(0,0,0,0.2)]"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={`http://localhost:8080/file/${doctor.profilePhotoUrl}`}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="bg-white p-1 text-gray-900">
                    <h1 className=" text-sm lg:text-base ">
                      <span className="font-semibold">Name : </span>
                      {doctor.doctorName}
                    </h1>
                    <h1 className=" text-sm lg:text-base mb-2 ">
                      <span className=" font-[500]">Specialization : </span>
                      <span className="text-[#06adaa] ">
                        {doctor.specialization}
                      </span>
                    </h1>
                    <h1 className="break-all leading-4 text-sm lg:text-base mb-2">
                      <span className="font-semibold">Email : </span>
                      {doctor.email}
                    </h1>
                    <h1 className=" text-sm lg:text-base ">
                      <span className="font-semibold">Fee : </span>{" "}
                      <span className="text-green-700">{doctor.fee}</span>
                    </h1>
                    <div className=" flex justify-around mt-5">
                      <button
                        onClick={() => handleDeleteUser(doctor.doctorId)}
                        className="bg-red-500 text-white cursor-pointer px-6 py-1.5 mr-2 rounded text-[10px]"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          handleEditDoctor(
                            doctor,
                            doctor.departmentResponseDTO.departId,
                          )
                        }
                        className="bg-green-500 text-white cursor-pointer px-6 py-1  rounded text-[10px]"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* ==========    ADD DOCTOR ========== */}
        {addDoctorModel.value && (
          <div className="add-user-form absolute inset-0 bg-black/40 top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="bg-white p-7  w-full h-full">
              {!loading ? (
                <>
                  <h3 className="text-[#2c3e50] text-[1.3rem] font-semibold mb-5">
                    Add New Doctor
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4 ">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-[500] text-gray-600 mb-1">
                          Doctor Name :
                        </label>
                        <input
                          type="text"
                          name="doctorName"
                          value={doctorDetails.doctorName}
                          onChange={handleChange}
                          placeholder="Enter username"
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                        />
                        {validationsError.doctorName && (
                          <>
                            <span className="text-red-500 text-sm">
                              {validationsError.doctorName}
                            </span>
                          </>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Specialization :
                        </label>
                        <input
                          type="text"
                          name="specialization"
                          value={doctorDetails.specialization}
                          onChange={handleChange}
                          placeholder="Enter specialization"
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                        />
                        {validationsError.specialization && (
                          <>
                            <span className="text-red-500 text-sm">
                              {validationsError.specialization}
                            </span>
                          </>
                        )}
                      </div>
                      <div>
                        <select
                          name="departmentId"
                          onChange={handleChange}
                          value={doctorDetails.departmentId}
                          className="w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                        >
                          <option value="">Select Department</option>
                          {allDepartment.map((department, index) => (
                            <option key={index} value={department.departId}>
                              {department.departmentName}
                            </option>
                          ))}
                        </select>
                        {validationsError.departmentId && (
                          <>
                            <span className="text-red-500 text-sm">
                              {validationsError.departmentId}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Fee */}
                      <div>
                        <label
                          htmlFor="fee"
                          className="block text-gray-700 font-medium mb-1"
                        >
                          Consultation Fee
                        </label>
                        <input
                          type="number"
                          name="fee"
                          id="fee"
                          value={doctorDetails.fee}
                          onChange={handleChange}
                          placeholder="Enter Fee "
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                        />
                        {validationsError.fee && (
                          <>
                            <span className="text-red-500 text-sm">
                              {validationsError.fee}
                            </span>
                          </>
                        )}
                      </div>

                      {/* SELECT USER FOR DOCTOR  */}

                      <div>
                        <select
                          onChange={(e) => setUserId(Number(e.target.value))}
                          value={userId}
                          className="w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                        >
                          <option value="">Select User for doctor</option>
                          {doctorUsers.map((user, index) => (
                            <option key={index} value={user.id}>
                              {user.username}
                            </option>
                          ))}
                        </select>
                        {userIdError && (<>{
                            <span className="text-red-500 text-sm">
                              {userIdError}
                            </span>

                        }
                        </>)}
                        {validationsError.departmentId && (
                          <>
                            <span className="text-red-500 text-sm">
                              {validationsError.departmentId}
                            </span>
                          </>
                        )}
                      </div>
                      {/* Profile Photo */}
                      <div>
                        <label
                          htmlFor="profilePhoto"
                          className="block text-gray-700 font-medium mb-1"
                        >
                          Profile Photo
                        </label>
                        <input
                          type="file"
                          name="profilePhoto"
                          id="profilePhoto"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full text-gray-700 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center gap-x-5 mt-18">
                      <button
                        type="button"
                        onClick={submitCancel}
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
                </>
              ) : (
                <>
                  <div className="loader"></div>
                </>
              )}
            </div>
          </div>
        )}

        {/* UPDATE DOCTOR MODEL */}

        {updateDoctorModel.value && (
          <>
            <div className="add-user-form absolute inset-0 bg-black/40 top-0 left-0 w-full h-full flex justify-center items-center">
              <div className="bg-white p-7 rounded md:w-1/2 lg:w-1/3">
                <h3 className="text-[#2c3e50] text-[1.3rem] font-semibold mb-5">
                  Update Doctor
                </h3>

                <form onSubmit={submitUpdateData} className="space-y-4 ">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-[500] text-gray-600 mb-1">
                      Doctor Name :
                    </label>
                    <input
                      type="text"
                      name="doctorName"
                      required
                      onChange={updateDataChange}
                      value={updateDoctorDetails.doctorName}
                      placeholder="Enter username"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email :
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={updateDoctorDetails.email}
                      placeholder="example@gmail.com"
                      required
                      onChange={updateDataChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialization :
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={updateDoctorDetails.specialization}
                      placeholder="Enter specialization"
                      onChange={updateDataChange}
                      required
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                    />
                  </div>
                  <div>
                    <select
                      name="departmentId"
                      onChange={updateDataChange}
                      value={updateDoctorDetails.departmentId}
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

                  {/* Fee */}
                  <div>
                    <label
                      htmlFor="fee"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Consultation Fee
                    </label>
                    <input
                      type="number"
                      name="fee"
                      onChange={updateDataChange}
                      id="fee"
                      value={updateDoctorDetails.fee}
                      placeholder="Enter Fee "
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-x-5 mt-8">
                    <button
                      type="button"
                      onClick={() => updateDoctorModel.setOff()}
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

export default Doctors;
