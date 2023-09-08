//Generated by WriteToModellibs_ts - ModelLibs.ts
import { CardFormikShape } from "@/interfaces/CardInterfaces";
import { Card } from "@/models/CardModel";
import { Op } from "sequelize";
import { Transaction } from "sequelize";

//Reusable functions
export const createCard = async (
  card: Omit<CardFormikShape, "touched" | "index" | "id">,
  t: Transaction
) => {
  return await Card.create(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      name: card.name!,
      type: card.type!,
      cost: parseInt(card.cost as string),
      battleStyle: card.battleStyle ? card.battleStyle! : null,
      atk: card.atk ? parseInt(card.atk as string) : null,
      shield: card.shield ? parseInt(card.shield as string) : null,
      description: card.description ? card.description! : null,
      deckId: parseInt(card.deckId as string),
    },
    { transaction: t }
  );
};

export const updateCard = async (
  card: Omit<CardFormikShape, "touched" | "index">,
  primaryKey: keyof Omit<CardFormikShape, "touched" | "index">,
  t: Transaction,
  primaryKeyValue?: string | number
) => {
  await Card.update(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      name: card.name!,
      type: card.type!,
      cost: parseInt(card.cost as string),
      battleStyle: card.battleStyle ? card.battleStyle! : null,
      atk: card.atk ? parseInt(card.atk as string) : null,
      shield: card.shield ? parseInt(card.shield as string) : null,
      description: card.description ? card.description! : null,
      deckId: parseInt(card.deckId as string),
    },
    {
      where: { [primaryKey]: primaryKeyValue || card[primaryKey] },
      transaction: t,
      individualHooks: true,
    }
  );
};

export const deleteCards = async (
  primaryKey: keyof Omit<CardFormikShape, "touched">,
  deletedIds: string[] | number[],
  t: Transaction
) => {
  await Card.destroy({
    where: { [primaryKey]: { [Op.in]: deletedIds } },
    transaction: t,
  });
};
