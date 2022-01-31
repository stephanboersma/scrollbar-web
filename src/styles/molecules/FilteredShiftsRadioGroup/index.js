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
  const styles = {
    radioGroup: {
      marginBottom: 8,
      boxSizing: 'border-box',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },

    button: {
      display: 'inline-block',
      textAlign: 'center',
      width: '100%',
      height: 'inherit',
      color: 'black',
      lineHeight: '21px',
      paddingTop: '5px',
      paddingBottom: '5px',
    },
  };

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
      numberOfLines={1}
      adjustsFontSizeToFit
      style={styles.radioGroup}
    >
      <Radio.Button style={styles.button} value="all">
        All shifts <br /> ({getTotalAmount()})
      </Radio.Button>
      <Radio.Button
        numberOfLines={1}
        adjustsFontSizeToFit
        style={styles.button}
        value="myShifts"
      >
        My shifts <br /> ({getMyShiftAmount()})
      </Radio.Button>
      <Radio.Button style={styles.button} value="upforgrabs">
        Up for grabs <br /> ({getUpForGrabsAmount()})
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
