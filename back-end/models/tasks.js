const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const DB_COLLECTION = 'tasks';

const create = async (data) => {
  const db = await getConnection();
  const { insertedId: id } = await db.collection(DB_COLLECTION).insertOne(data);
  return {
    id,
    ...data,
  };
};

const getAll = async () => {
  const db = await getConnection();
  const tasks = await db.collection(DB_COLLECTION).find({});
  return tasks;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await getConnection();
  const task = await db.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) });

  if (!task) return false;

  return task;
};

const update = async (data) => {
  const { id, ...newValues } = data;
  if (!ObjectId.isValid(id)) return false;

  const db = await getConnection();
  const { value } = await db.collection(DB_COLLECTION).findOndeAndUpdate(
    { _id: ObjectId(id) },
    { $set: { ...newValues } },
    { returnDocument: 'after' },
  );
  return value;
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await getConnection();
  const { value } = await db.collection('products').findOneAndDelete({ _id: ObjectId(id) });

  return value;
};

module.export = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
