const userService = require('../services/user.service');
const { validateUser, validateUserId } = require('../validators/user.validator');

const createUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await userService.createUser(req.body);
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { error } = validateUserId(req.params);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await userService.getUserById(req.params.userId);
    if (!user) return res.status(404).send('User not found');

    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { error } = validateUserId(req.params);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await userService.updateUser(req.params.userId, req.body);
    if (!user) return res.status(404).send('User not found');

    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { error } = validateUserId(req.params);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await userService.deleteUser(req.params.userId);
    if (!user) return res.status(404).send('User not found');

    res.send('User soft deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
};
