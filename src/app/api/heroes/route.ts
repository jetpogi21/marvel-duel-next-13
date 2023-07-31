//Generated by WriteToModelsRouteApi
import { Hero } from "@/models/HeroModel";
import { FindOptions, QueryTypes } from "sequelize";
import {
  checkDuplicateCombinations,
  getSort,
  parseParams,
  returnJSONResponse,
  validateFieldIfBlank,
} from "@/utils/utils";
import sequelize from "@/config/db";
import handleSequelizeError from "@/utils/errorHandling";
import { Op } from "sequelize";
import {
  HeroModel,
  HeroSearchParams,
  HeroUpdatePayload,
} from "@/interfaces/HeroInterfaces";
import { NextResponse } from "next/server";
import { DEFAULT_LIMIT } from "@/utils/constants";
import {
  DEFAULT_SORT_BY,
  PRIMARY_KEY,
  REQUIRED_FIELDS,
  UNIQUE_FIELDS,
  TABLE_NAME,
} from "@/utils/constants/HeroConstants";
import {
  addCursorFilterToQuery,
  appendFieldsToSQL,
  getCursorString,
  getSortedValue,
  resetSQL,
} from "@/utils/api/utils";
import clsSQL from "@/utils/clsSQL";
import clsJoin from "@/utils/clsJoin";

//Generated by GenerateImportRelatedModels

const ModelObject = Hero;

//Generated by GeneratefindOptions
const findOptions: FindOptions<typeof Hero> = {
  //Generated by GenerateIncludeOption
  include: [],
  //Generated by GenerateAttributesOption
  attributes: [
    //Generated by GetAllModelAttributesBySeqModel
    "heroID",
    "heroName",
  ],
};

//Generated by GetGetmodelsqlNext13
function getHeroSQL(
  query: Partial<HeroSearchParams>,
  dontFilter: boolean = false
) {
  const heroAttributes = Object.keys(Hero.getAttributes()).map(
    (attribute) => attribute
  );

  const simpleOnly = query["simpleOnly"];
  const cursor = query["cursor"];
  const limit = query["limit"] || DEFAULT_LIMIT;

  const sort = getSortedValue(query["sort"], heroAttributes, DEFAULT_SORT_BY);

  //Remove the - from the sort parameter
  const sortField = sort.includes("-") ? sort.substring(1) : sort;

  //Declare the variables
  const table = TABLE_NAME;
  const fields: [string, string][] | string[] =
    //Generated by GenerateSQLFieldList
    ["belongsto_id"];

  //This will be used to store the fields to be used from the joins
  const joinFields: string[] = [];

  //This will be used to store the replacements needed
  let replacements: Record<string, string> = {};

  const sql = new clsSQL();
  sql.source = table;

  const filters: string[] = [];

  if (!simpleOnly || simpleOnly !== "true") {
    //Generated by GenerateSeqModelFilters
  }

  /* INSERT JOINS HERE */

  //Count should be pre-cursor
  //This part would return the count SQL
  sql.fields = [`COUNT(DISTINCT ${PRIMARY_KEY}) AS count`];
  const countSQL = sql.sql();

  sql.orderBy = getSort(sort, DEFAULT_SORT_BY, PRIMARY_KEY);
  if (cursor) {
    addCursorFilterToQuery(
      cursor,
      sort,
      sortField,
      PRIMARY_KEY,
      replacements,
      filters
    );
  }

  if (filters.length > 0) {
    sql.filter = filters.join(" AND ");
  }

  sql.limit = simpleOnly === "true" ? 0 : parseInt(limit);

  //This part will produce the distinct SQL
  sql.fields = [PRIMARY_KEY];
  sql.groupBy = [PRIMARY_KEY];

  const distinctSQL = sql.sql();

  const distinctJoin = new clsJoin(
    distinctSQL,
    PRIMARY_KEY,
    PRIMARY_KEY,
    "tempDistinct",
    "INNER"
  );

  sql.fields = [];

  //build the sql field name and aliases (aliases are used to destructure the object)
  appendFieldsToSQL(fields, sql, table);

  //sql.fields = sql.fields.concat(joinFields);

  /* Insert Join Cancellations here..*/
  //Insert joins here LEFT joins e.g. cardCardKeywordJoin, distincJoin or
  //new clsJoin("marvelduel_belongsto", "deck_id", "id", null)
  //Generated by GetSimpleJoinSnippetUsingRightModel
  sql.orderBy = ["marvelduel_belongsto.name"];
  sql.fields = sql.fields.concat([
    //Generated by GetAllSimpleJoinFieldsBySeqModel
    "marvelduel_belongsto.name AS heroName",
  ]);
  //Add to your sql.joins
  const deckJoin = new clsJoin(
    "marvelduel_belongsto",
    "belongsto_id",
    "id",
    "",
    "INNER"
  );

  sql.joins = [distinctJoin, deckJoin];
  resetSQL(sql);

  const sqlString: string = sql.sql();

  return {
    sqlString,
    countSQL,
    replacements,
  };
}

