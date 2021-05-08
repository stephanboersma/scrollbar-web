import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Space } from 'antd';
import moment from 'moment';
import React from 'react';

import { Link } from '../../../styles/atoms/Typography';

export const EVENT_COLUMNS = (onEventEdit, onEventDelete, onDuplicateEvent) => [
  {
    title: 'Event title',
    dataIndex: 'displayName',
    key: 'displayName',
  },
  {
    title: 'Start',
    dataIndex: 'start',
    key: 'start',
    render: (start) => moment(start).format('DD-MM-YYYY HH:mm').toString(),
  },
  {
    title: 'End',
    dataIndex: 'end',
    key: 'end',
    render: (end) => moment(end).format('DD-MM-YYYY HH:mm').toString(),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (event) => (
      <Space direction="horizontal">
        <Link onClick={() => onEventEdit(event)} style={{ color: '#171717' }}>
          <Space>
            <EditOutlined />
            Edit
          </Space>
        </Link>
        <Link
          onClick={() => onDuplicateEvent(event)}
          style={{ color: '#171717' }}
        >
          <Space>
            <CopyOutlined /> Duplicate
          </Space>
        </Link>
        <Popconfirm
          title="Are you sure to delete this event?"
          onConfirm={() => onEventDelete(event)}
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
    ),
  },
];
