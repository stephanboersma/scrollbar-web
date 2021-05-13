import { Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

const InviteModal = ({ visible, onCreate, onCancel }) => {
  const [inviteForm] = useForm();
  const ref = useRef();

  const submit = () => {
    inviteForm
      .validateFields()
      .then((values) => {
        onCreate(values);
        inviteForm.resetFields();
        inviteForm.getFieldInstance('email').focus();
      })
      .catch((info) => {
        message.error('Invite failed: ' + info);
      });
  };
  return (
    <Modal
      visible={visible}
      title="Invite users"
      okText="Invite"
      cancelText="Close"
      onCancel={onCancel}
      onOk={submit}
    >
      <Form form={inviteForm} layout="vertical" name="form_in_modal">
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
          <Input ref={ref} onPressEnter={submit} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

InviteModal.propTypes = {
  visible: PropTypes.bool,
  onCreate: PropTypes.func,
  onCancel: PropTypes.func,
};
export default InviteModal;
