//Generated by WriteToModellibs_ts - ModelLibs.ts
import { CardKeywordFormikShape } from "@/interfaces/CardKeywordInterfaces";
import { CardKeyword } from "@/models/CardKeywordModel";
import { Op } from "sequelize";
import { Transaction } from "sequelize";

//Reusable functions
export const createCardKeyword = async (
  cardKeyword: Omit<CardKeywordFormikShape, "touched" | "index" | "id">,
  t: Transaction
) => {
  return await CardKeyword.create(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      name: cardKeyword.name!,
    },
    { transaction: t }
  );
};

export const updateCardKeyword = async (
  cardKeyword: Omit<CardKeywordFormikShape, "touched" | "index">,
  primaryKey: keyof Omit<CardKeywordFormikShape, "touched" | "index">,
  t: Transaction,
  primaryKeyValue?: string | number
) => {
  await CardKeyword.update(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      name: cardKeyword.name!,
    },
    {
      where: { [primaryKey]: primaryKeyValue || cardKeyword[primaryKey] },
      transaction: t,
      individualHooks: true,
    }
  );
};

export const deleteCardKeywords = async (
  primaryKey: keyof Omit<CardKeywordFormikShape, "touched">,
  deletedIds: string[] | number[],
  t: Transaction
) => {
  await CardKeyword.destroy({
    where: { [primaryKey]: { [Op.in]: deletedIds } },
    transaction: t,
  });
};
