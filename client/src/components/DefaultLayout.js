import { Menu, Dropdown, Button, Row, Col } from "antd";
import {useNavigate} from "react-router-dom"

const DefaultLayout = (props) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("user")
        navigate("/")
    }

    const menu = (
        <Menu
            items={[
                {
                    label: <a href="/">Home</a>,
                },
                {
                    label: (
                        <a
                            
                            href="/my-bookings"
                        >
                            Bookings
                        </a>
                    ),
                },
                {
                    label: (
                        <a
                            
                            href="/profile"
                        >
                            Profile
                        </a>
                    ),
                },

                {
                    label: (
                        <a href="/" onClick={logoutHandler}>
                            Logout
                        </a>
                    ),
                },
            ]}
        />
    );

    return (
        <div>
            <div className="header bs1">
                <Row gutter={16} justify="center">
                    <Col lg={20} sm={24} xs={24}>
                        <div className="d-flex justify-content-between">
                            <h1
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/")}
                            >
                                DeborahCars
                            </h1>

                            {user ? (
                                <Dropdown overlay={menu} placement="bottom">
                                    <Button>{user.data.username}</Button>
                                </Dropdown>
                            ) : (
                                <button
                                    className="login-btn"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="content mb-5">{props.children}</div>

            <div className="footer text-center">
                <p>&copy; Copyright 2022 DeborahCars - All rights reserved</p>
            </div>
        </div>
    );
};
export default DefaultLayout;
