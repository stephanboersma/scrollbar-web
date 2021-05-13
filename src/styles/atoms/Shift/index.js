import { AutoComplete, Divider, message, Space } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import TendersContext from '../../../contexts/TendersContext';
import TenderAvatar from '../Avatar';
import { Text, Title } from '../Typography';

const Shift = ({
  shift,
  engagements,
  manage,
  users,
  onAddEngagement,
  onRemoveEngagement,
  takeShift,
  onSetUpForGrabs,
}) => {
  const [tenderSearchValue, setTenderSearchValue] = useState();
  const [anchorSearchValue, setAnchorSearchValue] = useState();
  const [anchorEngagements, setAnchorEngagements] = useState([]);
  const [tenderEngagements, setTenderEngagements] = useState([]);
  const { tenderState } = useContext(TendersContext);
  const [anchors, setAnchors] = useState([]);
  const [tenders, setTenders] = useState([]);

  const setUpOptions = () => {
    setAnchors(
      users
        .filter((user) => user.roles.includes('anchor'))
        .map((user) => ({ label: user.displayName, value: user.id }))
    );
    setTenders(
      users
        .filter(
          (user) =>
            user.roles.includes('tender') ||
            user.roles.includes('anchor') ||
            user.roles.includes('board')
        )
        .map((user) => ({ label: user.displayName, value: user.id }))
    );
  };

  const onTakeShift = (engagement, user) => {
    if (
      [...tenderEngagements, ...anchorEngagements].some(
        (engagement) => engagement.userId === user.id
      )
    ) {
      message.error('You are already on this shift.');
    } else {
      if (engagement.type === 'anchor' && !user.roles.includes('anchor')) {
        message.error('You do not have anchor permissions');
      } else {
        takeShift(engagement, user.id);
      }
    }
  };

  const createEngagement = (type, userId) => {
    if (
      [...tenderEngagements, ...anchorEngagements].some(
        (engagement) => engagement.userId === userId
      )
    ) {
      message.error('This tender is already assigned this shift');
    } else {
      const newEngagement = {
        type: type,
        userId: userId,
        shiftId: shift.id,
        upForGrabs: false,
        shiftEnd: shift.end,
      };
      onAddEngagement(newEngagement);
    }
  };
  useEffect(() => {
    console.log('Shift render');
    setUpOptions();
    setTenderEngagements(
      engagements.filter(
        (engagement) =>
          engagement.type === 'tender' && engagement.shiftId === shift.id
      )
    );
    setAnchorEngagements(
      engagements.filter(
        (engagement) =>
          engagement.type === 'anchor' && engagement.shiftId === shift.id
      )
    );
  }, [engagements]);

  const getTender = (userId) => {
    return tenderState.tenders.filter((_tender) => _tender.id === userId)[0];
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Divider orientation="left">
        {shift.title} in {shift.location}
      </Divider>
      <Space direction="horizontal">
        <Text>Shift start at: </Text>
        <Text type="secondary">
          {moment(shift.start.toDate()).format('DD-MM-YYYY HH:mm').toString()}
        </Text>
        <Text>Shift end at: </Text>
        <Text type="secondary">
          {moment(shift.end.toDate()).format('DD-MM-YYYY HH:mm').toString()}
        </Text>
      </Space>
      <Title level={5} style={{ marginTop: '12px' }}>
        Anchors
      </Title>
      {manage && (
        <Space>
          <AutoComplete
            value={anchorSearchValue}
            options={anchors}
            style={{ width: 200 }}
            defaultActiveFirstOption
            onSelect={(selectedTender) => {
              createEngagement('anchor', selectedTender);
              setAnchorSearchValue('');
            }}
            onSearch={setAnchorSearchValue}
            placeholder="Add Anchors"
          />
        </Space>
      )}
      <Space direction="horizontal" wrap>
        {anchorEngagements.length > 0 ? (
          anchorEngagements.map((anchorEngagement, i) => (
            <TenderAvatar
              manage={manage}
              onClick={() =>
                manage ? onRemoveEngagement(anchorEngagement) : null
              }
              tender={getTender(anchorEngagement.userId)}
              takeShift={(user) => onTakeShift(anchorEngagement, user)}
              setUpForGrabs={(status) => {
                console.log('Up for grabs Shift');

                onSetUpForGrabs(anchorEngagement, status);
              }}
              key={i}
              isUpForGrabs={anchorEngagement.upForGrabs}
            />
          ))
        ) : (
          <Text type="secondary">
            No Anchors have been assigned this shift yet
          </Text>
        )}
      </Space>
      <Title level={5} style={{ marginTop: '12px' }}>
        Tenders
      </Title>
      {manage && (
        <Space>
          <AutoComplete
            value={tenderSearchValue}
            options={tenders}
            style={{ width: 200 }}
            defaultActiveFirstOption
            onSelect={(selectedTender) => {
              createEngagement('tender', selectedTender);
              setTenderSearchValue('');
            }}
            onSearch={setTenderSearchValue}
            placeholder="Add Tenders"
          />
        </Space>
      )}
      <Space direction="horizontal" wrap>
        {tenderEngagements.length > 0 ? (
          tenderEngagements.map((tenderEngagement, i) => (
            <TenderAvatar
              manage={manage}
              onClick={() =>
                manage ? onRemoveEngagement(tenderEngagement) : null
              }
              tender={getTender(tenderEngagement.userId)}
              key={i}
              takeShift={(user) => onTakeShift(tenderEngagement, user)}
              setUpForGrabs={(status) => {
                console.log('Up for grabs Shift');
                onSetUpForGrabs(tenderEngagement, status);
              }}
              isUpForGrabs={tenderEngagement.upForGrabs}
            />
          ))
        ) : (
          <Text type="secondary">
            No Tenders have been assigned this shift yet
          </Text>
        )}
      </Space>
    </Space>
  );
};

Shift.propTypes = {
  shift: PropTypes.any,
  engagements: PropTypes.any,
  manage: PropTypes.bool,
  users: PropTypes.any,
  onAddEngagement: PropTypes.func,
  onRemoveEngagement: PropTypes.func,
  takeShift: PropTypes.func,
  onSetUpForGrabs: PropTypes.func,
};

export default Shift;
