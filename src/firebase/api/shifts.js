import { db } from '..';

export const createShift = (shift) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/shifts')
    .add(shift);
};

export const deleteShift = (shift) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/shifts')
    .doc(shift.id)
    .delete();
};

export const updateShift = ({ id, field, value }) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/shifts')
    .doc(id)
    .update({ [field]: value });
};

export const streamShifts = (observer) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/shifts')
    .orderBy('end', 'asc')
    .onSnapshot(observer);
};
