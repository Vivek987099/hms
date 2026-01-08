import Swal from "sweetalert2";
import { checkAuth, loginUser, logoutUser } from "./../api/Auth";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useToggle from "../customhokks/useToggle";
import { getAllDepartments } from "../api/Department_API";
import { getAllPatients } from "../api/PatientApi";

const AuthContext = createContext();

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [loading, setLoading] = useState(true);
  let [allDepartment, setAllDepartment] = useState([]);
  let [allPatients, setAllPatients] = useState([]);
  let [isLast, setIsLast] = useState(false);
  let [totalPages, setTotalPages] = useState(0);
  let [currentPage, setCurrentPage] = useState(0);

  let navigate = useNavigate();

  let fetchAllDepartment = async () => {
    try {
      let res = await getAllDepartments();
      if (res.status === 200) {
        setAllDepartment(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let fetchAllPatients = async () => {
    let pageSize = 10;
    try {
      let res = await getAllPatients(pageSize, currentPage);
      if (res.status === 200) {
        setAllPatients(res.data.content);
        setIsLast(res.data.last);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let verifyAuth = async () => {
      try {
        let response = await checkAuth();
        if (response.status === 200) {
          setUser({
            username: response.data.username,
            role: response.data.role,
          });
          setIsLoggedIn(response.data.LoggedIn);
          navigate("/admin/dashboard");
        }

        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setUser(null);
          setIsLoggedIn(false);
        }
        navigate("/");
        setLoading(false);
      }
    };
    verifyAuth();
  }, []);

  let login = async (loginDetails) => {
    try {
      let response = await loginUser(loginDetails);
      let authResponse = await checkAuth();

      if (response.status === 200 && authResponse.status === 200) {
        setUser({
          username: authResponse.data.username,
          role: authResponse.data.role,
        });
        setIsLoggedIn(authResponse.data.LoggedIn);

        navigate("/admin/dashboard");

        Swal.fire({
          title: "Login Successful",
          text: response?.data?.message,
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton:
              "px-6 py-2 bg-[#06adaa] text-white rounded-md hover:bg-[#08908d] block w-full",
          },
          buttonsStyling: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text:
          error.response?.data?.message || "An error occurred during login.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "px-6 py-2 bg-[#06adaa] text-white rounded-md hover:bg-[#08908d] block w-full",
        },
        buttonsStyling: false,
      });
    }
  };

  let logout = async () => {
    try {
      let res = await logoutUser();
      if (res.status === 200) {
        setUser(null);
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      alert("Logout failed due to some error. Please try again.");
    }
  };

  // Custom toggles for modals

  let addDoctorModel = useToggle(false);
  let addUserModel = useToggle(false);
  let makeScheduleModel = useToggle(false);
  let createDepartModel = useToggle(false);
  let editDepartModel = useToggle(false);
  let updateDoctorModel = useToggle(false);
  let editScheduleModel = useToggle(false);
  let makeAppointmentModel = useToggle(false);
  let updateAppointmentModel = useToggle(false);
  let addPatientModel=useToggle(false)
  let updatePatientModel=useToggle(false)
  let sidebarToggle = useToggle(true)
  let mobileMenuToggle=useToggle(false)


  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        isLoggedIn,
        loading,
        logout,
        addUserModel,
        addDoctorModel,
        makeScheduleModel,
        createDepartModel,
        editDepartModel,
        allDepartment,
        fetchAllDepartment,
        addPatientModel,
        setAllDepartment,
        updateDoctorModel,
        editScheduleModel,
        makeAppointmentModel,
        setAllPatients,
        mobileMenuToggle,
        allPatients,
        isLast,
        totalPages,
        setCurrentPage,
        fetchAllPatients,
        currentPage,
        sidebarToggle,
        updateAppointmentModel,
        updatePatientModel
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
