import MDEditor from '@uiw/react-md-editor';
import { Button, Col, Descriptions, Divider, List, Row, Space } from 'antd';
import { DatePicker } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Text, Title } from '../../atoms/Typography';
import EditShift from '../EditShift';

const { Markdown } = MDEditor;
const { RangePicker } = DatePicker;

const EventInfo = ({
  event,
  shifts,
  onAddShift,
  onUpdateShift,
  onDeleteShift,
  updateEvent,
}) => {
  const [description, setDescription] = useState(event.description);
  const [editDescription, setEditDescription] = useState(false);

  const saveDescription = () => {
    setEditDescription(false);
    updateEvent('description', description);
  };

  const saveWhen = (dates, _, range) => {
    if (range.range === 'start') {
      updateEvent('start', dates[0].toDate());
    } else {
      updateEvent('end', dates[1].toDate());
    }
  };

  return (
    <Col>
      <Row>
        <Title
          level={4}
          editable={{
            onChange: (value) => updateEvent('displayName', value),
          }}
        >
          {event.displayName}
        </Title>
      </Row>
      <Row>
        <Descriptions style={{ width: '100%' }} layout="vertical" bordered>
          <Descriptions.Item label="Where" span={3}>
            <Text
              editable={{
                onChange: (value) => updateEvent('where', value),
              }}
            >
              {event.where}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="When" span={3}>
            <RangePicker
              style={{ width: '100%' }}
              value={[moment(event.start.toDate()), moment(event.end.toDate())]}
              showTime={{ format: 'HH:mm' }}
              format="DD-MM-YYYY HH:mm"
              onCalendarChange={saveWhen}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
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
          <Descriptions.Item label="Shifts">
            <Space direction="horizontal" align="center">
              <Button type="primary" onClick={() => onAddShift(null)}>
                Add shift
              </Button>
              <Checkbox
                onChange={(e) => updateEvent('published', e.target.checked)}
                checked={event.published}
              >
                Publish event
              </Checkbox>
            </Space>

            <List
              style={{ marginTop: 12 }}
              bordered
              itemLayout="vertical"
              size="large"
              dataSource={shifts}
              renderItem={(shift) => (
                <EditShift
                  shift={shift}
                  onDeleteShift={onDeleteShift}
                  updateShift={onUpdateShift}
                />
              )}
            />
          </Descriptions.Item>
        </Descriptions>
      </Row>
      <Divider />
    </Col>
  );
};

EventInfo.propTypes = {
  event: PropTypes.any,
  shifts: PropTypes.any,
  updateEvent: PropTypes.func,
  onAddShift: PropTypes.func,
  onUpdateShift: PropTypes.func,
  onDeleteShift: PropTypes.func,
};
export default EventInfo;
