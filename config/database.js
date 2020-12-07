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
    use_env_variable: 'postgres://bmvqjykuhbojnn:496bba87547c3adc8473cc45f55076a6afe6893dae4943173af01087293635b8@ec2-54-208-233-243.compute-1.amazonaws.com:5432/d4lo0usn9ef99s',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  }
};
