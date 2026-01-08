import { useContext, useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { FaChevronRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import { registerPatient, softDelete, updatePatient } from "../api/PatientApi";

function Patient() {
  let {
    allPatients,
    isLast,
    totalPages,
    setCurrentPage,
    fetchAllPatients,
    currentPage,
    setAllPatients,
    addPatientModel,
    updatePatientModel,
    user,
  } = useContext(AuthContext);

  let [patientDetails, setPatientDetails] = useState({
    patientName: "",
    gender: "",
    age: "",
    phone: "",
    adderes: "",
  });
  let [updateDetails, setUpdateDetails] = useState({
    patientName: "",
    gender: "",
    age: "",
    phone: "",
    adderes: "",
  });
  let [currentPatientId, setCurrentPatientId] = useState(null);

  useEffect(() => {
    fetchAllPatients();
  }, [currentPage]);

  let handleNextPage = () => {
    if (isLast) setCurrentPage(0);
    else setCurrentPage((prev) => prev + 1);
  };
  let handlePreviousPage = () => {
    if (currentPage === 0) setCurrentPage(totalPages - 1);
    else setCurrentPage((prev) => prev - 1);
  };

  const handleSoftDeletePatient = async (id) => {
    try {
      let res = await softDelete(id);
      if (res.status === 200) {
        setAllPatients(allPatients.filter((pat) => pat.patientId != id));

        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const patientDetailsChange = (e) => {
    let { name, value } = e.target;
    setPatientDetails({
      ...patientDetails,
      [name]: name === "age" ? Number(value) : value,
    });
  };
  const submitPatientDetails = async (e) => {
    e.preventDefault();

    try {
      let res = await registerPatient(patientDetails);
      if (res.status === 200) {
        setPatientDetails({
          patientName: "",
          gender: "",
          age: "",
          phone: "",
          adderes: "",
        });
        addPatientModel.setOff();
        fetchAllPatients();
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(patientDetails);
  };

  //  EDIT FUNCTIONALITY

  const handlePatientEdit = (currentPatient) => {
    setCurrentPatientId(currentPatient.patientId);
    setUpdateDetails({
      patientName: currentPatient.patientName,
      gender: currentPatient.gender,
      age: currentPatient.age,
      phone: currentPatient.phone,
      adderes: currentPatient.adderes,
    });
    console.log(currentPatient.age);

    updatePatientModel.setOn();
  };

  const updateDetailsChange = (e) => {
    let { name, value } = e.target;

    setUpdateDetails({
      ...updateDetails,
      [name]: name === "age" ? Number(value) : value,
    });
  };
  const submitUpdateDetails = async (e) => {
    e.preventDefault();

    try {
      let res = await updatePatient(currentPatientId, updateDetails);
      if (res.status === 200) {
        setUpdateDetails({
          patientName: "",
          gender: "",
          age: "",
          phone: "",
          adderes: "",
        });
        fetchAllPatients();
        updatePatientModel.setOff();
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="doctor-page-container relative p-4">
      <DashboardHeader
        title="Patients"
        path={location.pathname}
      ></DashboardHeader>
      <div className="w-full   p-4 bg-white rounded-xl px-15 shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(0,0,0,0.1)] mt-5">
        <div className="flex justify-between">
          <h1 className="text-[#2c3e50] font-semibold text-[1.1rem]">
            All Patients
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
        <div className="mt-5 overflow-x-auto outline-2 outline-gray-200 rounded-lg">
          <table className="w-full ">
            <thead className="bg-[#f8f9fa] text-[#2c3e50]">
              <tr className="border-b border-gray-300">
                <th className=" px-10 py-3 text-left font-semibold">
                  Patient Name
                </th>
                <th className=" px-10 py-3 text-left font-semibold">Gender</th>
                <th className=" px-10 py-3 text-left font-semibold">Phone</th>
                <th className=" px-10 py-3 text-left font-semibold">Address</th>
                <th className=" px-10 py-3 text-left font-semibold">
                  Admitted At
                </th>

                {user.role === "ADMIN" && (
                  <th className=" px-10 py-3 text-center font-semibold">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {allPatients.map((patient, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 last:border-0"
                >
                  <td className="px-10 py-3 text-left whitespace-nowrap">
                    {patient.patientName}
                  </td>
                  <td className="px-10 py-3 text-left whitespace-nowrap">{patient.gender}</td>
                  <td className="px-10 py-3 text-left whitespace-nowrap">{patient.phone}</td>
                  <td className="px-10 py-3 text-left whitespace-nowrap">{patient.adderes}</td>

                  <td className="px-10 py-3 text-left whitespace-nowrap">{patient.createdAt}</td>

                  {user.role === "ADMIN" && (
                    <td className=" px-10 py-3 text-center font-semibold flex flex-col lg:flex-row">
                      <button
                        onClick={() =>
                          handleSoftDeletePatient(patient.patientId)
                        }
                        className="bg-red-500 text-white cursor-pointer px-4 py-1 mr-2 rounded-2xl text-[10px]"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handlePatientEdit(patient)}
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
      </div>

      {addPatientModel.value && (
        <>
          <div className="add-user-form add-user-form absolute inset-0 bg-black/40 top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="bg-white p-7 rounded md:w-1/2 lg:w-1/3">
              <h3 className="text-[#2c3e50] text-[1.3rem] font-semibold mb-5">
                Add Patient
              </h3>
              <form onSubmit={submitPatientDetails} className="space-y-4 ">
                {/* name */}
                <div>
                  <label className="block text-sm font-[500] text-gray-600 mb-1">
                    Patient Name :
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    required
                    onChange={patientDetailsChange}
                    value={patientDetails.patientName}
                    placeholder="Enter username"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  />
                </div>
                <div className=" mt-3">
                  <p className="block text-sm font-[500] text-gray-600 mb-1">
                    Select Gender :{" "}
                  </p>
                  <div className="flex gap-x-3 mt-3">
                    <div>
                      <input
                        type="radio"
                        value="Male"
                        name="gender"
                        checked={patientDetails.gender === "Male"}
                        id="male"
                        required
                        onChange={(e) =>
                          setPatientDetails({
                            ...patientDetails,
                            gender: e.target.value,
                          })
                        }
                        className="peer hidden"
                      />
                      <label
                        htmlFor="male"
                        className="border-2 cursor-pointer border-[#06adaa] px-4 py-1 rounded font-semibold text-[#06adaa] transition-all duration-200 peer-checked:bg-[#06adaa] peer-checked:text-white peer-checked:outline-0"
                      >
                        Male
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        value="Female"
                        name="gender"
                        required
                        id="female"
                        checked={patientDetails.gender === "Female"}
                        onChange={(e) =>
                          setPatientDetails({
                            ...patientDetails,
                            gender: e.target.value,
                          })
                        }
                        className="peer hidden"
                      />
                      <label
                        htmlFor="female"
                        className="border-2 cursor-pointer border-[#06adaa] px-4 py-1 rounded font-semibold text-[#06adaa] transition-all duration-200 peer-checked:bg-[#06adaa] peer-checked:text-white peer-checked:outline-0"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age :
                  </label>
                  <input
                    type="number"
                    name="age"
                    onChange={patientDetailsChange}
                    required
                    value={patientDetails.age}
                    placeholder="Enter age"
                    className="w-full border appearance-none border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone :
                  </label>
                  <input
                    type="text"
                    name="phone"
                    onChange={patientDetailsChange}
                    required
                    value={patientDetails.phone}
                    placeholder="Enter phone"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address :
                  </label>
                  <input
                    type="text"
                    name="adderes"
                    required
                    onChange={patientDetailsChange}
                    value={patientDetails.adderes}
                    placeholder="Enter address"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-x-5 mt-8">
                  <button
                    type="button"
                    onClick={() => addPatientModel.setOff()}
                    className="cursor-pointer w-1/3 bg-[#707070] text-white py-2 rounded-md font-semibold hover:bg-[#565656] transition duration-300"
                  >
                    cencel
                  </button>

                  <button
                    type="submit"
                    className="cursor-pointer w-1/3 bg-[#06adaa] text-white py-2 rounded-md font-semibold hover:bg-[#08908d] transition duration-300"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* UPDATE PATIENT */}

      {updatePatientModel.value && (
        <>
          <div className="add-user-form add-user-form absolute inset-0 bg-black/40 top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="bg-white p-7 rounded md:w-1/2 lg:w-1/3">
              <h3 className="text-[#2c3e50] text-[1.3rem] font-semibold mb-5">
                Upadte Patient
              </h3>
              <form onSubmit={submitUpdateDetails} className="space-y-4 ">
                {/* name */}
                <div>
                  <label className="block text-sm font-[500] text-gray-600 mb-1">
                    Patient Name :
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    required
                    value={updateDetails.patientName}
                    onChange={updateDetailsChange}
                    placeholder="Enter username"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  />
                </div>
                <div className=" mt-3">
                  <p className="block text-sm font-[500] text-gray-600 mb-1">
                    Select Gender :{" "}
                  </p>
                  <div className="flex gap-x-3 mt-3">
                    <div>
                      <input
                        type="radio"
                        value="Male"
                        name="gender"
                        checked={updateDetails.gender === "Male"}
                        id="male"
                        required
                        onChange={(e) =>
                          setUpdateDetails({
                            ...updateDetails,
                            gender: e.target.value,
                          })
                        }
                        className="peer hidden"
                      />
                      <label
                        htmlFor="male"
                        className="border-2 cursor-pointer border-[#06adaa] px-4 py-1 rounded font-semibold text-[#06adaa] transition-all duration-200 peer-checked:bg-[#06adaa] peer-checked:text-white peer-checked:outline-0"
                      >
                        Male
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        value="Female"
                        name="gender"
                        required
                        id="female"
                        checked={updateDetails.gender === "Female"}
                        onChange={(e) =>
                          setUpdateDetails({
                            ...updateDetails,
                            gender: e.target.value,
                          })
                        }
                        className="peer hidden"
                      />
                      <label
                        htmlFor="female"
                        className="border-2 cursor-pointer border-[#06adaa] px-4 py-1 rounded font-semibold text-[#06adaa] transition-all duration-200 peer-checked:bg-[#06adaa] peer-checked:text-white peer-checked:outline-0"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age :
                  </label>
                  <input
                    type="number"
                    name="age"
                    required
                    value={updateDetails.age}
                    onChange={updateDetailsChange}
                    placeholder="Enter age"
                    className="w-full border appearance-none border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone :
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    onChange={updateDetailsChange}
                    value={updateDetails.phone}
                    placeholder="Enter phone"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address :
                  </label>
                  <input
                    type="text"
                    name="adderes"
                    onChange={updateDetailsChange}
                    required
                    value={updateDetails.adderes}
                    placeholder="Enter address"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-x-5 mt-8">
                  <button
                    type="button"
                    onClick={() => updatePatientModel.setOff()}
                    className="cursor-pointer w-1/3 bg-[#707070] text-white py-2 rounded-md font-semibold hover:bg-[#565656] transition duration-300"
                  >
                    cencel
                  </button>

                  <button
                    type="submit"
                    className="cursor-pointer w-1/3 bg-[#06adaa] text-white py-2 rounded-md font-semibold hover:bg-[#08908d] transition duration-300"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Patient;
