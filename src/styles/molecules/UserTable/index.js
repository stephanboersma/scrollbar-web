import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Table } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Link } from '../../atoms/Typography';

const UserTable = ({ users, invited, onUserEdit, onInviteDelete }) => {
  const COLUMNS = [
    {
      title: 'Name',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: 'Studyline',
      dataIndex: 'studyline',
      key: 'studyline',
      render: (studyline) => studyline.abbreviation.toUpperCase(),
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
        } else {
          return 'Closed Account';
        }
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (user) => (
        <Link onClick={() => onUserEdit(user)} style={{ color: '#171717' }}>
          <EditOutlined />
        </Link>
      ),
    },
  ];

  const INVITED_COLUMNS = [
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const getColumns = () => (invited ? INVITED_COLUMNS : COLUMNS);
  return (
    <Table
      rowSelection={rowSelection}
      columns={getColumns()}
      dataSource={users}
    />
  );
};

UserTable.propTypes = {
  users: PropTypes.any,
  invited: PropTypes.bool,
  onUserEdit: PropTypes.func,
  onInviteDelete: PropTypes.func,
};

export default UserTable;
