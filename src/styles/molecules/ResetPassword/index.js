import { UserOutlined } from '@ant-design/icons';
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

const ResetPasswordForm = ({ onSubmit }) => {
  return (
    <Container xs={12} sm={6} md={4} lg={4}>
      <Title level={3}>Reset Password</Title>
      <Form
        name="reset_password"
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Reset
          </Button>
        </Form.Item>
        <Space direction="horizontal">
          <Link href="/login" style={{ color: '#171717' }}>
            Go back to login
          </Link>
        </Space>
      </Form>
    </Container>
  );
};

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ResetPasswordForm;
