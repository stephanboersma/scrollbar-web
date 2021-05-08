import { Divider, Space } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import Shift from '../../atoms/Shift';
import { Text, Title } from '../../atoms/Typography';
const EventListItem = ({
  event,
  shifts,
  engagements,
  manage,
  users,
  onAddEngagement,
  onRemoveEngagement,
  setUpForGrabs,
  onTakeShift,
}) => {
  useEffect(() => console.log('EventListRender render'));
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={3}>
        {event.displayName} -{' '}
        {moment(event.start.toDate()).format('DD/MM').toString()}
      </Title>
      <Space direction="horizontal">
        <Text>Open: </Text>
        <Text type="secondary">
          {moment(event.start.toDate()).format('DD-MM-YYYY HH:mm').toString()}
        </Text>
        <Text>Close: </Text>
        <Text type="secondary">
          {moment(event.end.toDate()).format('DD-MM-YYYY HH:mm').toString()}
        </Text>
      </Space>
      {shifts.map((each, i) => {
        return (
          <Shift
            shift={each}
            engagements={engagements}
            key={i}
            manage={manage}
            users={users}
            onAddEngagement={(newEngagement) => {
              onAddEngagement({ ...newEngagement, eventId: event.id });
            }}
            onRemoveEngagement={onRemoveEngagement}
            onSetUpForGrabs={(engagement, userId) => {
              console.log('Up for grabs EventListItem');

              setUpForGrabs(engagement, userId);
            }}
            takeShift={onTakeShift}
          />
        );
      })}

      <Divider />
    </Space>
  );
};

EventListItem.propTypes = {
  event: PropTypes.any,
  shifts: PropTypes.any,
  engagements: PropTypes.any,
  manage: PropTypes.bool,
  users: PropTypes.any,
  onAddEngagement: PropTypes.func,
  onRemoveEngagement: PropTypes.func,
  setUpForGrabs: PropTypes.func,
  onTakeShift: PropTypes.func,
};

export default EventListItem;
