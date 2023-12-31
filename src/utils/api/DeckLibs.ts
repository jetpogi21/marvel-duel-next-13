//Generated by WriteToModellibs_ts - ModelLibs.ts
import { DeckFormikShape } from "@/interfaces/DeckInterfaces";
import { Deck } from "@/models/DeckModel";
import { Op } from "sequelize";
import { Transaction } from "sequelize";

//Reusable functions
export const createDeck = async (
  deck: Omit<DeckFormikShape, "touched" | "index" | "id">,
  t: Transaction
) => {
  return await Deck.create(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      name: deck.name!,
    },
    { transaction: t }
  );
};

export const updateDeck = async (
  deck: Omit<DeckFormikShape, "touched" | "index">,
  primaryKey: keyof Omit<DeckFormikShape, "touched" | "index">,
  t: Transaction,
  primaryKeyValue?: string | number
) => {
  await Deck.update(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      name: deck.name!,
    },
    {
      where: { [primaryKey]: primaryKeyValue || deck[primaryKey] },
      transaction: t,
      individualHooks: true,
    }
  );
};

export const deleteDecks = async (
  primaryKey: keyof Omit<DeckFormikShape, "touched">,
  deletedIds: string[] | number[],
  t: Transaction
) => {
  await Deck.destroy({
    where: { [primaryKey]: { [Op.in]: deletedIds } },
    transaction: t,
  });
};
