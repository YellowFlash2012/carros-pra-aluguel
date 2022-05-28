import { Col, Row, Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import moment from "moment";

import DefaultLayout from "../components/DefaultLayout";
import { fetchAllBookings } from "../features/bookingSlice";



const MyBookings = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { bookings, loading, error } = useSelector(store => store.bookings);
    console.log(bookings);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllBookings())
    },[dispatch]);

    return (
        <DefaultLayout>
            <h1 className="text-center mt-1">My Bookings</h1>

            {loading && <Spin className="spinner" size="large" />}

            <Row justify="center" gutter={16}>
                <Col lg={20} sm={24}>
                    <>
                        {!loading && bookings ? (
                            bookings
                                .filter((o) => o.user === user.data.userID)
                                .map((booking) => (
                                    <Row className="bs1 mt-2 text-left d-flex align-items-center justify-content-between">
                                        <Col lg={7} sm={24}>
                                            <p>
                                                <b>{booking.car.name}</b>
                                            </p>

                                            <p>
                                                Total Hours:{" "}
                                                <b>{booking.totalHours}</b>
                                            </p>
                                            <p>
                                                Rent per hour:{" "}
                                                <b>{booking.car.rentPerHour}</b>
                                            </p>
                                            <p>
                                                Total Due:{" "}
                                                <b>{booking.totalDue}</b>
                                            </p>
                                        </Col>

                                        <Col lg={10} sm={24}>
                                            <p>
                                                Transaction ID:{" "}
                                                <b>{booking.transactionID}</b>
                                            </p>

                                            <p>
                                                From:{" "}
                                                <b>
                                                    {
                                                        booking.bookedTimeSlots
                                                            .from
                                                    }
                                                </b>
                                            </p>
                                            <p>
                                                To:{" "}
                                                <b>
                                                    {booking.bookedTimeSlots.to}
                                                </b>
                                            </p>
                                            <p>
                                                Date of booking:{" "}
                                                <b>
                                                    {moment(
                                                        booking.createdAt
                                                    ).format("MMM DD yyyy")}
                                                </b>
                                            </p>
                                        </Col>

                                        <Col
                                            lg={7}
                                            sm={24}
                                            className="text-center"
                                        >
                                            <img
                                                style={{ borderRadius: "5px" }}
                                                src={booking.car.image}
                                                alt={booking.car.name}
                                                className="p-2"
                                                height={140}
                                            />
                                        </Col>
                                    </Row>
                                ))
                        ) : (
                            <h3 className="text-center">
                                No booking yet! Make one quick!
                            </h3>
                        )}
                    </>
                </Col>
            </Row>

            {!loading && error ? (
                <h1 className="error-msg">Error: {error}</h1>
            ) : null}
        </DefaultLayout>
    );
};
export default MyBookings;
