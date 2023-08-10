//Generated by ImportCompleteModelFile
//Generated by GetCompleteModelFile

//Generated by GetModelImports
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import sequelize from "../config/db";
import slugify from "slugify";
import { Deck } from "./DeckModel";

//Generated by GetModelInterface
export default interface Card
  extends Model<InferAttributes<Card>, InferCreationAttributes<Card>> {
  id: CreationOptional<number>;
  name: string;
  type: "Character" | "Weapon" | "Power" | "Tactic";
  cost: number;
  battleStyle?: "Support" | "Attack" | "Guardian" | null;
  atk?: number | null;
  shield?: number | null;
  description?: string | null;
  deckId: number;
  slug: CreationOptional<string>;
}

//Generated by GetModelDefinition
export const Card = sequelize.define<Card>(
  "Card",
  //Generated by GetModelFieldsDictionary
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      field: "name",
    },
    type: {
      type: DataTypes.ENUM("Character", "Weapon", "Power", "Tactic"),
      field: "type",
    },
    cost: {
      type: DataTypes.INTEGER.UNSIGNED,
      field: "cost",
    },
    battleStyle: {
      type: DataTypes.ENUM("Support", "Attack", "Guardian"),
      allowNull: true,
      field: "battle_style",
    },
    atk: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      field: "atk",
    },
    shield: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      field: "shield",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "description",
    },
    deckId: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.STRING,
      unique: true,
    },
  },
  //Generated By GetModelOptionDict
  {
    name: { singular: "Card", plural: "Cards" },
    tableName: "marvelduel_card",
    timestamps: false,
  }
);

//Generated by GetModelHooks
Card.beforeCreate((Card: Card, options) => {
  Card.slug = slugify(Card.name, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    replacement: "-",
  });
});

Card.beforeUpdate((Card: Card, options) => {
  Card.slug = slugify(Card.name, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    replacement: "-",
  });
});

//Generated by GenerateSyncModel
export const CardSync = async () => {
  try {
    await Card.sync({ alter: true });
    console.log("Card table has been created!");
  } catch (error) {
    console.error(`Unable to create ${"Card".toLowerCase()} table:`, error);
  }
};

//Generated by GenerateModelRelationship
Deck.hasMany(Card, {
  foreignKey: "deck_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Card.belongsTo(Deck, {
  foreignKey: "deck_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});