import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import "./Login.css"
import {Link, useHistory} from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const url = 'http://localhost:8762/authentication-service/login'

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
      history.push("/")
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