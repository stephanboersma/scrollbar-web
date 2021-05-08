import { DeleteOutlined } from '@ant-design/icons';
import { DatePicker, Descriptions, Input, List, Popconfirm, Space } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { Link, Title } from '../../atoms/Typography';

const { RangePicker } = DatePicker;
const EditShift = ({ shift, updateShift, onDeleteShift }) => {
  const updateShiftTime = (dates, _, range) => {
    if (range.range === 'start') {
      updateShift(shift.id, 'start', dates[0].toDate());
    } else {
      updateShift(shift.id, 'end', dates[1].toDate());
    }
  };
  return (
    <List.Item key={shift.id} actions={<DeleteOutlined />}>
      <List.Item.Meta
        title={
          <Space direction="horizontal">
            <Title
              level={4}
              editable={{
                onChange: (value) => updateShift(shift.id, 'title', value),
              }}
            >
              {shift.title}
            </Title>{' '}
            <Title level={4}> in </Title>{' '}
            <Title
              level={4}
              editable={{
                onChange: (value) => updateShift(shift.id, 'location', value),
              }}
            >
              {' '}
              {shift.location}
            </Title>
            <Popconfirm
              title="Are you sure to delete this shift?"
              onConfirm={() => onDeleteShift(shift)}
              okText="Yes"
              cancelText="No"
            >
              <Space>
                <Link style={{ color: '#171717' }}>
                  <DeleteOutlined /> Delete
                </Link>
              </Space>
            </Popconfirm>
          </Space>
        }
      />
      <Descriptions style={{ width: '100%' }} layout="vertical" bordered>
        <Descriptions.Item key="1" label="When" span={4}>
          <RangePicker
            style={{ width: '100%', marginTop: 12 }}
            value={[moment(shift.start.toDate()), moment(shift.end.toDate())]}
            showTime={{ format: 'HH:mm' }}
            format="DD-MM-YYYY HH:mm"
            onCalendarChange={updateShiftTime}
          />
        </Descriptions.Item>
        <Descriptions.Item key="2" label="Anchors" span={4}>
          <Input
            placeholder="How many anchors on this shift?"
            type="number"
            defaultValue={shift.anchors}
            onChange={(e) => updateShift(shift.id, 'anchors', e.target.value)}
            min={0}
          />
        </Descriptions.Item>
        <Descriptions.Item key="3" label="Tenders">
          <Input
            placeholder="How many tenders on this shift?"
            type="number"
            defaultValue={shift.tenders}
            onChange={(e) => updateShift(shift.id, 'tenders', e.target.value)}
            min={0}
          />
        </Descriptions.Item>
      </Descriptions>
    </List.Item>
  );
};

EditShift.propTypes = {
  shift: PropTypes.any,
  eventDates: PropTypes.any,
  updateShift: PropTypes.func,
  onDeleteShift: PropTypes.func,
};
export default EditShift;
