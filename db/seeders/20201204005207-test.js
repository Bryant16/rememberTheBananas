'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Users', [{
        username: 'herokutest',
        email: 'biermannick83@gmail.com',
        hashedPassword: '$2a$10$g8JJcoAdfwIvXlGHOz..uOLzjcIsmRmaiBeG7hVQ593AeEOErahxG',
        salt: '$2a$10$g8JJcoAdfwIvXlGHOz..uO'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Users', null, {});
  }
};
