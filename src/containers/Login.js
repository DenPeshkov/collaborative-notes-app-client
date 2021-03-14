import React from "react";
import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import "./Login.css"
import {Link, useHistory} from "react-router-dom";
import {useAppContext} from "../libs/contextLib";
import {post} from "../libs/post";

export default function Login() {
  const {setIsAuthenticated} = useAppContext();
  const history = useHistory();

  const url = 'http://localhost:8762/authentication-service/login'

  async function handleSubmit(values) {
    try {
      let jwt = await (await post(url, values)).json();

      console.log(jwt)

      setIsAuthenticated(true);

      localStorage.setItem("jwt", jwt.jwtToken);

      history.push("/")
    } catch (exception) {
      console.log(exception)

      history.push("/error", {
        status: exception.status,
        exception: exception.exception
      })
    }
  }

  return (
      <Form
          name="login"
          className="Login"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
      >
        <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                 placeholder="Username"/>
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
        >
          <Input
              prefix={<LockOutlined className="site-form-item-icon"/>}
              type="password"
              placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit"
                  className="login-form-button">
            Log in
          </Button>
          <Button key="1" className="register-now-button" type="link">
            <Link to="/signup">
              Register now
            </Link>
          </Button>
        </Form.Item>
      </Form>
  );
};