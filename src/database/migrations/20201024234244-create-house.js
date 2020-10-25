'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('tb_house', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },

        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'tb_user', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },

        land_size: {
          type: Sequelize.STRING(30),
          allowNull: false
        },

        price: {
          type: Sequelize.FLOAT,
          allowNull: false
        },

        address: {
          type: Sequelize.STRING(1000),
          allowNull: false
        },

        description: {
          type: Sequelize.STRING(1000),
          allowNull: true
        },

        number_bedroom: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        number_bath: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        to_sell: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
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

      await queryInterface.dropTable('tb_house');

  }
};
