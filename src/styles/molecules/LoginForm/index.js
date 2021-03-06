import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Col } from 'react-styled-flexboxgrid';
import styled from 'styled-components';

import { Link, Title } from '../../atoms/Typography';

const Container = styled(Col)`
  background-color: #f0f2f5;
  border-radius: ${({ theme }) => theme.baseUnit / 2}px;
  &:first-child {
    padding: ${({ theme }) => theme.baseUnit * 3}px;
  }
`;

const LoginForm = ({ onSubmit }) => {
  return (
    <Container xs={12} sm={6} md={4} lg={4}>
      <Title level={3}>ScrollBar Tender site</Title>
      <Form name="login" initialValues={{ remember: true }} onFinish={onSubmit}>
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
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Space align="end" direction="horizontal">
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
            <Link style={{ color: '#171717' }} href="/reset-password">
              Forgot password?
            </Link>
          </Space>
        </Form.Item>
      </Form>
    </Container>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginForm;
