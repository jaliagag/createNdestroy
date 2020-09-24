'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Products' // name of Source model
      ,'CategoryId' // name of the key we are adding
      ,{
        type: Sequelize.INTEGER
        ,references: {
          model: 'Categories' // name of Target model
          ,key: 'id' // key in Targe model that we are referencing
        }
        ,onUpdate: 'CASCADE'
        ,onDelete: 'SET NULL'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Products'
      ,'CategoryId'
    )
  }
};
