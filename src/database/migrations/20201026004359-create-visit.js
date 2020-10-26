'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('ta_visit', { 
        
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      house_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'tb_house', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'tb_user', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      day_hour_visit:{
        type: Sequelize.DATE,
        allowNull: false
      },

      is_confirmed:{
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('ta_available');
  }
};
