import { Button, Divider, Drawer, Tabs } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Paragraph } from '../../../styles/atoms/Typography';
import EventInfo from '../../../styles/molecules/EventInfo';
import SideBarPage from '../../../styles/templates/SideBarPage';

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

const EventManagement = () => {
  const [isEventInfoVisible, setIsEventInfoVisible] = useState(false);

  return (
    <SideBarPage title="Event Management">
      <StyledTabs type="card" defaultActiveKey="1">
        <StyledTabPane tab="Events" key="1">
          <StyledButton
            type="primary"
            onClick={() => setIsEventInfoVisible(true)}
          >
            New event
          </StyledButton>
          <Paragraph>Events table here</Paragraph>
        </StyledTabPane>
      </StyledTabs>
      <Divider />
      <Drawer
        width={600}
        placement="right"
        title="Event"
        onClose={() => setIsEventInfoVisible(false)}
        visible={isEventInfoVisible}
      >
        <EventInfo />
      </Drawer>
    </SideBarPage>
  );
};

/* 
import PropTypes from 'prop-types';
Admin.propTypes = {

} 
*/
export default EventManagement;
