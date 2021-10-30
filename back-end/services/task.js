const model = require('../models/tasks');

const create = async (data) => {
  const task = await model.create(data);
  return task;
};

const getAll = async () => model.getAll();

const getById = async (id) => {
  const task = await model.getById(id);

  if (!task) return { code: 404, message: 'Task does not exist' };

  return task;
};

const update = async (data) => {
  const updatedTask = await model.update(data);

  if (!updatedTask) return { code: 404, message: 'Task does not exist' };

  return updatedTask;
};

const deleteById = async (id) => {
  const deletedTask = await model.deleteById(id);

  if (!deletedTask) return { code: 404, message: 'Task does not exist' };
  return deletedTask;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
