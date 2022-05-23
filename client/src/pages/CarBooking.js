import { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCars } from "../features/carsSlice";
import { bookACar } from "../features/bookingSlice";

import { Spin, Row, Col, Divider, DatePicker, Checkbox } from "antd";
import { Navigate, useParams } from "react-router-dom";
import moment from "moment"
import StripeCheckout from "react-stripe-checkout";

import DefaultLayout from "../components/DefaultLayout";

import "./CarBooking.css"

const { RangePicker } = DatePicker;

const CarBooking = () => {
    const user = localStorage.getItem("user");
    const [car, setCar] = useState({});

    const [to, setTo] = useState();
    const [from, setFrom] = useState();
    const [totalHours, setTotalHours] = useState(0);

    const [driverNeeded, setDriverNeeded] = useState(false);
    const [totalDue, setTotalDue] = useState(0);
    
    let { carID } = useParams();
    console.log(carID);
    
    const { loading, cars, error } = useSelector((store) => store.cars);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (cars.length === 0) {
            dispatch(fetchAllCars());
            
        } else {
            setCar(cars.find(p => p._id === carID));
            
        }

        // if (cars.length > 0) {
        // }
    }, [dispatch, carID]);

    useEffect(() => {
        // setTotalDue(
        //     !driverNeeded
        //         ? totalHours * car.rentPerHour
        //         : totalDue + 30 * totalHours
        // );

        setTotalDue(totalHours*car.rentPerHour)

        if (driverNeeded) {
            setTotalDue(totalDue + (30 * totalHours));
        }

    }, [totalHours, driverNeeded]);
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    console.log(car);

    const range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    const rangeOfDate = (start, end) => {

        const dates = [];

        let currentDate = start;
        const addDays = function (days) {
            const date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
        while (currentDate <= end) {
            dates.push(currentDate);
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;

        
    }

    let start;
    let end;

    // car.bookedTimeSlots.map((element) => {
    //     start = element.from;
    //     end = element.to;
        
    //     console.log(start, end);
        
    //     const dates = rangeOfDate(new Date(start), new Date(end));
        
    //     dates.forEach((date) => {
    //         console.log(date);
    //     })
    // });
    
    const selectTimeSlots = (values) => {
        console.log(moment(values[0]).format("MMM DD yyy HH:mm"));
        console.log(moment(values[1]).format("MMM DD yyy HH:mm"));

        setFrom(moment(values[0]).format("MMM DD yyy HH:mm"));

        setTo(moment(values[1]).format("MMM DD yyy HH:mm"));

        setTotalHours(values[1].diff(values[0], "Hours"));
    }

    const carBookingHandler = () => {
        const reqObj = {
            user: JSON.parse(localStorage.getItem("user"))._id,
            car: car._id,
            totalHours,
            totalDue,
            driverRequired: driverNeeded,
            bookedTimeSlots:{from,to}
        }

        dispatch(bookACar(reqObj))
    }

    const onToken=(token) => {
        console.log(token);
        const reqObj = {
            token,
            user: JSON.parse(localStorage.getItem("user"))._id,
            car: car._id,
            totalHours,
            totalDue,
            driverRequired: driverNeeded,
            bookedTimeSlots: { from, to },
        };

        dispatch(bookACar(reqObj));
    }

    return (
        <DefaultLayout>
            {loading && <Spin className="spinner" size="large" />}
            {!loading && car && (
                <Row
                    justify="center"
                    className="d-flex align-items-center"
                    style={{ minHeight: "90vh" }}
                >
                    <Col lg={10} sm={24} xs={24}>
                        <img
                            src={car.image}
                            alt={car.name}
                            className="car-to-book-img bs1"
                        />
                    </Col>

                    <Col
                        lg={10}
                        sm={24}
                        xs={24}
                        className="text-right"
                        style={{ textAlign: "right" }}
                    >
                        <Divider dashed>Car Info</Divider>

                        <div style={{ textAlign: "right" }}>
                            <p>{car.name}</p>
                            <p>{car.rentPerHour} Rent Per Hour /-</p>
                            <p>Fuel Type: {car.fuelType}</p>
                            <p>Capacity: {car.capacity}</p>
                        </div>

                        <Divider dashed>Time Slots</Divider>

                        <RangePicker
                            showTime={{ format: "HH:mm" }}
                            format="MMM DD yyyy HH:mm"
                            onChange={selectTimeSlots}
                        />

                        {from && to && (
                            <div>
                                <p>
                                    Total Hours: <b>{totalHours}</b>
                                </p>
                                <p>
                                    Rent Per Hour: <b>{car.rentPerHour}</b>
                                </p>

                                <Checkbox
                                    onChange={(e) =>
                                        e.target.checked
                                            ? setDriverNeeded(true)
                                            : setDriverNeeded(false)
                                    }
                                >
                                    Driver Needed
                                </Checkbox>

                                <h2>
                                    Total Due: $<b>{totalDue}</b>
                                </h2>

                                <StripeCheckout
                                    token={onToken}
                                    amount={totalDue * 100}
                                    stripeKey="process.env.REACT_APP_STRIPE_PUBLIC_KEY"
                                >
                                    <button className="booking-btn">
                                        Book Now
                                    </button>
                                </StripeCheckout>
                            </div>
                        )}
                    </Col>
                </Row>
            )}
        </DefaultLayout>
    );
};
export default CarBooking;
