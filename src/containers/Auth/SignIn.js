import React from "react";
import {Button, Col, Form, Input, Row} from 'antd';
import "./SignIn.css"
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const SignIn = () => {
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <Row justify="center" align="middle">
            <Col xs={24} sm={13} md={10} lg={8} xl={8}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: 'Please input your Username!'}]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your Password!'}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Link to="/forgotpassword">Forgot password</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <Link to="/signup">register now!</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default SignIn