import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCarAction, fetchAllCars } from "../features/carsSlice";

import { Popconfirm, Col, Row, Spin, DatePicker } from "antd";

import { EditOutlined, DeleteFilled } from "@ant-design/icons";

import { Navigate, useNavigate } from "react-router-dom";
import moment from "moment";

import "./AdminHome.css";
import { getAllUsers } from "../features/authSlice";
import { fetchAllBookings } from "../features/bookingSlice";

const { RangePicker } = DatePicker;

const AdminHome = () => {
    const { loading, cars, error } = useSelector((store) => store.cars);
    const { bookings } = useSelector((store) => store.bookings);
    const { users } = useSelector((store) => store.auth);
    const { user } = useSelector((store) => store.auth);

    // console.log(bookings);
    // console.log(users);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [availableCars, setAvailableCars] = useState([]);

    useEffect(() => {
        dispatch(fetchAllCars());
        dispatch(getAllUsers());
        dispatch(fetchAllBookings());
    }, [dispatch]);

    useEffect(() => {
        setAvailableCars(cars);
    }, [cars]);

    // console.log(user);
    if (!user.data.isAdmin) {
        return <Navigate to="/" replace />;
    }

    const filterCars = (values) => {
        let from = moment(values[0], "MMM DD yyy HH:mm");
        let to = moment(values[1], "MMM DD yyy HH:mm");

        let temp = [];

        for (let car of cars) {
            if (car.bookedTimeSlots.length === 0) {
                temp.push(car);
            } else {
                for (let booking of car.bookedTimeSlots) {
                    if (
                        from.isBetween(booking.from, booking.to) ||
                        to.isBetween(booking.from, booking.to) ||
                        moment(booking.from).isBetween(from, to) ||
                        moment(booking.to).isBetween(from, to)
                    ) {
                    } else {
                        temp.push(car);
                    }
                }
            }
        }

        setAvailableCars(temp);
    };

    const carDeletionHandler = (carID) => {};

    return (
        <DefaultLayout>
            <Row justify="center" gutter={16}>
                <Col lg={20} sm={24}>
                    <button
                        onClick={() => navigate("/add-new-car")}
                        className="add-new-car"
                    >
                        ADD NEW CAR
                    </button>
                </Col>
            </Row>

            {loading && <Spin className="spinner" size="large" />}

            {/* cars */}
            {!loading && availableCars.length ? (
                <Row justify="center" gutter={16}>
                    {availableCars.map((car) => (
                        <Col lg={5} sm={24} xs={24} key={car._id}>
                            <div className="car p-2 bs1">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="carImg mx-auto"
                                />

                                <div className="car-content d-flex align-items-center justify-content-between">
                                    <div>
                                        <p className="fw-bolder">{car.name}</p>
                                        <p>
                                            Rent Per Hour {car.rentPerHour} /-
                                        </p>
                                    </div>

                                    <div className="me-2">
                                        <EditOutlined
                                            onClick={() =>
                                                navigate(`/edit-car/${car._id}`)
                                            }
                                            className="me-2"
                                        />

                                        <Popconfirm
                                            title="Are you sure you want to delete this car?"
                                            onConfirm={() =>
                                                dispatch(
                                                    deleteCarAction({
                                                        carID: car._id,
                                                    })
                                                )
                                            }
                                            onCancel={() => navigate("/admin")}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <DeleteFilled />
                                        </Popconfirm>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            ) : null}

            {/* bookings */}
            <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
                All Bookings
            </h2>
            {!loading && bookings.length > 0
                ? bookings?.map((booking) => (
                      <>
                          <Row className="bs1 mt-2 text-left d-flex align-items-center justify-content-between">
                              <Col lg={7} sm={24}>
                                  <p>
                                      <b>{booking.car.name}</b>
                                  </p>

                                  <p>
                                      Total Hours: <b>{booking.totalHours}</b>
                                  </p>
                                  <p>
                                      Rent per hour:{" "}
                                      <b>{booking.car.rentPerHour}</b>
                                  </p>
                                  <p>
                                      Total Due: <b>{booking.totalDue}</b>
                                  </p>
                              </Col>

                              <Col lg={10} sm={24}>
                                  <p>
                                      Transaction ID:{" "}
                                      <b>{booking.transactionID}</b>
                                  </p>

                                  <p>
                                      From:{" "}
                                      <b>{booking.bookedTimeSlots.from}</b>
                                  </p>
                                  <p>
                                      To: <b>{booking.bookedTimeSlots.to}</b>
                                  </p>
                                  <p>
                                      Date of booking:{" "}
                                      <b>
                                          {moment(booking.createdAt).format(
                                              "MMM DD yyyy"
                                          )}
                                      </b>
                                  </p>
                              </Col>

                              <Col lg={7} sm={24} className="text-center">
                                  <img
                                      style={{ borderRadius: "5px" }}
                                      src={booking.car.image}
                                      alt={booking.car.name}
                                      className="p-2"
                                      height={140}
                                  />
                              </Col>
                          </Row>
                      </>
                  ))
                : null}

            {/* users */}
            <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
                All Users
            </h2>
            {!loading && users.length > 0
                ? users?.map((user) => (
                      <Row className="bs1 mt-2 text-left d-flex align-items-center justify-content-between">
                          <Col lg={7} sm={24}>
                              <p>
                                  <b>{user._id}</b>
                              </p>
                          </Col>

                          <Col lg={10} sm={24}>
                              <p>{user.username}</p>
                          </Col>

                          <Col lg={7} sm={24} className="text-center">
                              <p>{user.email}</p>
                          </Col>
                      </Row>
                  ))
                : null}

            {!loading && error ? (
                <h1 className="error-msg">Error: {error}</h1>
            ) : null}
        </DefaultLayout>
    );
};
export default AdminHome;
