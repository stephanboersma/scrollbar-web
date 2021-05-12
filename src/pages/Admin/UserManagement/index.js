import { Button, Divider, Drawer, message, Tabs } from 'antd';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import AuthContext from '../../../contexts/AuthContext';
import TendersContext from '../../../contexts/TendersContext';
import { deleteInvite, inviteUser, updateUser } from '../../../firebase/api';
import DataTable from '../../../styles/molecules/DataTable';
import InviteModal from '../../../styles/molecules/InviteModal';
import ProfileInfo from '../../../styles/molecules/ProfileInfo';
import SideBarPage from '../../../styles/templates/SideBarPage';
import { INVITED_COLUMNS, USER_COLUMNS } from './tableColumns';

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #171717;
  }
  .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active,
  .ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab-active {
    border: 1px solid #fff319;
    border-bottom-color: #fff;
  }
`;

const StyledTabPane = styled(TabPane)`
  padding: 0 ${({ theme }) => theme.baseUnit}px;
`;
const StyledButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.baseUnit}px;
`;

const UserManagement = () => {
  const { tenderState, fetchInvitedTenders, fetchTenders } = useContext(
    TendersContext
  );
  const { studylines } = useContext(AuthContext);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const onUserEdit = (user) => {
    setSelectedUser(user);
    setIsProfileVisible(true);
  };

  const updateProfile = (field, value) => {
    updateUser({ id: selectedUser.id, field: field, value: value })
      .then(() => {
        fetchTenders();
        if (field === 'studyline') {
          setSelectedUser({
            ...selectedUser,
            studyline: studylines.filter(
              (studyline) => studyline.id === value
            )[0],
          });
        } else {
          setSelectedUser({ ...selectedUser, [field]: value });
        }
      })
      .catch((error) => message.error('An error occurred ' + error.message));
  };

  const addInvite = ({ email }) => {
    if (
      tenderState.invitedTenders.filter((user) => user.key === email).length > 0
    ) {
      message.error(`${email} is already invited`);
    } else {
      inviteUser(email)
        .then(() => {
          message.success(`${email} has been invited.`);
          fetchInvitedTenders();
        })
        .catch((error) => message.error('An error ocurred: ' + error.message));
    }
  };

  const onInviteDelete = (row) => {
    deleteInvite(row)
      .then(() => fetchInvitedTenders())
      .catch((error) => message.error('An error ocurred: ' + error.message));
  };
  return (
    <SideBarPage title="User Management">
      <StyledTabs type="card" defaultActiveKey="1">
        <StyledTabPane tab="Manage users" key="1">
          <DataTable
            columns={USER_COLUMNS(onUserEdit)}
            data={tenderState.tenders}
          />
        </StyledTabPane>
        <StyledTabPane tab="Invited users" key="2">
          <StyledButton
            type="primary"
            onClick={() => setIsInviteModalVisible(true)}
          >
            Invite users
          </StyledButton>
          <DataTable
            data={tenderState.invitedTenders}
            columns={INVITED_COLUMNS(onInviteDelete)}
          />
        </StyledTabPane>
      </StyledTabs>
      <Divider />
      <InviteModal
        visible={isInviteModalVisible}
        onCreate={addInvite}
        onCancel={() => setIsInviteModalVisible(false)}
      />
      <Drawer
        width={600}
        placement="right"
        title="Profile"
        onClose={() => setIsProfileVisible(false)}
        visible={isProfileVisible}
      >
        <ProfileInfo
          user={selectedUser}
          updateProfile={updateProfile}
          studylines={studylines}
          manageUser
        />
      </Drawer>
    </SideBarPage>
  );
};

/* 
import PropTypes from 'prop-types';
UserManagement.propTypes = {

} 
*/
export default UserManagement;
