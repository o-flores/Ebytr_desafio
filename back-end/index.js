const express = require('express');

const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const controller = require('./controllers/task');
const errorMiddleware = require('./middlewares/error');
const dateFormat = require('./middlewares/dateFormat');
const { createTaskValidation, updateTaskValidation } = require('./middlewares/taskValidation');

const port = 3001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}));
app.use(bodyParser.json());

app.get('/task/lastId', controller.getLastId);
app.get('/tasks', controller.getAll);
app.get('/task/:id', controller.getById);
app.post('/task', createTaskValidation, dateFormat, controller.create);
app.put('/task/:id', updateTaskValidation, dateFormat, controller.update);
app.delete('/task/:id', controller.deleteById);

app.use(errorMiddleware);

app.listen(port);

module.exports = app;
