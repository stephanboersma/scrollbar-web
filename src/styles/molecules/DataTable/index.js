import { Table } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const DataTable = ({ data, columns, selectedRowKeys, onSelectChange }) => {
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
  );
};

DataTable.propTypes = {
  data: PropTypes.any,
  columns: PropTypes.any,
  selectedRowKeys: PropTypes.any,
  onSelectChange: PropTypes.func,
};

export default DataTable;
