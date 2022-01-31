import { Radio } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const FilteredShiftsRadioGroup = ({
  handleModeChange,
  mode,
  userId,
  shifts,
  engagements,
}) => {
  const getTotalAmount = () => {
    return shifts.filter((shift) => shift.end.toDate() >= new Date(Date.now()))
      .length;
  };

  const getMyShiftAmount = () => {
    return engagements.filter(
      (engagement) =>
        engagement.shiftEnd.toDate() >= new Date(Date.now()) &&
        engagement.userId === userId
    ).length;
  };

  const getUpForGrabsAmount = () => {
    return engagements.filter(
      (engagement) =>
        engagement.shiftEnd.toDate() >= new Date(Date.now()) &&
        engagement.upForGrabs === true
    ).length;
  };

  return (
    <Radio.Group
      onChange={handleModeChange}
      value={mode}
      buttonStyle={'solid'}
      style={{
        marginBottom: 8,
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Radio.Button
        style={{ textAlign: 'center', width: '100%', color: 'black' }}
        value="all"
      >
        All shifts ( {getTotalAmount()} )
      </Radio.Button>
      <Radio.Button
        style={{ textAlign: 'center', width: '100%', color: 'black' }}
        value="myShifts"
      >
        My shifts ( {getMyShiftAmount()} )
      </Radio.Button>
      <Radio.Button
        style={{ textAlign: 'center', width: '100%', color: 'black' }}
        value="upforgrabs"
      >
        Up for grabs ( {getUpForGrabsAmount()} )
      </Radio.Button>
    </Radio.Group>
  );
};

FilteredShiftsRadioGroup.propTypes = {
  handleModeChange: PropTypes.func,
  mode: PropTypes.any,
  userId: PropTypes.any,
  shifts: PropTypes.any,
  engagements: PropTypes.any,
};
export default FilteredShiftsRadioGroup;
