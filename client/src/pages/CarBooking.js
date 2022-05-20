import { Navigate } from "react-router-dom";

import DefaultLayout from "../components/DefaultLayout";

const CarBooking = () => {
    const user = localStorage.getItem("user");

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <DefaultLayout>CarBooking</DefaultLayout>;
};
export default CarBooking;
