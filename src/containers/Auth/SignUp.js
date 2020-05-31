import React from "react";
import {Button, Col, Form, Input, Row, Tooltip} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import "./SignUp.css"

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        md: {
            span: 24,
        },
        lg: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        md: {
            span: 24,
        },
        lg: {
            span: 8,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        md: {
            span: 24,
            offset: 0,
        },
        lg: {
            span: 8,
            offset: 8,
        },
    },
};

const SignUp = () => {
    const [form] = Form.useForm();
    const history = useHistory();

    const onFinish = () => {
        history.push("/");
    };

    return (
        <Row justify="center" align="middle">
            <Col span={24}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="signup"
                    className="signup-form"
                    onFinish={onFinish}
                    scrollToFirstError
                    size="large"
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({getFieldValue}) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="nickname"
                        label={
                            <span>Nickname&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                    <QuestionCircleOutlined/>
                                </Tooltip>
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default SignUp;