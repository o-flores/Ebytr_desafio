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
  const tasks = await db.collection(DB_COLLECTION).find({}).toArray();
  return tasks;
};

const getById = async (id) => {
  const db = await getConnection();
  const task = await db.collection(DB_COLLECTION).findOne({ taskId: id });

  if (!task) return false;

  return task;
};

const update = async (data) => {
  const { taskId, ...newValues } = data;

  const db = await getConnection();
  const { value } = await db.collection(DB_COLLECTION).findOneAndUpdate(
    { taskId },
    { $set: { ...newValues } },
    { returnDocument: 'after' },
  );
  return value;
};

const deleteById = async (id) => {
  const db = await getConnection();
  const { value } = await db.collection(DB_COLLECTION).findOneAndDelete({ taskId: id });

  return value;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
