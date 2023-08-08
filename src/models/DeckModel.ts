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
import { Hero } from "./HeroModel";

//Generated by GetModelInterface
export default interface Deck
  extends Model<InferAttributes<Deck>, InferCreationAttributes<Deck>> {
  id: CreationOptional<number>;
  name: string;
  slug: CreationOptional<string>;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

//Generated by GetModelDefinition
export const Deck = sequelize.define<Deck>(
  "Deck",
  //Generated by GetModelFieldsDictionary
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      field: "name",
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      field: "createdAt",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      field: "updatedAt",
    },
  },
  //Generated By GetModelOptionDict
  {
    name: { singular: "Deck", plural: "Decks" },
    tableName: "marvelduel_belongsto",
  }
);

//Generated by GetModelHooks
Deck.beforeCreate((Deck: Deck, options) => {
  Deck.slug = slugify(Deck.name, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    replacement: "-",
  });
});

Deck.beforeUpdate((Deck: Deck, options) => {
  Deck.slug = slugify(Deck.name, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    replacement: "-",
  });
});

//Generated by GenerateSyncModel
export const DeckSync = async () => {
  try {
    await Deck.sync({ alter: true });
    console.log("Deck table has been created!");
  } catch (error) {
    console.error(`Unable to create ${"Deck".toLowerCase()} table:`, error);
  }
};

//Generated by GenerateModelRelationship
Deck.belongsTo(Hero, {
  foreignKey: "id",
});
Hero.hasOne(Deck, {
  foreignKey: "id",
});
