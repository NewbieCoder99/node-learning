'use strict';

const   crypto  = require('crypto'),
        dotenv  = require('dotenv').config(),
        appKey  = process.env.NODE_APP_KEY;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username : 'admin',
      password : crypto.createHmac('sha256', appKey).update('password').digest('hex'),
      email : 'admin@admin.com'
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
