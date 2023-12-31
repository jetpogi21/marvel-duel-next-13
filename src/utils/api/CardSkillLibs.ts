//Generated by WriteToModellibs_ts - ModelLibs.ts
import { CardSkillFormikShape } from "@/interfaces/CardSkillInterfaces";
import { CardSkill } from "@/models/CardSkillModel";
import { Op } from "sequelize";
import { Transaction } from "sequelize";

//Reusable functions
export const createCardSkill = async (
  cardSkill: Omit<CardSkillFormikShape, "touched" | "index">,
  t: Transaction
) => {
  return await CardSkill.create(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      name: cardSkill.name!,
      description: cardSkill.description!,
    },
    { transaction: t }
  );
};

export const updateCardSkill = async (
  cardSkill: Omit<CardSkillFormikShape, "touched" | "index">,
  primaryKey: keyof Omit<CardSkillFormikShape, "touched" | "index">,
  t: Transaction,
  primaryKeyValue?: string | number
) => {
  await CardSkill.update(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      name: cardSkill.name!,
      description: cardSkill.description!,
    },
    {
      where: { [primaryKey]: primaryKeyValue || cardSkill[primaryKey] },
      transaction: t,
      individualHooks: true,
    }
  );
};

export const deleteCardSkills = async (
  primaryKey: keyof Omit<CardSkillFormikShape, "touched">,
  deletedIds: string[] | number[],
  t: Transaction
) => {
  await CardSkill.destroy({
    where: { [primaryKey]: { [Op.in]: deletedIds } },
    transaction: t,
  });
};
