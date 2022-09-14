const { User } = require('../models/user.model');

const userExists = async (req, res, next) => {
  try {

    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'user no found',
      });
    }

    req.user = user;
    next();

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userExists,
};
