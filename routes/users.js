var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors, csrfProtection} = require("../utils");
const db = require('../db/models');
const { User } = db;
const { loginUser, logoutUser } = require('../auth');
const { validationResult } = require("express-validator");

const loginValidators = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please enter your username"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
]

const validateNewUser = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please enter a username"),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 255 })
    .withMessage('Email Address must not be more than 255 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject('The provided Email Address is already in use by another account');
        }
      });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),
]
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', csrfProtection, (req, res, next)=> {
  res.render('login', { title: 'Log In', token: req.csrfToken() });
});

router.post('/login', csrfProtection, loginValidators, asyncHandler(async (req, res) => {
  let errors = [];
  const validatorErrors = validationResult(req);
  if (validatorErrors.isEmpty()) {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username },
    });

    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

      if (passwordMatch) {
        loginUser(req, res, user)
        return res.redirect('/app')
      }
    }
    errors.push('Login failed for the provided username and password');

  } else {
    errors = validatorErrors.array().map((error) => error.msg);
    res.render('/login', {
      title: "Login",
      username,
      errors,
      csrfToken: req.csrfToken(),
    })
  }

}))

router.get('/signup', csrfProtection,  (req, res, next)=> {
  res.render('sign-up', { title: 'Sign Up', token: req.csrfToken() });
});
// localhost:8080/users/signup
router.post('/signup', validateNewUser, csrfProtection, asyncHandler(async (req, res) => {
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ username, email, hashedPassword, salt });
    return res.json({
      user:
      {
        username,
        email,
        password
      }
    })
    // res.redirect('/app');
  }else {
    const errors = validatorErrors.array().map((error)=> error.msg);
    res.render('/signup', {
      title: 'Sign up',
      user,
      errors,
      csrfToken: req.csrfToken()
    });
  }


  loginUser(req, res, user);
}))

module.exports = router;
