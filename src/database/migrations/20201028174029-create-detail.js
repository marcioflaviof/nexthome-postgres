'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('ta_detail', { 
        
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

      type_detail_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'td_type_detail', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      
      number: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('ta_detail');
  }
};
