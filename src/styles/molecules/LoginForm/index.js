import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Col } from 'react-styled-flexboxgrid';
import styled from 'styled-components';

import { Title } from '../../atoms/Typography';

const Container = styled(Col)`
  background-color: white;
  &:first-child {
    padding: ${({ theme }) => theme.baseUnit * 3}px;
  }
`;

const LoginForm = ({ onSubmit }) => {
  return (
    <Container xs={12} sm={6} md={4} lg={4}>
      <Title level={1}>Login</Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your e-mail!',
              type: 'email',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginForm;
