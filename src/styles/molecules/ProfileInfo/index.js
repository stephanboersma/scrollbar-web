import {
  Col,
  Descriptions,
  Divider,
  message,
  Radio,
  Row,
  Select,
  Space,
} from 'antd';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import AuthContext from '../../../contexts/AuthContext';
import { Text, Title } from '../../atoms/Typography';
import UploadAvatar from '../../atoms/UploadAvatar';
const { Option, OptGroup } = Select;

const DisplayName = styled(Title)`
  margin-left: ${({ theme }) => theme.baseUnit}px;
`;

const StyledRow = styled(Row)`
  padding: ${({ theme }) => theme.baseUnit}px;
`;

const ProfileInfo = ({ tender, updateProfile, manageUser }) => {
  const [editStudyline, setEditStudyline] = useState(false);
  const { user, studylines } = useContext(AuthContext);
  const getRole = () => {
    const roles = tender.roles;
    if (roles.includes('passive')) {
      return 'Passive member';
    } else if (roles.includes('board')) {
      return 'Board member';
    } else if (roles.includes('anchor')) {
      return 'Anchor';
    } else if (roles.includes('tender')) {
      return 'Tender';
    } else {
      return 'Closed Account';
    }
  };

  const updateRole = (value, deselect) => {
    if (deselect) {
      const newRoles = tender.roles.filter((role) => role !== value);
      updateProfile('roles', newRoles);
    } else {
      const mandatoryRoles = ['passive', 'tender', 'anchor'];
      const newRoles = tender.roles.filter(
        (role) => !mandatoryRoles.includes(role)
      );
      newRoles.push(value);
      updateProfile('roles', newRoles);
    }
  };

  const updateStudyline = (studylineId) => {
    updateProfile('studyline', studylineId);
    setEditStudyline(false);
  };

  const getStudyline = (id) => {
    const index = studylines.findIndex((_studyline) => _studyline.id === id);
    const studyline = studylines[index];
    return `${studyline.prefix} in ${studyline.name}`;
  };

  return (
    <Col>
      <Row align="middle">
        <UploadAvatar
          onUpdatePhoto={(url) => updateProfile('photoUrl', url)}
          tender={tender}
        />

        <DisplayName
          level={4}
          editable={{
            onChange: (value) => updateProfile('displayName', value),
          }}
        >
          {tender.displayName}
        </DisplayName>
      </Row>
      <Divider />
      <StyledRow>
        <Title level={3}>Info</Title>
        <Descriptions style={{ width: '100%' }} bordered>
          <Descriptions.Item label="Studyline" span={3}>
            {editStudyline ? (
              <Select value={tender.studyline} onChange={updateStudyline}>
                {studylines.map((each) => {
                  return (
                    <Option key={each.id} value={each.id}>
                      {each.prefix} in {each.name}
                    </Option>
                  );
                })}
              </Select>
            ) : (
              <Text
                editable={{
                  onStart: () => setEditStudyline(true),
                }}
              >
                {getStudyline(tender.studyline)}
              </Text>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="E-mail" span={3}>
            <Text>{tender.email}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Phone" span={3}>
            <Text
              editable={{
                onChange: (value) => updateProfile('phone', value),
              }}
            >
              {tender.phone ? tender.phone : 'Add phone number please'}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="Role" span={3}>
            {manageUser ? (
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select Roles"
                value={tender.roles}
                onSelect={(value) => updateRole(value, false)}
                onDeselect={(value) => updateRole(value, true)}
              >
                <OptGroup label="Roles">
                  <Option value="tender">Tender</Option>
                  <Option value="anchor">Anchor</Option>
                  <Option value="board">Board member</Option>
                  <Option value="passive">Passive member</Option>
                </OptGroup>
                <OptGroup label="Permissions">
                  <Option value="regular_access">Regular Access</Option>
                  <Option value="tender_manager">User Manager</Option>
                  <Option value="shift_manager">Shift Manager</Option>
                  <Option value="event_manager">Event Manager</Option>
                </OptGroup>
              </Select>
            ) : (
              <Text>{getRole()}</Text>
            )}
          </Descriptions.Item>
          {manageUser && (
            <Descriptions.Item label="Admin" span={3}>
              <Radio.Group
                onChange={(e) => {
                  if (e.target.value === true && user.isAdmin === false) {
                    message.error('Only an existing admin can make you admin');
                  } else {
                    updateProfile('isAdmin', e.target.value);
                  }
                }}
                value={tender.isAdmin}
              >
                <Space direction="vertical">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Space>
              </Radio.Group>
            </Descriptions.Item>
          )}
        </Descriptions>
      </StyledRow>
    </Col>
  );
};
ProfileInfo.propTypes = {
  tender: PropTypes.any,
  updateProfile: PropTypes.func,
  manageUser: PropTypes.bool,
  studylines: PropTypes.any,
};

export default ProfileInfo;
