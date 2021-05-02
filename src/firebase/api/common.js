import { db } from '../index';
export const getCollection = (path) => {
  return db
    .collection(path)
    .get()
    .then((res) =>
      res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
    );
};

export const getDocument = (collection, id) => {
  return db
    .collection(collection)
    .doc(id)
    .get()
    .then((doc) => {
      return { id: doc.id, ...doc.data() };
    });
};
export const getExtension = (path) => {
  const basename = path.split(/[\\/]/).pop();
  const pos = basename.lastIndexOf('.');
  if (basename === '' || pos < 1) return '';
  return basename.slice(pos + 1);
};
