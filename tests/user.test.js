const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../server');
const User = require('../models/user.model');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

describe('User API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    token = generateToken('testUserId');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/worko/createuser')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'test@test.com',
        name: 'Test User',
        age: 25,
        city: 'Test City',
        zipCode: '12345',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    userId = res.body._id;
  });

  it('should get a list of users', async () => {
    const res = await request(app)
      .get('/worko/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a user by ID', async () => {
    const user = new User({
      email: 'test@test.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
    });
    await user.save();
    const res = await request(app)
      .get(`/worko/user/${user._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', user._id.toString());
  });

  it('should update a user by ID', async () => {
    const user = new User({
      email: 'test@test.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
    });
    await user.save();
    const res = await request(app)
      .put(`/worko/user/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'updated@test.com',
        name: 'Updated User',
        age: 26,
        city: 'Updated City',
        zipCode: '54321',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'updated@test.com');
  });

  it('should partially update a user by ID', async () => {
    const user = new User({
      email: 'test@test.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
    });
    await user.save();
    const res = await request(app)
      .patch(`/worko/user/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Partially Updated User',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Partially Updated User');
  });

  it('should soft delete a user by ID', async () => {
    const user = new User({
      email: 'test@test.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
    });
    await user.save();
    const res = await request(app)
      .delete(`/worko/user/${user._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    const deletedUser = await User.findById(user._id);
    expect(deletedUser.isDeleted).toBe(true);
  });

  it('should validate email field', async () => {
    const res = await request(app)
      .post('/worko/createuser')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'invalid-email',
        name: 'Test User',
        age: 25,
        city: 'Test City',
        zipCode: '12345',
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should validate zip code field', async () => {
    const res = await request(app)
      .post('/worko/createuser')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'test@test.com',
        name: 'Test User',
        age: 25,
        city: 'Test City',
        zipCode: '',
      });
    expect(res.statusCode).toEqual(400);
  });
});
