const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers/task');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('task/:id', controller.getById);
app.get('/task', controller.getAll);
app.post('/task', controller.create);
app.put('task/:id', controller.update);
app.delete('task/:id', controller.deleteById);

app.listen(port);
