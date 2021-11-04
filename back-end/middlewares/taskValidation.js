const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({ passError: true });

const createTaskSchema = Joi.object({
  id: Joi.string().required(),
  description: Joi.string().required(),
  createdAt: Joi.date().required(),
  status: Joi.string().required(),
  updatedAt: Joi.date().required(),
  dueDate: Joi.date().required(),
});

const updateTaskSchema = Joi.object({
  description: Joi.string().required(),
  createdAt: Joi.date().required(),
  status: Joi.string().required(),
  updatedAt: Joi.date().required(),
  dueDate: Joi.date().required(),
});

const createTaskValidation = validator.body(createTaskSchema);

const updateTaskValidation = validator.body(updateTaskSchema);

module.exports = {
  createTaskValidation,
  updateTaskValidation,
};
