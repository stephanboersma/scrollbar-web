import { Button, Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Col } from 'react-styled-flexboxgrid';
import styled from 'styled-components';

import { Paragraph, Title } from '../../atoms/Typography';

const Container = styled(Col)`
  background-color: #f0f2f5;
  border-radius: ${({ theme }) => theme.baseUnit / 2}px;
  &:first-child {
    padding: ${({ theme }) => theme.baseUnit * 3}px;
  }
`;

const RegisterForm = ({ onSubmit, loading, studylines }) => {
  return (
    <Container xs={12} sm={6} md={4} lg={4}>
      <Title level={3}>Sign up</Title>
      <Paragraph>
        Your e-mail must be pre-approved before you can sign up
      </Paragraph>
      <Form
        labelCol={{ span: 8 }}
        layout="horizontal"
        name="register"
        onFinish={onSubmit}
      >
        <Form.Item
          name="firstname"
          label="Firstname"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="surname"
          label="Surname"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Studyline"
          name="studyline"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Select options={studylines} />
        </Form.Item>
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
              message: 'This field is required',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
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
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  studylines: PropTypes.any,
};

export default RegisterForm;
