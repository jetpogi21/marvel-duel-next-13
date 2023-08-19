//Generated by WriteToModelsRouteApi - models route next 13
import { CardSkill } from "@/models/CardSkillModel";
import { FindOptions, Transaction } from "sequelize";
import { cloneDeep } from "lodash";
import {
  checkDuplicateCombinations,
  formatSortAsSequelize,
  getSort,
  parseParams,
  returnJSONResponse,
} from "@/utils/utils";
import { genericGetAll } from "@/utils/generic";
import sequelize from "@/config/db";
import handleSequelizeError from "@/utils/errorHandling";
import { Op } from "sequelize";
import {
  CardSkillDeletePayload,
  CardSkillFormUpdatePayload,
  CardSkillFormikShape,
  CardSkillSearchParams,
  CardSkillUpdatePayload,
} from "@/interfaces/CardSkillInterfaces";
import { NextResponse } from "next/server";
import { DEFAULT_LIMIT } from "@/utils/constants";
import {
  DEFAULT_SORT_BY,
  PRIMARY_KEY,
  REQUIRED_FIELDS,
  UNIQUE_FIELDS,
} from "@/utils/constants/CardSkillConstants";
import { CardSkillSchema } from "@/schema/CardSkillSchema";
import { appendAndFilters, getCursor } from "@/utils/api/utils";
import {
  createCardSkill,
  deleteCardSkills,
  updateCardSkill,
} from "@/utils/api/CardSkillLibs";

const ModelObject = CardSkill;

//Generated by GeneratefindOptions
const findOptions: FindOptions<typeof CardSkill> = {
  //Generated by GenerateIncludeOption
  include: [],
  //Generated by GenerateAttributesOption
  attributes: [
    //Generated by GetAllModelAttributesBySeqModel
    "id",
    "name",
    "description",
  ],
};

//Generated by Generate_getModelsSimpleFilterNext13
export const GET = async (req: Request) => {
  //Generated by Generate_findOptionsCopy
  const findOptionsCopy: FindOptions<typeof CardSkill> = cloneDeep(findOptions);
  const cardSkillAttributes = Object.keys(CardSkill.getAttributes()).map(
    (attribute) => attribute
  );

  const searchParams = new URL(req.url).searchParams;

  const query = parseParams(searchParams) as Partial<CardSkillSearchParams>;
  const primaryKey = PRIMARY_KEY;

  const simpleOnly = query["simpleOnly"];
  const cursor = query["cursor"];
  const fetchCount = query["fetchCount"] === "true";

  let limit = query["limit"];
  const sort = query["sort"]
    ? cardSkillAttributes.includes(query["sort"]) ||
      cardSkillAttributes.includes(query["sort"].substring(1))
      ? query["sort"]
      : DEFAULT_SORT_BY
    : DEFAULT_SORT_BY;

  //Remove the - from the sort parameter
  const sortField = sort.includes("-") ? sort.substring(1) : sort;

  if (!simpleOnly) {
    const where: Record<string | symbol, unknown> = { [Op.and]: [] };
    const andFilters = [];

    const q = query["q"];

    if (q) {
      andFilters.push({
        [Op.or]: [
          //Generated by GetAllQFilterFieldBySeqModel
          //Generated by GenerateAQFilterField - GenerateAQFilterField
          { name: { [Op.like]: `%${q}%` } }, //Generated by GenerateAQFilterField - GenerateAQFilterField
          { description: { [Op.like]: `%${q}%` } },
        ],
      });
    }

    //Generated by GetAllBackendFiltersBySeqModel

    //get all the count here first
    let recordCount = 0;
    if (fetchCount) {
      recordCount = await CardSkill.count({
        where: { [Op.and]: andFilters },
      });
    }

    if (cursor) {
      appendAndFilters(andFilters, sort, sortField, primaryKey, cursor);
    }

    where[Op.and] = andFilters;
    findOptionsCopy.where = where;
    limit = limit || DEFAULT_LIMIT;
    findOptionsCopy.limit = parseInt(limit);

    //@ts-ignore
    findOptionsCopy.order = formatSortAsSequelize(
      getSort(sort, DEFAULT_SORT_BY, primaryKey)
    );

    try {
      const data = await CardSkill.findAll(findOptionsCopy);

      const cursor = getCursor(data, sortField, primaryKey);

      return NextResponse.json({
        rows: data,
        cursor,
        ...(fetchCount && { count: recordCount }),
      });
    } catch (err) {
      return handleSequelizeError(err);
    }
  } else {
    return genericGetAll(ModelObject, findOptionsCopy);
  }
};

//Generated by GetMultiCreateModelPOSTRoute - GetMultiCreateModelPOSTRoute
export const POST = async (req: Request) => {
  const body = (await req.json()) as CardSkillUpdatePayload;
  const { CardSkills } = body;

  //Generated by GenerateUniquenessValidation
  //Validate record uniqueness

  UNIQUE_FIELDS.forEach((item) => {
    const uniquenessError = checkDuplicateCombinations(item, CardSkills);

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

  for (const item of CardSkills) {
    try {
      await CardSkillSchema.validate(item);
    } catch (error) {
      return handleSequelizeError(error);
    }
  }

  try {
    for (const item of CardSkills) {
      if (item[PRIMARY_KEY] === "") {
        await createCardSkill(item, t);
        recordsCreated++;
      } else {
        await updateCardSkill(item, PRIMARY_KEY, t);
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

export const DELETE = async (req: Request) => {
  const body = (await req.json()) as CardSkillDeletePayload;
  const { deletedCardSkills } = body;

  if (deletedCardSkills.length > 0) {
    const t = await sequelize.transaction();
    try {
      await deleteCardSkills(PRIMARY_KEY, deletedCardSkills, t);
      t.commit();
      return NextResponse.json({
        status: "success",
        recordsDeleted: deletedCardSkills.length,
      });
    } catch (error) {
      t.rollback();
      return handleSequelizeError(error);
    }
  }
};
