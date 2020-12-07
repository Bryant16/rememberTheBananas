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
    use_env_variable: 'postgres://rxhxxqtwkzbkzq:20b89c6cd9a34f01cddaa5da54ae7957203d58ac16ad33278289488266b0eb90@ec2-3-95-124-37.compute-1.amazonaws.com:5432/d4pu9vbel6tqcu',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  }
};
