const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');


const createUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const users = await User.create({ name, email, password });

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },

    });

  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {

    const users = await User.findAll({
      where: { status: 'active' },
      include: [Task],
    });

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },

    });

  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {

    const { user } = req;

    const { name, email } = req.body;

    await user.update({ name, email });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },

    });

  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {

    const { user } = req;

    await user.update({ status: 'disable' });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },

    });
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
};
