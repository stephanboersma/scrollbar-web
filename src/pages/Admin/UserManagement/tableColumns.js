import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import React from 'react';

import { Link } from '../../../styles/atoms/Typography';

export const INVITED_COLUMNS = (onInviteDelete) => [
  {
    title: 'Email',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Has registered',
    dataIndex: 'registered',
    key: 'registered',
    render: (registered) => (registered ? 'Yes' : 'No'),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (row) => (
      <Popconfirm
        title="Are you sure to delete this invite?"
        onConfirm={() => onInviteDelete(row)}
        okText="Yes"
        cancelText="No"
      >
        <DeleteOutlined />
      </Popconfirm>
    ),
  },
];

export const USER_COLUMNS = (onUserEdit, studylines) => [
  {
    title: 'Name',
    dataIndex: 'displayName',
    key: 'displayName',
  },
  {
    title: 'Studyline',
    dataIndex: 'studyline',
    key: 'studyline',
    render: (studyline) => {
      return studylines.length > 0
        ? studylines
            .filter((_studyline) => _studyline.id === studyline)[0]
            .abbreviation.toUpperCase()
        : '';
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Role',
    dataIndex: 'roles',
    key: 'roles',
    render: (roles) => {
      if (roles.includes('passive')) {
        return 'Passive member';
      } else if (roles.includes('board')) {
        return 'Board member';
      } else if (roles.includes('anchor')) {
        return 'Anchor';
      } else if (roles.includes('tender')) {
        return 'Tender';
      } else if (roles.includes('newbie')) {
        return 'Newbie';
      } else {
        return 'Closed Account';
      }
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (user) => (
      <Link
        onClick={() => {
          onUserEdit(user);
        }}
        style={{ color: '#171717' }}
      >
        <EditOutlined />
      </Link>
    ),
  },
];
