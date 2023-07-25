//Generated by CreateSequelizeModelCreateMigration
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "marvelduel_cardskill",
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
          type: Sequelize.STRING,
          unique: true,
          field: "name",
        },
        description: {
          type: Sequelize.TEXT,
          field: "description",
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("marvelduel_cardskill");
  },
};
