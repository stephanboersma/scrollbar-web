import { db } from '..';

export const createShift = (shift) => {
  return db.collection('/shifts').add(shift);
};

export const deleteShift = (shift) => {
  return db.collection('/shifts').doc(shift.id).delete();
};

export const updateShift = ({ id, field, value }) => {
  return db
    .collection('/shifts')
    .doc(id)
    .update({ [field]: value });
};

export const getShifts = () => {
  return db
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
