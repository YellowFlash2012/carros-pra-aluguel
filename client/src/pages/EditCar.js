import { Button, Col, Form, Input, Row, Spin } from "antd";
import DefaultLayout from "../components/DefaultLayout";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllCars } from "../features/carsSlice";

const EditCar = ({match}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let carID  = useParams();
    console.log(carID);

    const [carToEdit, setCarToEdit] = useState();
    const [totalCars, setTotalCars] = useState([]);
    
    const { loading, cars } = useSelector((store) => store.cars);
    console.log(cars);

    console.log(cars.find((o) => o._id.ObjectId === carID.ObjectId));

    useEffect(() => {
        if (cars.length === 0) {
            dispatch(fetchAllCars());
        } else {
            setTotalCars(cars)
            setCarToEdit(cars.find((car) => (car._id).str === carID.str));
            console.log(carToEdit);
        }
    }, [cars]);

    const EditCarHandler = (values) => {
        values._id=carToEdit._d
        console.log(values);
    }

    return (
        <DefaultLayout>
            {loading && <Spin className="spinner" size="large" />}
            <Row justify="center mt-2 mb-3">
                <Col lg={12} sm={24}>
                    {totalCars.length>0 && <Form
                        className="bs1 p-2"
                        layout="vertical"
                        initialValues={carToEdit}
                        onFinish={EditCarHandler}
                    >
                        <h1 className="text-center">Edit Car</h1>
                        <Form.Item
                            name="name"
                            label="Car Name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="image"
                            label="Image Url"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="rentPerHour"
                            label="Rent Per Hour"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="capacity"
                            label="Capacity"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="fuelType"
                            label="Fuel Type"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <div className="text-end">
                            <button
                                type="submit"
                                className="cancel me-2"
                                onClick={() => navigate("/admin")}
                            >
                                CANCEL
                            </button>
                            <button className="add-new-car">ADD CAR</button>
                        </div>
                    </Form>}
                </Col>
            </Row>
        </DefaultLayout>
    );
};
export default EditCar;
