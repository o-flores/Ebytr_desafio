const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({ passError: true });

const bodySchema = Joi.object({
  taskId: Joi.string().required(),
  description: Joi.string().required(),
  createdAt: Joi.date().required(),
  status: Joi.string().required(),
  updatedAt: Joi.date().required(),
  dueDate: Joi.date().required(),
});

module.exports = validator.body(bodySchema);
