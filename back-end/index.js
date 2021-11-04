const express = require('express');

const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const controller = require('./controllers/task');
const errorMiddleware = require('./middlewares/error');
const { createTaskValidation, updateTaskValidation } = require('./middlewares/taskValidation');

const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/tasks', controller.getAll);
app.get('/task/:id', controller.getById);
app.post('/task', createTaskValidation, controller.create);
app.put('/task/:id', updateTaskValidation, controller.update);
app.delete('/task/:id', controller.deleteById);

app.use(errorMiddleware);

app.listen(port);
