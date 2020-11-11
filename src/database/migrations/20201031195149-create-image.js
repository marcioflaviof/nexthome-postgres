"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("ta_picture", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },

            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: { model: "tb_user", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },

            house_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: { model: "tb_house", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            size: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },

            key: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            url: {
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
        await queryInterface.dropTable("ta_picture");
    },
};
