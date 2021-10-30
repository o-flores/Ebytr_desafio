const service = require('../services/task');

const create = async (req, res) => {
  const {
    name,
    description,
    createdAt,
    status,
    updatedAt,
  } = req.body;

  const data = {
    name, description, createdAt, status, updatedAt,
  };
  await service.create(data);
  res.status(200).json(data);
};

const getAll = async (_req, res) => {
  const response = await service.getAll();
  res.status(200).json(response);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const response = await service.getById(id);

  if (response.code) return next(response);

  return res.status(200).json(response);
};

const update = async (req, res, next) => {
  const {
    name,
    description,
    createdAt,
    status,
    updatedAt,
  } = req.body;

  const { id } = req.params;

  const data = {
    name,
    description,
    createdAt,
    status,
    updatedAt,
    id,
  };
  const response = await service.update(data);

  if (response.code) return next(response);
  return res.status(200).json(response);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const response = await service.deleteById(id);

  if (response.code) return next(response);

  return res.status(200).json(response);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
