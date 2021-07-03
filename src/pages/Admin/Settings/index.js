import MDEditor from '@uiw/react-md-editor';
import { Button, Descriptions, message, Row } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useContext, useState } from 'react';

import AuthContext from '../../../contexts/AuthContext';
import { updateSettings } from '../../../firebase/api';
import { Text } from '../../../styles/atoms/Typography';
import SideBarPage from '../../../styles/templates/SideBarPage';

const { Markdown } = MDEditor;

const Settings = () => {
  const { settings } = useContext(AuthContext);
  const [description, setDescription] = useState(settings.joinScrollBarText);
  const [editDescription, setEditDescription] = useState(false);

  const updateSetting = (field, value) => {
    updateSettings(field, value)
      .then(() => message.success(`Link to ${field} was updated`))
      .catch((error) => message.error('An error occurred' + error.message));
  };
  const saveDescription = () => {
    setEditDescription(false);
    updateSetting('joinScrollBarText', description);
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
        <Descriptions.Item label="Join ScrollBar Link" span={3}>
          <Text
            editable={{
              onChange: (value) => updateSetting('joinScrollBarLink', value),
            }}
          >
            {settings.joinScrollBarLink}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Join ScrollBar Title" span={3}>
          <Text
            editable={{
              onChange: (value) => updateSetting('joinScrollBarTitle', value),
            }}
          >
            {settings.joinScrollBarTitle}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Show Join ScrollBar section" span={3}>
          <Checkbox
            onChange={(e) => updateSetting('openForSignups', e.target.checked)}
            checked={settings.openForSignups}
          >
            Open for Sign ups
          </Checkbox>
        </Descriptions.Item>
        <Descriptions.Item label="Join ScrollBar Description" span={3}>
          <Row>
            <Markdown source={description} />
          </Row>
          {editDescription && (
            <MDEditor
              style={{ marginTop: 12 }}
              preview="edit"
              value={description}
              onChange={setDescription}
            />
          )}
          {editDescription ? (
            <Button
              type="primary"
              style={{ marginTop: 12 }}
              onClick={saveDescription}
            >
              Save description
            </Button>
          ) : (
            <Button
              type="primary"
              style={{ marginTop: 12 }}
              onClick={() => setEditDescription(true)}
            >
              Edit description
            </Button>
          )}
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
