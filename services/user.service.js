const userDao = require('../dao/user.dao');

const createUser = async (userData) => {
  return await userDao.createUser(userData);
};

const getUserById = async (userId) => {
  return await userDao.getUserById(userId);
};

const getUsers = async () => {
  return await userDao.getUsers();
};

const updateUser = async (userId, userData) => {
  return await userDao.updateUser(userId, userData);
};

const deleteUser = async (userId) => {
  return await userDao.deleteUser(userId);
};

module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
};
