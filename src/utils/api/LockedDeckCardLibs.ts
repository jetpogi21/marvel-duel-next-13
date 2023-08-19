//Generated by WriteToModellibs_ts - ModelLibs.ts
import { LockedDeckCardFormikShape } from "@/interfaces/LockedDeckCardInterfaces";
import { LockedDeckCard } from "@/models/LockedDeckCardModel";
import { Op } from "sequelize";
import { Transaction } from "sequelize";

//Reusable functions
export const createLockedDeckCard = async (
  lockedDeckCard: Omit<LockedDeckCardFormikShape, "touched" | "index">,
  t: Transaction
) => {
  return await LockedDeckCard.create(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      lockedDeckId: parseInt(lockedDeckCard.lockedDeckId as string),
      cardId: parseInt(lockedDeckCard.cardId as string),
    },
    { transaction: t }
  );
};

export const updateLockedDeckCard = async (
  lockedDeckCard: Omit<LockedDeckCardFormikShape, "touched" | "index">,
  primaryKey: keyof Omit<LockedDeckCardFormikShape, "touched" | "index">,
  t: Transaction,
  primaryKeyValue?: string | number
) => {
  await LockedDeckCard.update(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      lockedDeckId: parseInt(lockedDeckCard.lockedDeckId as string),
      cardId: parseInt(lockedDeckCard.cardId as string),
    },
    {
      where: { [primaryKey]: primaryKeyValue || lockedDeckCard[primaryKey] },
      transaction: t,
      individualHooks: true,
    }
  );
};

export const deleteLockedDeckCards = async (
  primaryKey: keyof Omit<LockedDeckCardFormikShape, "touched">,
  deletedIds: string[] | number[],
  t: Transaction
) => {
  await LockedDeckCard.destroy({
    where: { [primaryKey]: { [Op.in]: deletedIds } },
    transaction: t,
  });
};