var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors, csrfProtection } = require("../utils");
const db = require('../db/models');
const { User } = db;
const { loginUser, logoutUser } = require('../auth');

const validateExistingUser = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please enter a username"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please enter a valid email address"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please enter a password"),
];

const validateNewUser = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please enter a username"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please enter a valid email address"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please enter a password"),
  // TODO: Check confirm password field
]
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Log In', token: req.csrfToken() });
});

router.post('/login', csrfProtection, validateExistingUser, asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: { username },
  });
  if (user !== null) {
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
  };
  if (passwordMatch) {
    loginUser(req, res, user) 
    return res.redirect('/app')
  }
}))

router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'a/A Express Skeleton Home', token: req.csrfToken() });
});
// localhost:8080/users/signup
router.post('/signup', validateNewUser, handleValidationErrors, csrfProtection, asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ username, email, hashedPassword, salt });

  loginUser(req, res, user);
  return res.json({
    user:
    {
      username,
      email,
      password
  }})
}))

module.exports = router;
