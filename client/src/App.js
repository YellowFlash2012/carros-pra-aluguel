
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import CarBooking from "./pages/CarBooking";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


import "antd/dist/antd.css";
import MyBookings from "./pages/MyBookings";
import AddNewCar from "./pages/AddNewCar";
import AdminHome from "./pages/AdminHome";
import EditCar from "./pages/EditCar";

function App() {
  // let carID  = useParams();
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />

                  <Route path="/login" element={<Login />} />

                  <Route path="/register" element={<Register />} />

                  <Route path="/booking/:carID" element={<CarBooking />} />

                  <Route path="/my-bookings" element={<MyBookings />} />

                  <Route path="/add-new-car" element={<AddNewCar />} />

                  <Route path="/admin" element={<AdminHome />} />

                  <Route path="/edit-car/:carID" element={<EditCar />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;

export const ProtectedRoute = (props) => {
    if (localStorage.getItem("user")) {
      return <Route {...props} />
    } else {
      return <Navigate to="/login" replace />
    }
}