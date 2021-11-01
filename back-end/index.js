const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const controller = require('./controllers/task');
const errorMiddleware = require('./middlewares/error');
const taskValidation = require('./middlewares/taskValidation');

const port = 3000;

app.use(bodyParser.json());

app.get('/tasks', controller.getAll);
app.get('/task/:id', controller.getById);
app.post('/task', taskValidation, controller.create);
app.put('/task/:id', controller.update);
app.delete('/task/:id', controller.deleteById);

app.use(errorMiddleware);

app.listen(port);
