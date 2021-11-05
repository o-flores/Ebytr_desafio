/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const {
  describe, it, beforeEach, afterEach,
} = require('mocha');

const server = require('../index');
const getConnection = require('./mockConnection');

chai.use(chaiHttp);
const { expect } = chai;

// id,
// description,
// createdAt,
// status,
// updatedAt,
// dueDate,

const DEFAULT_TASK = {
  id: '1',
  description: 'descrição',
  createdAt: '2021-12-30',
  status: 'Não iniciada',
  updatedAt: '2021-12-30',
  dueDate: '2021-12-30',
};

const DEFAULT_TASK_UPDATED = {
  description: 'descrição',
  createdAt: '2021-12-30',
  status: 'Finalizada',
  updatedAt: '2021-12-30',
  dueDate: '2021-12-30',
};

describe('Adiciona novas tarefas', () => {
  beforeEach(async () => {
    const mockDB = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(mockDB);
  });

  afterEach(() => {
    MongoClient.connect.restore();
  });

  it('É possível adicionar novas tarefas', async () => {
    const response = await chai.request(server).post('/task').send(DEFAULT_TASK);

    expect(response).to.have.status(200);
    expect(response).to.be.a('object');
    expect(response.body).to.have.property('id');
    expect(response.body).not.to.have.property('_id');
  });

  it('Não é possível adicionar uma nova tarefa sem id', async () => {
    const { id, ...valuesWithoutId } = DEFAULT_TASK;
    const response = await chai.request(server).post('/task').send(valuesWithoutId);

    expect(response).to.have.status(400);
    expect(response.body.error).to.have.property('message');
    expect(response.body.error.message).to.be.equal('"id" is required');
  });

  it('Não é possível adicionar uma nova tarefa sem descrição', async () => {
    const { description, ...valuesWithoutDescription } = DEFAULT_TASK;
    const response = await chai.request(server).post('/task').send(valuesWithoutDescription);

    expect(response).to.have.status(400);
    expect(response.body.error).to.have.property('message');
    expect(response.body.error.message).to.be.equal('"description" is required');
  });

  it('Não é possível adicionar uma nova tarefa sem status', async () => {
    const { status, ...valuesWithoutStatus } = DEFAULT_TASK;
    const response = await chai.request(server).post('/task').send(valuesWithoutStatus);

    expect(response).to.have.status(400);
    expect(response.body.error).to.have.property('message');
    expect(response.body.error.message).to.be.equal('"status" is required');
  });

  it('Não é possível adicionar uma nova tarefa sem data de criação', async () => {
    const { createdAt, ...valuesWithoutCreatedAt } = DEFAULT_TASK;
    const response = await chai.request(server).post('/task').send(valuesWithoutCreatedAt);

    expect(response).to.have.status(400);
    expect(response.body.error).to.have.property('message');
    expect(response.body.error.message).to.be.equal('"createdAt" is required');
  });

  it('Não é possível adicionar uma nova tarefa sem prazo', async () => {
    const { dueDate, ...valuesWithoutDuedate } = DEFAULT_TASK;
    const response = await chai.request(server).post('/task').send(valuesWithoutDuedate);

    expect(response).to.have.status(400);
    expect(response.body.error).to.have.property('message');
    expect(response.body.error.message).to.be.equal('"dueDate" is required');
  });

  it('Não é possível adicionar uma nova tarefa sem data da ultima alteração', async () => {
    const { updatedAt, ...valuesWithoutUpdatedAt } = DEFAULT_TASK;
    const response = await chai.request(server).post('/task').send(valuesWithoutUpdatedAt);

    expect(response).to.have.status(400);
    expect(response.body.error).to.have.property('message');
    expect(response.body.error.message).to.be.equal('"updatedAt" is required');
  });
});

describe('Atualiza as tarefas', () => {
  beforeEach(async () => {
    const mockDB = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(mockDB);
  });

  afterEach(() => {
    MongoClient.connect.restore();
  });

  it('É possivel atualizar uma tarefa', async () => {
    const { body: { id } } = await chai.request(server).post('/task').send(DEFAULT_TASK);
    const response = await chai.request(server).put(`/task/${id}`).send(DEFAULT_TASK_UPDATED);

    expect(response).to.have.status(200);
    expect(response).to.be.a('object');
    expect(response.body).to.have.property('id');
    expect(response.body.description).to.be.equal(DEFAULT_TASK_UPDATED.description);
  });
});
