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

//Generated by GetModelInterface
export default interface HeroSkill
  extends Model<
    InferAttributes<HeroSkill>,
    InferCreationAttributes<HeroSkill>
  > {
  id: CreationOptional<number>;
  name: string;
  type: "Active" | "Passive";
  cost?: number | null;
  description: string;
  heroId: number;
}

//Generated by GetModelDefinition
export const HeroSkill = sequelize.define<HeroSkill>(
  "HeroSkill",
  //Generated by GetModelFieldsDictionary
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      field: "name",
    },
    type: {
      type: DataTypes.ENUM("Active", "Passive"),
      field: "type",
    },
    cost: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      field: "cost",
    },
    description: {
      type: DataTypes.TEXT,
      field: "description",
    },
    heroId: {
      type: DataTypes.INTEGER,
      field: "hero_id",
      //Generated by GetReferencesKeyForModelCreationMigration
      references: {
        model: "marvelduel_hero",
        key: "belongsto_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
  },
  //Generated By GetModelOptionDict
  {
    name: { singular: "HeroSkill", plural: "HeroSkills" },
    tableName: "marvelduel_heroskill",
    timestamps: false,
  }
);

//Generated by GenerateSyncModel
export const HeroSkillSync = async () => {
  try {
    await HeroSkill.sync({ alter: true });
    console.log("Hero Skill table has been created!");
  } catch (error) {
    console.error(
      `Unable to create ${"Hero Skill".toLowerCase()} table:`,
      error
    );
  }
};
