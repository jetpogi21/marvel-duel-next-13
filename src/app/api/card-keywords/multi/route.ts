//Generated by WriteToMultiRoute_ts - multi route.ts
import {
  createCardKeyword,
  updateCardKeyword,
} from "@/app/api/card-keywords/route";
import sequelize from "@/config/db";
import { CardKeywordUpdatePayload } from "@/interfaces/CardKeywordInterfaces";
import { CardKeywordSchema } from "@/schema/CardKeywordSchema";
import {
  PRIMARY_KEY,
  UNIQUE_FIELDS,
} from "@/utils/constants/CardKeywordConstants";
import handleSequelizeError from "@/utils/errorHandling";
import { checkDuplicateCombinations, returnJSONResponse } from "@/utils/utils";
import { NextResponse } from "next/server";

//Generated by GetMultiCreateModelPOSTRoute - GetMultiCreateModelPOSTRoute
export const POST = async (req: Request) => {
  const body = (await req.json()) as CardKeywordUpdatePayload;
  const { CardKeywords } = body;

  //Generated by GenerateUniquenessValidation
  //Validate record uniqueness

  UNIQUE_FIELDS.forEach((item) => {
    const uniquenessError = checkDuplicateCombinations(item, CardKeywords);

    if (uniquenessError) {
      return returnJSONResponse({
        status: "error",
        error: uniquenessError,
        errorCode: 422,
      });
    }
  });

  const t = await sequelize.transaction();
  let recordsCreated = 0;

  for (const item of CardKeywords) {
    try {
      await CardKeywordSchema.validate(item);
    } catch (error) {
      return handleSequelizeError(error);
    }
  }

  try {
    for (const item of CardKeywords) {
      if (item[PRIMARY_KEY] === "") {
        await createCardKeyword(item, t);
        recordsCreated++;
      } else {
        await updateCardKeyword(item, PRIMARY_KEY, t);
      }
    }

    await t.commit();

    return NextResponse.json({
      recordsCreated,
    });
  } catch (err) {
    await t.rollback();
    return handleSequelizeError(err);
  }
};
