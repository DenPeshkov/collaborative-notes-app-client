import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import "./Login.css"
import {Link} from "react-router-dom";

export default function Login() {

  const onSubmit = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
      <Form
          name="login"
          className="Login"
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
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