import {Button, Col, Form, Input, Row, Spin, Steps} from 'antd';
import React, {useState} from "react";
import "./CodeVerification.css"
import {UserOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import FileTextOutlined from "@ant-design/icons/lib/icons/FileTextOutlined";

const {Step} = Steps;

const SendMail = () => {
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <Row justify="center" align="middle">
            <Col xs={24} sm={13} md={10} lg={8} xl={8}>
                <Form
                    name="normal_input-code"
                    className="input-code-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item>
                        Please input your mail address, so we could send you message with code!
                    </Form.Item>
                    <Form.Item
                        name="mail"
                        rules={[{required: true, message: 'Please input your mail address!'}]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Mail"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="input-code-form-button">
                            Send mail
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

const Code = () => {
    const history = useHistory();

    const onFinish = () => {
        history.push("/");
    };

    return (
        <Row justify="center" align="middle">
            <Col xs={24} sm={13} md={10} lg={8} xl={8}>
                <Form
                    name="normal_input-code"
                    className="input-code-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item>
                        Please input your code!
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[{required: true, message: 'Please input your code!'}]}
                    >
                        <Input prefix={<FileTextOutlined className="site-form-item-icon"/>} placeholder="Code"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="input-code-form-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

const CodeVerification = () => {
    const [state, setState] = useState(0);

    let form;

    switch (state) {
        case 0: {
            form = <SendMail/>;
            break;
        }
        case 1 : {
            form = <div className="form-spin"><Spin size="large"/></div>;
            break;
        }
        case 2: {
            form = <Code/>;
            break;
        }
        default: {
            form = <SendMail/>;
            break;
        }
    }

    return (
        <div>
            <Row>
                <Col span="24">
                    <Steps size="small" current={state} onChange={(current) => setState(current)}>
                        <Step title="Mail"/>
                        <Step title="Verification"/>
                        <Step title="Code"/>
                    </Steps>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    {form}
                </Col>
            </Row>
        </div>
    );
}

export default CodeVerification;