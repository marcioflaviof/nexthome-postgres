'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('tb_user', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },

        name: {
          type: Sequelize.STRING(50),
          allowNull: false
        },

        email: {
          type: Sequelize.STRING(50),
          allowNull: false
        },

        password: {
          type: Sequelize.STRING,
          allowNull: false
        },

        cpf: {
          type: Sequelize.STRING(12),
          allowNull: true
        },

        cellphone: {
          type: Sequelize.STRING(20),
          allowNull: false
        },

        address: {
          type: Sequelize.STRING(1000),
          allowNull: false
        },

        is_deleted: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },

        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },

        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      
      });

  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.dropTable('tb_user');

  }
};
