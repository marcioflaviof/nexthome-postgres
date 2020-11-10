"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tb_local", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      local_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "tb_local", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      local_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "td_local_type", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tb_local");
  },
};
