import { db } from '../index';
export const getCollection = (path, useEnv) => {
  const reference = useEnv
    ? db.collection('/env').doc(process.env.REACT_APP_ENV).collection(path)
    : db.collection(path);
  return reference.get().then((res) =>
    res.docs.map((doc) => {
      return { id: doc.id, key: doc.id, ...doc.data() };
    })
  );
};

export const getDocument = (collection, id, useEnv) => {
  const reference = useEnv
    ? db
        .collection('/env')
        .doc(process.env.REACT_APP_ENV)
        .collection(collection)
        .doc(id)
    : db.collection(collection).doc(id);
  return reference.get().then((doc) => {
    return { id: doc.id, key: doc.id, ...doc.data() };
  });
};
export const getExtension = (path) => {
  const basename = path.split(/[\\/]/).pop();
  const pos = basename.lastIndexOf('.');
  if (basename === '' || pos < 1) return '';
  return basename.slice(pos + 1);
};
