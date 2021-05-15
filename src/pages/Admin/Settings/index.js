import { Descriptions, message } from 'antd';
import React, { useContext } from 'react';

import AuthContext from '../../../contexts/AuthContext';
import { updateSettings } from '../../../firebase/api';
import { Text } from '../../../styles/atoms/Typography';
import SideBarPage from '../../../styles/templates/SideBarPage';

const Settings = () => {
  const { settings } = useContext(AuthContext);
  const updateSetting = (field, value) => {
    updateSettings(field, value)
      .then(() => message.success(`Link to ${field} was updated`))
      .catch((error) => message.error('An error occurred' + error.message));
  };

  return (
    <SideBarPage title="Modify settings">
      <Descriptions style={{ width: '100%' }} bordered>
        <Descriptions.Item label="Link to hero image" span={3}>
          <Text
            editable={{
              onChange: (value) => updateSetting('hero', value),
            }}
          >
            {settings.hero}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Link to constitution" span={3}>
          <Text
            editable={{
              onChange: (value) => updateSetting('constitution', value),
            }}
          >
            {settings.constitution}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Link to minutes from last GA" span={3}>
          <Text
            editable={{
              onChange: (value) => updateSetting('minutes', value),
            }}
          >
            {settings.minutes}
          </Text>
        </Descriptions.Item>
      </Descriptions>
    </SideBarPage>
  );
};

/* 
import PropTypes from 'prop-types';
MembersPortal.propTypes = {

} 
*/
export default Settings;
