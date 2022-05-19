import { Row, Col, Form, Input } from "antd"
import { Link } from "react-router-dom";
import "./Login.css"

const Login = () => {
  return (
      <div className="login">
          <Row gutter={16}>
              <Col lg={16} className="d-flex align-items-center">
                  <img
                      src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                      alt=""
                  />
              </Col>

              <Col lg={8} className="p-5">
                  <Form layout="vertical" className="login-form p-5">
                      <h1>Login</h1>
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
                          <Input />
                      </Form.Item>

                      <button className="login-btn">Login</button>

                      <p style={{color:"white"}}>
                          Don't have an account yet?{" "}
                          <Link to="/register">Register</Link> instead
                      </p>
                  </Form>
              </Col>
          </Row>
      </div>
  );
};
export default Login;
