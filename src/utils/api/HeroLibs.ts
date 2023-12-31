import { HeroFormikShape } from "@/interfaces/HeroInterfaces";
import { Hero } from "@/models/HeroModel";
import { Op } from "sequelize";
import { Transaction } from "sequelize";

//Reusable functions
export const createHero = async (
  hero: Omit<HeroFormikShape, "touched" | "index">,
  t: Transaction
) => {
  return await Hero.create(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      belongsto_id: parseInt(hero.belongsto_id.toString()),
    },
    { transaction: t }
  );
};

export const updateHero = async (
  hero: Omit<HeroFormikShape, "touched" | "index">,
  primaryKey: keyof Omit<HeroFormikShape, "touched" | "index">,
  t: Transaction,
  primaryKeyValue?: string | number
) => {
  await Hero.update(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
    },
    {
      where: { [primaryKey]: primaryKeyValue || hero[primaryKey] },
      transaction: t,
      individualHooks: true,
    }
  );
};

export const deleteHeroes = async (
  primaryKey: keyof Omit<HeroFormikShape, "touched">,
  deletedIds: string[] | number[],
  t: Transaction
) => {
  await Hero.destroy({
    where: { [primaryKey]: { [Op.in]: deletedIds } },
    transaction: t,
  });
};