//Generated by GetSqlModelsGetRoute
export const GET = async (req: Request) => {
  const searchParams = new URL(req.url).searchParams;
  const query = parseParams(searchParams) as Partial<HeroSearchParams>;

  const heroAttributes = Object.keys(Hero.getAttributes()).map(
    (attribute) => attribute
  );

  const fetchCount = query["fetchCount"] === "true";
  const sort = getSortedValue(query["sort"], heroAttributes, DEFAULT_SORT_BY);

  //Remove the - from the sort parameter
  const sortField = sort.includes("-") ? sort.substring(1) : sort;

  let { sqlString, countSQL, replacements } = getHeroSQL(query);

  let recordCount;
  if (fetchCount) {
    const countResult: any = await sequelize.query(countSQL, {
      replacements,
      type: QueryTypes.SELECT,
    });

    recordCount = countResult[0].count;
  }

  const data: HeroModel[] = await sequelize.query(sqlString, {
    replacements,
    type: QueryTypes.SELECT,
    nest: true,
  });

  let cursor = "";

  if (data && data.length > 0) {
    cursor = getCursorString(sortField, PRIMARY_KEY, data);
  }

  //Add any object that will be turned into an array
  //e.g. const result = reduceResult(result as any, [["CardCardKeyword", "CardCardKeywords"],]);

  //Remove duplicating CardUnityCards
  //removeDuplicates(result as any, "CardUnityCards", "id");

  return NextResponse.json({
    rows: data,
    cursor,
    ...(fetchCount && { count: recordCount }),
  });
};

export const POST = async (req: Request) => {
  const body = (await req.json()) as HeroUpdatePayload;
  const { Heroes, deletedHeroes } = body;

  //Generated by GenerateUniquenessValidation
  //Validate record uniqueness

  UNIQUE_FIELDS.forEach((item) => {
    const uniquenessError = checkDuplicateCombinations(item, Heroes);

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
  let recordsDeleted = 0;

  for (const item of Heroes) {
    const validationMessage = validateFieldIfBlank(item, REQUIRED_FIELDS);
    if (validationMessage) {
      throw new Error(validationMessage);
    }
  }

  try {
    for (const item of Heroes) {
      if (item[PRIMARY_KEY] === "") {
        await Hero.create(
          {
            //Generated by GetAllFieldsToUpdateBySeqModel
            belongsto_id: parseInt(item.belongsto_id!),
          },
          { transaction: t }
        );

        recordsCreated++;
      } else {
        await Hero.update(
          {},
          { where: { [PRIMARY_KEY]: item[PRIMARY_KEY] }, transaction: t }
        );
      }
    }

    if (deletedHeroes.length > 0) {
      // Get the count of records to be deleted
      const recordsToDeleteCount = await Hero.count({
        where: { [PRIMARY_KEY]: { [Op.in]: deletedHeroes } },
      });

      await Hero.destroy({
        where: { [PRIMARY_KEY]: { [Op.in]: deletedHeroes } },
        transaction: t,
      });

      // Set the recordsDeleted count to the actual number of records deleted
      recordsDeleted = recordsToDeleteCount;
    }

    await t.commit();

    return NextResponse.json({
      recordsCreated,
      recordsDeleted,
    });
  } catch (err) {
    await t.rollback();
    return handleSequelizeError(err);
  }
};
