import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllCars } from "../features/carsSlice";

import { Col, Row, Spin, DatePicker} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

const { RangePicker } = DatePicker;

const Home = () => {
    const { loading, cars, error } = useSelector((store) => store.cars);
    const dispatch = useDispatch();

    const [availableCars, setAvailableCars] = useState([]);

    useEffect(() => {
        dispatch(fetchAllCars());
    }, [dispatch]);

    useEffect(() => {
        setAvailableCars(cars)
    },[cars])

    const filterCars = (values) => {
        let from = moment(values[0], "MMM DD yyy HH:mm");
        let to = moment(values[1], "MMM DD yyy HH:mm");

        let temp = [];

        for (let car of cars) {
            if (car.bookedTimeSlots.length===0) {
                temp.push(car);
            } else {
                for (let booking of car.bookedTimeSlots) {
                    if (
                        from.isBetween(booking.from, booking.to) ||
                        to.isBetween(booking.from, booking.to) || moment(booking.from).isBetween(from,to) || moment(booking.to).isBetween(from,to)
                    ) {

                    } else {
                        temp.push(car);
                    }
                }
            }
        }

        setAvailableCars(temp)
    }

    return (
        <DefaultLayout>
            <Row className="mt-3" justify="center">
                <Col lg={20} sm={24} className="d-flex justify-content-left">
                    <RangePicker
                        showTime={{ format: "HH:mm" }}
                        format="MMM DD yyyy HH:mm"
                        onChange={filterCars}
                    />
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
                                        <p>{car.rentPerHour} Rent Per Hour/-</p>
                                    </div>

                                    <div>
                                        <button className="booking-btn me-2">
                                            <Link to={`/booking/${car._id}`}>
                                                Book Now
                                            </Link>
                                        </button>
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
export default Home;
