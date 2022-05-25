import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCarAction, fetchAllCars } from "../features/carsSlice";

import {
    message,
    Popconfirm,
    Col,
    Row,
    Spin,
    DatePicker,
    
} from "antd";


import { EditOutlined, DeleteFilled } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

import "./AdminHome.css"

const { RangePicker } = DatePicker;


const AdminHome = () => {
    const { loading, cars, error } = useSelector((store) => store.cars);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [availableCars, setAvailableCars] = useState([]);

    useEffect(() => {
        dispatch(fetchAllCars());
    }, [dispatch]);

    useEffect(() => {
        setAvailableCars(cars);
    }, [cars]);

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

    const carDeletionHandler = (carID) => {
        
    }

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
                                            title="Are you sure to delete this car?"
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

            {!loading && error ? (
                <h1 className="error-msg">Error: {error}</h1>
            ) : null}
        </DefaultLayout>
    );
};
export default AdminHome;
