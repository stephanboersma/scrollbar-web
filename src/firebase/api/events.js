import { db } from '..';

export const createEvent = (event) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/events')
    .add(event);
};

export const deleteEvent = (event) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/events')
    .doc(event.id)
    .delete();
};

export const updateEvent = ({ id, field, value }) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/events')
    .doc(id)
    .update({ [field]: value });
};

export const streamEvents = (observer) => {
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/events')
    .orderBy('end', 'asc')
    .onSnapshot(observer);
};
