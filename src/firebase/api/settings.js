import { db } from '..';

export const streamSettings = (observer) => {
  return db.collection('/settings').doc('settings').onSnapshot(observer);
};

export const updateSettings = (field, value) => {
  return db
    .collection('/settings')
    .doc('settings')
    .update({ [field]: value });
};
