import { db } from '..';

export const createEvent = (event) => {
  return db.collection('/events').add(event);
};

export const updateEvent = ({ id, field, value }) => {
  return db
    .collection('/events')
    .doc(id)
    .update({ [field]: value });
};

export const addShift = (shift) => {
  return db.collection('/shifts').add(shift);
};

export const updateShift = ({ id, field, value }) => {
  return db
    .collection('/shifts')
    .doc(id)
    .update({ [field]: value });
};
