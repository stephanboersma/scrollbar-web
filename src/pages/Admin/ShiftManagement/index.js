import { Divider } from 'antd';
import React from 'react';

import { Paragraph, Title } from '../../../styles/atoms/Typography';
import SideBarPage from '../../../styles/templates/SideBarPage';

const ShiftManagement = () => {
  return (
    <SideBarPage title="Shift Management">
      <Title level={3}>Shift Management</Title>
      <Paragraph>
        Members should be effortlessly added to the event shifts on this section
      </Paragraph>
      <Divider />
    </SideBarPage>
  );
};

/* 
import PropTypes from 'prop-types';
ShiftManagement.propTypes = {

} 
*/
export default ShiftManagement;
