"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("tb_feedback", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },

            hosue_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: { model: "tb_house", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },

            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: { model: "tb_user", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },

            score: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            description: {
                type: Sequelize.STRING(1000),
                allowNull: true,
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
        await queryInterface.dropTable("tb_feedback");
    },
};
