const {
  db: { username,password,database,host }
} = require('./index');

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'postgres://pyrzlabekulxha:ecbab0b11d09d08652bceb3ef3ea3022f4b37a2ec18f67965b0d8dd1d068fe4d@ec2-52-20-66-171.compute-1.amazonaws.com:5432/d6qpgvq5fbjkb6',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  }
};
