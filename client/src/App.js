
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import CarBooking from "./pages/CarBooking";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/book-car" element={<CarBooking />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
