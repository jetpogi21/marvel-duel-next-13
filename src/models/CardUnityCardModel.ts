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
import { CardUnity } from "./CardUnityModel";
import { Card } from "./CardModel";

//Generated by GetModelInterface
export default interface CardUnityCard
  extends Model<
    InferAttributes<CardUnityCard>,
    InferCreationAttributes<CardUnityCard>
  > {
  id: CreationOptional<number>;
  description: string;
  CardUnityId: number;
  CardId: number;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

//Generated by GetModelDefinition
export const CardUnityCard = sequelize.define<CardUnityCard>(
  "CardUnityCard",
  //Generated by GetModelFieldsDictionary
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    description: {
      type: DataTypes.TEXT,
      field: "description",
    },
    CardUnityId: {
      type: DataTypes.INTEGER,
      field: "CardUnityId",
      //Generated by GetReferencesKeyForModelCreationMigration - references key for model creation
      references: {
        model: "cardunities",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    CardId: {
      type: DataTypes.INTEGER,
      field: "CardId",
      //Generated by GetReferencesKeyForModelCreationMigration - references key for model creation
      references: {
        model: "marvelduel_card",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    name: { singular: "CardUnityCard", plural: "CardUnityCards" },
    tableName: "cardunitycards",
    indexes: [{ unique: true, fields: ["CardUnityId", "CardId"] }],
  }
);

//Generated by GenerateSyncModel
export const CardUnityCardSync = async () => {
  try {
    await CardUnityCard.sync({ alter: true });
    console.log("Card Unity Card table has been created!");
  } catch (error) {
    console.error(
      `Unable to create ${"Card Unity Card".toLowerCase()} table:`,
      error
    );
  }
};

//Generated by GenerateModelRelationship
CardUnity.hasMany(CardUnityCard, {
  foreignKey: "CardUnityId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
CardUnityCard.belongsTo(CardUnity, {
  foreignKey: "CardUnityId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Generated by GenerateModelRelationship
Card.hasMany(CardUnityCard, {
  foreignKey: "CardId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
CardUnityCard.belongsTo(Card, {
  foreignKey: "CardId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
