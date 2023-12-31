//Generated by CreateSequelizeModelCreateMigration - sequelize create model migration
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "marvelduel_card",
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
        type: {
          type: Sequelize.ENUM("Character", "Weapon", "Power", "Tactic"),
          field: "type",
        },
        cost: {
          type: Sequelize.INTEGER.UNSIGNED,
          field: "cost",
        },
        battleStyle: {
          type: Sequelize.ENUM("Support", "Attack", "Guardian"),
          allowNull: true,
          field: "battle_style",
        },
        atk: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
          field: "atk",
        },
        shield: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
          field: "shield",
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
          field: "description",
        },
        deckId: {
          type: Sequelize.INTEGER,
          field: "deck_id",
          //Generated by GetReferencesKeyForModelCreationMigration - references key for model creation
          references: {
            model: "marvelduel_belongsto",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        slug: {
          type: Sequelize.STRING,
          unique: true,
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("marvelduel_card");
  },
};
