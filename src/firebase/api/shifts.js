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

export const getShifts = () => {
  console.log('Reading /shifts');
  return db
    .collection('/env')
    .doc(process.env.REACT_APP_ENV)
    .collection('/shifts')
    .where('end', '>=', new Date(Date.now()))
    .orderBy('end', 'asc')
    .get()
    .then((res) =>
      res.docs.map((doc) => {
        return { id: doc.id, key: doc.id, ...doc.data() };
      })
    );
};
