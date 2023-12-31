//Generated by ImportCompleteModelFile
//Generated by GetCompleteModelFile

//Generated by GetModelImports
import {CreationOptional,DataTypes,InferAttributes,InferCreationAttributes,Model,Sequelize} from "sequelize";
import sequelize from "../config/db";
import { Card } from "./CardModel";
import { LockedDeck } from "./LockedDeckModel";

//Generated by GetModelInterface
export default interface LockedDeckCard extends Model<InferAttributes<LockedDeckCard>, InferCreationAttributes<LockedDeckCard>>
{id: CreationOptional<number>;
lockedDeckId: number;
cardId: number}

//Generated by GetModelDefinition
export const LockedDeckCard = sequelize.define<LockedDeckCard>(
"LockedDeckCard",
//Generated by GetModelFieldsDictionary
{
 id: {
  type: DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true,
  field: "id"
 }
 ,
 lockedDeckId: {
  type: DataTypes.INTEGER,
  field: "lockedDeckId"
  ,
  references: //Generated by GetReferencesKeyForModelCreationMigration - references key for model creation
  {
   model: "lockeddecks",
   key: "id",
  },
  onUpdate: "CASCADE",
  onDelete: "CASCADE"
 },
 cardId: {
  type: DataTypes.BIGINT,
  field: "cardId"
  ,
  references: //Generated by GetReferencesKeyForModelCreationMigration - references key for model creation
  {
   model: "marvelduel_card",
   key: "id",
  },
  onUpdate: "CASCADE",
  onDelete: "CASCADE"
 }}
,
//Generated By GetModelOptionDict
{
  name: {singular: "LockedDeckCard",plural:"LockedDeckCards"},
  tableName: "lockeddeckcards",
  timestamps: false
}
);

//Generated by GenerateSyncModel
export const LockedDeckCardSync = async () => {
  try {
    await LockedDeckCard.sync({ alter: true });
    console.log("Locked Deck Card table has been created!");
  } catch (error) {
    console.error(
      `Unable to create ${"Locked Deck Card".toLowerCase()} table:`,
      error
    );
  }
};

//Generated by GenerateModelRelationship
Card.hasMany(LockedDeckCard, {
  foreignKey: "cardId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
LockedDeckCard.belongsTo(Card, {
  foreignKey: "cardId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

//Generated by GenerateModelRelationship
LockedDeck.hasMany(LockedDeckCard, {
  foreignKey: "lockedDeckId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
LockedDeckCard.belongsTo(LockedDeck, {
  foreignKey: "lockedDeckId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
