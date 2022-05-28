import { Button, Col, Form, Input, Row, Spin } from "antd";
import DefaultLayout from "../components/DefaultLayout";

import {useDispatch, useSelector} from "react-redux"
import { addNewCarAction } from "../features/carsSlice";
import { Navigate, useNavigate } from "react-router-dom";

const AddNewCar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(store => store.cars);

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (!user.data.isAdmin) {
        return <Navigate to="/" replace />;
    }

    const addNewCarHandler = (values) => {
        console.log(values);
        values.bookedTimeSlots = [];

        dispatch(addNewCarAction(values))
    };

    return (
        <DefaultLayout>
            {loading && <Spin className="spinner" size="large" />}
            <Row justify="center mt-2 mb-3">
                <Col lg={12} sm={24}>
                    <Form
                        className="bs1 p-2"
                        layout="vertical"
                        onFinish={addNewCarHandler}
                    >
                        <h1 className="text-center">Add New Car</h1>
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
                            <button onClick={()=>navigate("/admin")} className="cancel me-3">CANCEL</button>
                            
                            <button className="add-new-car">ADD CAR</button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </DefaultLayout>
    );
};
export default AddNewCar;
