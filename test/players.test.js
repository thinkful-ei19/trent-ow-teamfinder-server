'use strict';

const {app} = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { TEST_DATABASE_URL, JWT_SECRET } = require('../config');
process.env.NODE_ENV = 'test';

const {dbConnect, dbDisconnect} = require('../db-mongoose');

const Player = require('../models/player');
const seedPlayers = require('../db/seed/players');

const expect = chai.expect;

chai.use(chaiHttp);

describe('OWTeamFinder API - Players', function () {
  const username = 'exampleUser';
  const password = 'examplePass';
  const skillRating = 3000;
  const roles = ['Tank', 'Support'];
  const heroPool = ['Winston', 'Reinhardt'];
  let testUser;
  let token;

  before(function () {
    return dbConnect(TEST_DATABASE_URL);
  });

  beforeEach(function () {
    return Promise.all([
      Player.insertMany(seedPlayers),
      Player.createIndexes()
    ])
      .then(([users]) => {
        testUser = users[0];
        token = jwt.sign({ testUser }, JWT_SECRET, { subject: testUser.username });
      });
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(function() {
    return dbDisconnect();
  });

  describe('Players API', function () {
    // describe('GET /api/players', function () {
    //   it('should return the correct number of Players', function () {
    //     const dbPromise = Player.find();
    //     console.log(token);
    //     const apiPromise = chai.request(app).get('/api/players').set('Authorization', `Bearer ${token}`);
      
    //     return Promise.all([dbPromise, apiPromise])
    //       .then(([data, res]) => {
    //         expect(res).to.have.status(200);
    //         expect(res).to.be.json;
    //         expect(res.body).to.be.a('array');
    //         expect(res.body).to.have.length(data.length);
    //       });
    //   });
      
    //   it('should return a list with the correct right fields', function () {
    //     const dbPromise = Note.find({userId : user.id});
    //     const apiPromise = chai.request(app).get('/api/notes').set('Authorization', `Bearer ${token}`);
      
    //     return Promise.all([dbPromise, apiPromise])
    //       .then(([data, res]) => {
    //         expect(res).to.have.status(200);
    //         expect(res).to.be.json;
    //         expect(res.body).to.be.a('array');
    //         expect(res.body).to.have.length(data.length);
    //         res.body.forEach(function (item) {
    //           expect(item).to.be.a('object');
    //           expect(item).to.have.keys('id', 'title', 'content', 'created', 'folderId', 'tags', 'userId');
    //         });
    //       });
    //   });
      
    //   it('should return correct search results for a searchTerm query', function () {
    //     const searchTerm = 'addicted';
    //     const re = new RegExp(searchTerm, 'i');
    //     const dbPromise = Note.find({ title: { $regex: re }, userId : user.id});
    //     const apiPromise = chai.request(app).get(`/api/notes?searchTerm=${searchTerm}`).set('Authorization', `Bearer ${token}`);
      
    //     return Promise.all([dbPromise, apiPromise])
    //       .then(([data, res]) => {
    //         expect(res).to.have.status(200);
    //         expect(res).to.be.json;
    //         expect(res.body).to.be.a('array');
    //         expect(res.body).to.have.length(1);
    //         expect(res.body[0]).to.be.an('object');
    //         expect(res.body[0].id).to.equal(data[0].id);
    //       });
    //   });
      
    //   it('should return correct search results for a folderId query', function () {
    //     let data;
    //     return Folder.findOne({userId : user.id})
    //       .then((_data) => {
    //         data = _data;
    //         const dbPromise = Note.find({ folderId: data.id });
    //         const apiPromise = chai.request(app).get(`/api/notes?folderId=${data.id}`).set('Authorization', `Bearer ${token}`);
    //         return Promise.all([dbPromise, apiPromise]);
    //       })
    //       .then(([data, res]) => {
    //         expect(res).to.have.status(200);
    //         expect(res).to.be.json;
    //         expect(res.body).to.be.a('array');
    //         expect(res.body).to.have.length(data.length);
    //       });
    //   });
      
    //   it('should return an empty array for an incorrect query', function () {
    //     const searchTerm = 'NotValid';
    //     const re = new RegExp(searchTerm, 'i');
    //     const dbPromise = Note.find({ title: { $regex: re }, userId: user.id });
    //     const apiPromise = chai.request(app).get(`/api/notes?searchTerm=${searchTerm}`).set('Authorization', `Bearer ${token}`);
      
    //     return Promise.all([dbPromise, apiPromise])
    //       .then(([data, res]) => {
    //         expect(res).to.have.status(200);
    //         expect(res).to.be.json;
    //         expect(res.body).to.be.a('array');
    //         expect(res.body).to.have.length(data.length);
    //       });
    //   });
      
    // });
      
    // describe('GET /api/notes/:id', function () {
      
    //   it('should return correct players', function () {
    //     let data;
    //     return Player.findOne({userId: user.id})
    //       .then(_data => {
    //         data = _data;
    //         return chai.request(app).get(`/api/notes/${data.id}`).set('Authorization', `Bearer ${token}`);
    //       })
    //       .then((res) => {
    //         expect(res).to.have.status(200);
    //         expect(res).to.be.json;
      
    //         expect(res.body).to.be.an('object');
    //         expect(res.body).to.have.keys('id', 'title', 'content', 'created', 'folderId', 'tags', 'userId');
      
    //         expect(res.body.id).to.equal(data.id);
    //         expect(res.body.title).to.equal(data.title);
    //         expect(res.body.content).to.equal(data.content);
    //       });
    //   });
      
    //   it('should respond with a 400 for improperly formatted id', function () {
    //     const badId = '99-99-99';
      
    //     return chai.request(app)
    //       .get(`/api/notes/${badId}`)
    //       .set('Authorization', `Bearer ${token}`)
    //       .catch(err => err.response)
    //       .then(res => {
    //         expect(res).to.have.status(400);
    //         expect(res.body.message).to.eq('The `id` is not valid');
    //       });
    //   });
      
    //   it('should respond with a 404 for an invalid id', function () {
      
    //     return chai.request(app)
    //       .get('/api/notes/AAAAAAAAAAAAAAAAAAAAAAAA')
    //       .set('Authorization', `Bearer ${token}`)
    //       .catch(err => err.response)
    //       .then(res => {
    //         expect(res).to.have.status(404);
    //       });
    //   });
    // });
    describe.only('POST /api/players', function () {
      it('Should create a new player', function () {
        const testUser = { username, password, skillRating, roles, heroPool };

        let res;
        return chai.request(app).post('/api/players').send({players: testUser})
          .then(_res => {
            res = _res;
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys('id', 'username', 'skillRating', 'roles', 'heroPool');

            expect(res.body.id).to.exist;
            expect(res.body.username).to.equal(testUser.username);
            expect(res.body.skillRating).to.equal(testUser.skillRating);
            expect(res.body.roles).to.deep.equal(testUser.roles);
            expect(res.body.heroPool).to.deep.equal(testUser.heroPool);
          });
      });
      it('Should reject players with missing username', function () {
        const testUser = { password };
        return chai.request(app).post('/api/players').send({players: testUser})
          .catch(err => err.response)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('Missing \'username\' in request body');
          });
      });

      it('Should reject players with missing password', function () {
        const testUser = { username };
        return chai.request(app).post('/api/players').send({players: testUser})
          .catch(err => err.response)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('Missing \'password\' in request body');
          });
      });

      it('Should reject players with non-string username', function() {
        const testUser = { username: 5, password };
        return chai.request(app).post('/api/players').send({players: testUser})
          .catch(err => err.response)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('Incorrect field type: expected string');
          });
      });

      it('Should reject players with non-string password', function() {
        const testUser = { username, password: 10 };
        return chai.request(app).post('/api/players').send({players: testUser})
          .catch(err => err.response)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('Incorrect field type: expected string');
          });
      });

      it('Should reject players with non-trimmed username', function () {
        const testUser = { username: ' username', password };
        return chai.request(app).post('/api/players').send({players: testUser})
          .catch(err => err.response)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('username or password cannot start or end with whitespace');
          });
      });

      it('Should reject players with non-trimmed password', function () {
        const testUser = { username, password: ' password' };
        return chai.request(app).post('/api/players').send({players: testUser})
          .catch(err => err.response)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('username or password cannot start or end with whitespace');
          });
      });

      it('Should reject players with duplicate username', function () {
        const testUser = { username, password, skillRating };
        return Player.create(testUser)
          .then(() => {
            return chai.request(app).post('/api/players').send({players: testUser});
          })
          .catch(err => err.response)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('The username already exists');
          });
      });
    });
  });
});