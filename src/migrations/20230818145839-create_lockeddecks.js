//Generated by CreateSequelizeModelCreateMigration - sequelize create model migration
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "lockeddecks",
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
          type: Sequelize.CHAR,
          field: "name",
        },
        slug: {
          type: Sequelize.STRING,
          unique: true,
        },
      },
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("lockeddecks");
  },
};
