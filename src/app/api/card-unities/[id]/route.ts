//Generated by Generate_getModelAPIRouteNext13 - getModel API Route Next 13
import { CardUnity } from "@/models/CardUnityModel";
import { FindOptions, Sequelize } from "sequelize";
import { cloneDeep } from "lodash";
import { genericDelete, genericGetOne } from "@/utils/generic";
import { CardUnityFormUpdatePayload } from "@/interfaces/CardUnityInterfaces";
import { CardUnitySchema } from "@/schema/CardUnitySchema";
import sequelize from "@/config/db";
import handleSequelizeError from "@/utils/errorHandling";
import { returnJSONResponse, validateRequiredFields } from "@/utils/utils";
import { Op } from "sequelize";
import { updateCardUnity } from "@/utils/api/CardUnityLibs";
import { NextResponse } from "next/server";
import { PRIMARY_KEY } from "@/utils/constants/CardUnityConstants";
//Generated by GetAllAPIRelatedLeftModelImportBySeqModel
//Generated by GetAPIRelatedLeftModelImport - GetAPIRelatedLeftModelImport
import { CardUnityCard } from "@/models/CardUnityCardModel";
import { CardUnityCardModel } from "@/interfaces/CardUnityCardInterfaces";
import { CardUnityCardSchema } from "@/schema/CardUnityCardSchema";
import { PRIMARY_KEY as CARDUNITYCARD_PRIMARY_KEY } from "@/utils/constants/CardUnityCardConstants";
import {
  createCardUnityCard,
  deleteCardUnityCards,
  updateCardUnityCard,
} from "@/utils/api/CardUnityCardLibs";
import { Card } from "@/models/CardModel";

const ModelObject = CardUnity;

//Generated by GeneratefindOptions
const findOptions: FindOptions<typeof CardUnity> = {
  //Generated by GenerateIncludeOption

  include: [
    {
      model: CardUnityCard,
      //Generated by GenerateAttributesOption

      attributes: ["description", "CardUnityId", "CardId", "id"],
      //Generated by GenerateIncludeOption

      include: [
        {
          model: Card,
          //Generated by GenerateAttributesOption

          attributes: ["id", "name"],
        },
      ],
    },
  ],
  //Generated by GenerateAttributesOption

  attributes: ["id", "cardCompositions"],
};

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  //Generated by Generate_findOptionsCopy
  const findOptionsCopy: FindOptions<typeof CardUnity> = cloneDeep(findOptions);

  const id = params.id;
  return genericGetOne(ModelObject, findOptionsCopy, id);
};

//Generated by GetUpdateFunctionWithRelationshipNext13 - Update With Relationship Next 13
export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const res = (await req.json()) as CardUnityFormUpdatePayload;
  const id = params.id;

  try {
    await CardUnitySchema.validate(res);
  } catch (error: any) {
    return returnJSONResponse({
      status: "error",
      errorCode: 401,
      error: error.message,
    });
  }

  //Generated by GetAllRelatedPluralizedModelName
  const { CardUnityCards } = res;

  const t = await sequelize.transaction();

  try {
    await updateCardUnity(res, PRIMARY_KEY, t, id);

    //Generated by GetAllRelatedModelUpdateOrInsert
    //Generated by GetRelatedModelUpdateOrInsert - GetRelatedModelUpdateOrInsert
    const createdCardUnityCards: { index: number; id: number }[] = [];
    if (CardUnityCards) {
      for (const item of CardUnityCards) {
        item.CardUnityId = id;
        await CardUnityCardSchema.validate(item);

        if (item[CARDUNITYCARD_PRIMARY_KEY] === "") {
          const cardUnityCard = await createCardUnityCard(item, t);

          createdCardUnityCards.push({
            index: item.index,
            id: cardUnityCard[CARDUNITYCARD_PRIMARY_KEY],
          });
        } else {
          await updateCardUnityCard(item, CARDUNITYCARD_PRIMARY_KEY, t);
        }
      }
    }

    t.commit();
    return NextResponse.json({
      status: "success",
      //Generated by GetAllRelatedModelKeyValue
      CardUnityCards: createdCardUnityCards, //Generated by GetRelatedModelKeyValue - GetRelatedModelKeyValue
    });
  } catch (err) {
    t.rollback();
    return handleSequelizeError(err);
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  return genericDelete(ModelObject, id);
};
