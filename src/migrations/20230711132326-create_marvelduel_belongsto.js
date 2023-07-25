//Generated by CreateSequelizeModelCreateMigration
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "marvelduel_belongsto",
      //Generated by GenerateFieldsForModelMigration
      //Generated by GetModelFieldsDictionary
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: "id",
        },
        name: {
          type: Sequelize.STRING(50),
          unique: true,
          field: "name",
        },
        slug: {
          type: Sequelize.STRING,
          unique: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          field: "created_at",
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          field: "updated_at",
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("marvelduel_belongsto");
  },
};
