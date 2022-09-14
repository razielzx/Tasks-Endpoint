const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return res.status(400).json({
      status: "error",
      message,
    });
  }
  next();
};

const createUsersValidation = [
  body("name")
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("conte/nt must be at least 3 characters long"),

  body("email")
    .isEmail()
    .withMessage("must be email format")
    .notEmpty()
    .withMessage("email cannot be empty"),

  body("password")
    .isString()
    .withMessage("password must be a string")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("content must be at least 8 characters long"),

  checkValidations,
];
const patchUsersValidation = [
  body("finishDate").notEmpty().withMessage("Date cannot be empty"),

  checkValidations,
];
const validatorString = (req, res, next) => {
  const { status } = req.params;

  const string = status.toLowerCase();
  const valueStatus =["active","completed","late","cancelled"]
  if (valueStatus.includes(string))
    return next();

  return res.status(400).json({
    status: "error",
    message: "wrong text entered",
  });
};

module.exports = {
  createUsersValidation,
  checkValidations,
  validatorString,
  patchUsersValidation,
};
