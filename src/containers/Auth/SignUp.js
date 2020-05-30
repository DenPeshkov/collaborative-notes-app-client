import React from "react";
import {Button, Col, Form, Input, Row} from 'antd';
import "./SignUp.css"
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";

const SignUp = () => {
    const history = useHistory();

    const onFinish = () => {
        history.push("/registrationcodeverification");
    };

    return (
        <Row justify="center" align="middle">
            <Col xs={24} sm={13} md={10} lg={8} xl={8}>
                <Form
                    name="normal_sign-up"
                    className="sign-up-form"
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
                        name="mail"
                        rules={[{required: true, message: 'Please input your Mail Address!'}]}
                    >
                        <Input prefix={<MailOutlined classname="site-form-item-icon"/>} placeholder="Mail address"/>
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
                        <Button type="primary" htmlType="submit" className="sign-up-form-button">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default SignUp;