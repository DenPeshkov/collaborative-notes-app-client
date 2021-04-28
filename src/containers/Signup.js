import React from 'react';
import {Button, Form, Input} from 'antd';
import "./Signup.css"
import {useHistory} from "react-router-dom";
import {useAppContext} from "../libs/contextLib";
import {fetchRequest} from "../libs/fetchRequest";

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
  const {setIsAuthenticated} = useAppContext();
  const history = useHistory();
  const url = 'http://localhost:8762/authentication-service'

  const [form] = Form.useForm();

  async function handleSubmit(values) {
    try {
      await fetchRequest(`${url}/signup`, values, 'POST');

      let jwt = await (await fetchRequest(`${url}/login`, values,
          'POST')).json();

      console.log(jwt)

      setIsAuthenticated(true);

      localStorage.setItem("jwt", jwt.jwtToken);

      history.push("/")
    } catch (exception) {
      console.log("exception " + exception)
      history.push("/error", {
        status: exception.status,
        exception: exception.exception
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