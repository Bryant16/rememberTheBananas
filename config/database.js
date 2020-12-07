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
    use_env_variable: 'postgres://qjrmxilmoqfonu:15d33ffbba900749fd50b7ce4d9b4e52e03a89572569c7d8d5a646205f08964f@ec2-54-84-98-18.compute-1.amazonaws.com:5432/d461oc9905jaf3',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  }
};
