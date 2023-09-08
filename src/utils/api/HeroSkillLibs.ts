//Generated by WriteToModellibs_ts - ModelLibs.ts
import { HeroSkillFormikShape } from "@/interfaces/HeroSkillInterfaces";
import { HeroSkill } from "@/models/HeroSkillModel";
import { Op } from "sequelize";
import { Transaction } from "sequelize";

//Reusable functions
export const createHeroSkill = async (
  heroSkill: Omit<HeroSkillFormikShape, "touched" | "index" | "id">,
  t: Transaction
) => {
  return await HeroSkill.create(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      name: heroSkill.name!,
      type: heroSkill.type!,
      cost: heroSkill.cost ? parseInt(heroSkill.cost as string) : null,
      description: heroSkill.description!,
      heroId: parseInt(heroSkill.heroId as string),
    },
    { transaction: t }
  );
};

export const updateHeroSkill = async (
  heroSkill: Omit<HeroSkillFormikShape, "touched" | "index">,
  primaryKey: keyof Omit<HeroSkillFormikShape, "touched" | "index">,
  t: Transaction,
  primaryKeyValue?: string | number
) => {
  await HeroSkill.update(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      name: heroSkill.name!,
      type: heroSkill.type!,
      cost: heroSkill.cost ? parseInt(heroSkill.cost as string) : null,
      description: heroSkill.description!,
      heroId: parseInt(heroSkill.heroId as string),
    },
    {
      where: { [primaryKey]: primaryKeyValue || heroSkill[primaryKey] },
      transaction: t,
      individualHooks: true,
    }
  );
};

export const deleteHeroSkills = async (
  primaryKey: keyof Omit<HeroSkillFormikShape, "touched">,
  deletedIds: string[] | number[],
  t: Transaction
) => {
  await HeroSkill.destroy({
    where: { [primaryKey]: { [Op.in]: deletedIds } },
    transaction: t,
  });
};
