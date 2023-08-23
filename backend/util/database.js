const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodecompleted1', 'root', 'Parth@Sagar26', {
  dialect: 'mysql',
  host: 'localhost',
  logging : false
});

module.exports = sequelize;
