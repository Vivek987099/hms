import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Services from "./pages/Services";
import Layout from "./pages/Layout";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthProvider";
import PageNotFound from './pages/PageNotFound';
import ProtectedRoute from "./Protacred/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Users from "./pages/Users";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Patient from "./pages/Patient";
import Doctor_Schedule from "./pages/Doctor_Schedule";
import Department from "./pages/Department";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route path="/login" element={<Login />}>
          </Route>

          <Route path="/admin/dashboard" element={  <ProtectedRoute>  <AdminDashboard /></ProtectedRoute>}>
            <Route index element={<Dashboard/>}></Route>
            <Route path="users" element={<Users/>}></Route>
            <Route path="doctors" element={<Doctors/>}></Route>
            <Route path="patients" element={<Patient/>}></Route>
            <Route path="appointments" element={<Appointments/>}></Route>
            <Route path="doctor-schedule" element={<Doctor_Schedule/>}></Route>
            <Route path="department" element={<Department />}></Route>
          </Route>

          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
