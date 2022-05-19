import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllCars } from "../features/carsSlice";

import { Button, Col, Row, Spin } from "antd";

const Home = () => {
    const { loading, cars, error } = useSelector((store) => store.cars);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCars());
    }, [dispatch]);

    return (
        <DefaultLayout>
            {loading && <Spin className="spinner" size="large" />}

            {!loading && cars.length ? (
                <Row justify="center" gutter={16}>
                    {cars.map((car) => (
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
                                            Book Now
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
