//Generated by WriteToModelsRouteApiNoForm - models route next 13 no form
import { CardCardKeyword } from "@/models/CardCardKeywordModel";
import { FindOptions, Transaction } from "sequelize";
import { Op } from "sequelize";
import { CardCardKeywordFormikShape } from "@/interfaces/CardCardKeywordInterfaces";

const ModelObject = CardCardKeyword;

//Generated by GeneratefindOptions
const findOptions: FindOptions<typeof CardCardKeyword> = {
  //Generated by GenerateIncludeOption
  include: [],
  //Generated by GenerateAttributesOption
  attributes: [
    //Generated by GetAllModelAttributesBySeqModel
    "id",
    "cardId",
    "cardKeywordId",
  ],
};

//Reusable functions
export const createCardCardKeyword = async (
  cardCardKeyword: Partial<CardCardKeywordFormikShape>,
  t: Transaction
) => {
  return await CardCardKeyword.create(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      cardId: parseInt(cardCardKeyword.cardId as string),
      cardKeywordId: parseInt(cardCardKeyword.cardKeywordId as string),
    },
    { transaction: t }
  );
};

export const updateCardCardKeyword = async (
  cardCardKeyword: Omit<CardCardKeywordFormikShape, "touched" | "index">,
  primaryKey: keyof Omit<CardCardKeywordFormikShape, "touched" | "index">,
  t: Transaction,
  primaryKeyValue?: string | number
) => {
  await CardCardKeyword.update(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      cardId: parseInt(cardCardKeyword.cardId as string),
      cardKeywordId: parseInt(cardCardKeyword.cardKeywordId as string),
    },
    {
      where: { [primaryKey]: primaryKeyValue || cardCardKeyword[primaryKey] },
      transaction: t,
      individualHooks: true,
    }
  );
};

export const deleteCardCardKeywords = async (
  primaryKey: keyof Omit<CardCardKeywordFormikShape, "touched">,
  deletedIds: string[] | number[],
  t: Transaction
) => {
  await CardCardKeyword.destroy({
    where: { [primaryKey]: { [Op.in]: deletedIds } },
    transaction: t,
  });
};
