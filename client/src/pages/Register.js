import { Row, Col, Form, Input, Spin, message } from "antd";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import { userLogin, userRegister } from "../features/authSlice";

const Register = () => {
    
    const dispatch = useDispatch();

    const { loading, error} = useSelector((store) => store.auth);

    const registerHandler = (data) => {
        dispatch(userRegister(data))

        if (!error) {
            dispatch(userLogin(data))
        }

        // navigate("/login")
        console.log(data);
    };

    return (
        <div className="login">
            {loading && <Spin className="spinner" size="large" />}


            <Row gutter={16}>
                <Col lg={16} className="d-flex align-items-center">
                    <img
                        data-aos="slide-right"
                        data-aos-duration="1500"
                        src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                        alt=""
                    />
                </Col>

                <Col lg={8} className="p-5">
                    <Form
                        layout="vertical"
                        className="login-form p-5"
                        onFinish={registerHandler}
                    >
                        <h1>Register</h1>
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true }]}
                        >
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item
                            name="cpassword"
                            label="Confirm Password"
                            rules={[{ required: true }]}
                        >
                            <Input type="password" />
                        </Form.Item>

                        <button type="button" className="login-btn me-2">
                            <Link to="/">Cancel</Link>
                        </button>

                        <button className="login-btn">Register</button>
                        <p style={{ color: "white" }}>
                            Already have an account?{" "}
                            <Link to="/login">Login</Link> instead
                        </p>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};
export default Register;
