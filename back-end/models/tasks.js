const { getConnection } = require('./connection');

const DB_COLLECTION = 'tasks';

const create = async (data) => {
  const db = await getConnection();
  await db.collection(DB_COLLECTION).insertOne(data);
  return {
    ...data,
  };
};

const getAll = async () => {
  const db = await getConnection();
  const tasks = await db.collection(DB_COLLECTION).find({}, { projection: { _id: 0 } }).toArray();
  return tasks;
};

const getById = async (id) => {
  const db = await getConnection();
  const task = await db.collection(DB_COLLECTION).findOne({ id }, { projection: { _id: 0 } });

  if (!task) return false;

  return task;
};

const update = async (data) => {
  const { id, ...newValues } = data;
  const db = await getConnection();
  const { value } = await db.collection(DB_COLLECTION).findOneAndUpdate(
    { id },
    { $set: { ...newValues } },
    { projection: { _id: 0 } },
    { returnDocument: 'after' },
  );
  return value;
};

const deleteById = async (id) => {
  const db = await getConnection();
  const { value } = await db.collection(DB_COLLECTION).findOneAndDelete({ id });

  return value;
};

const getLastId = async () => {
  const db = await getConnection();
  const id = await db.collection(DB_COLLECTION)
    .find({}, { projection: { id: 1, _id: 0 } }).sort({ id: -1 }).toArray();

  if (id.length === 0) return [{ id: '0' }];

  return id;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
  getLastId,
};
