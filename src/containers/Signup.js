import React from 'react';
import {Button, Form, Input} from 'antd';
import "./Signup.css"
import {useHistory} from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function Signup() {
  const history = useHistory();
  const url = 'http://localhost:8762/authentication-service/signup'

  const [form] = Form.useForm();

  async function handleSubmit(values) {
    console.log('Received values of form: ', JSON.stringify(values));

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(values)
    });

    if (response.ok) {
      let jwt = await response.json();

      console.log(jwt);
    } else {
      let exception = await response.text();

      history.push("/error", {
        status: response.status,
        exception: exception
      })
    }
  }

  return (
      <Form
          className="Signup"
          {...formItemLayout}
          form={form}
          name="signup"
          onFinish={handleSubmit}
          scrollToFirstError
      >
        <Form.Item
            name="username"
            label="Username"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
                whitespace: true,
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

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
  );
};