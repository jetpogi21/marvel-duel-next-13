//Generated by WriteToModelsRouteApi - models route next 13 with SQL
import CardModel, { Card } from "@/models/CardModel";
import { FindOptions, QueryTypes, Transaction } from "sequelize";
import {
  checkDuplicateCombinations,
  getSort,
  parseParams,
  returnJSONResponse,
} from "@/utils/utils";
import sequelize from "@/config/db";
import handleSequelizeError from "@/utils/errorHandling";
import { Op } from "sequelize";
import {
  CardDeletePayload,
  CardFormikShape,
  CardSearchParams,
  CardUpdatePayload,
} from "@/interfaces/CardInterfaces";
import { NextResponse } from "next/server";
import { DEFAULT_LIMIT } from "@/utils/constants";
import {
  COLUMNS,
  DEFAULT_SORT_BY,
  PRIMARY_KEY,
  TABLE_NAME,
  UNIQUE_FIELDS,
} from "@/utils/constants/CardConstants";
import { CardSchema } from "@/schema/CardSchema";
import {
  addCursorFilterToQuery,
  appendFieldsToSQL,
  getColumnKeyByDbName,
  getCursorString,
  getDatabaseFieldName,
  getMappedKeys,
  getSortedValue,
  processFields,
  resetSQL,
} from "@/utils/api/utils";
import clsJoin from "@/utils/clsJoin";
import clsSQL from "@/utils/clsSQL";

const ModelObject = Card;

//Generated by GeneratefindOptions
const findOptions: FindOptions<typeof Card> = {
  //Generated by GenerateIncludeOption
  include: [],
  //Generated by GenerateAttributesOption
  attributes: [
    //Generated by GetAllModelAttributesBySeqModel
    "id",
    "name",
    "type",
    "cost",
    "battleStyle",
    "atk",
    "shield",
    "description",
    "deckId",
    "slug",
  ],
};

//Reusable functions
export const createCard = async (
  card: Omit<CardFormikShape, "touched">,
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

//Generated by GetGetmodelsqlNext13 - getModelSQL Next 13
function getCardSQL(
  query: Partial<CardSearchParams>,
  dontFilter: boolean = false
) {
  const cardAttributes = getMappedKeys(COLUMNS);

  const simpleOnly = query["simpleOnly"];
  const cursor = query["cursor"];
  const limit = query["limit"] || DEFAULT_LIMIT;

  const sort = getSortedValue(
    query["sort"]
      ? `${query["sort"].includes("-") ? "-" : ""}${getDatabaseFieldName(
          query["sort"],
          COLUMNS
        )}`
      : undefined,
    cardAttributes,
    DEFAULT_SORT_BY
  );

  //Remove the - from the sort parameter
  const sortField = sort.includes("-") ? sort.substring(1) : sort;

  //Declare the variables
  const table = TABLE_NAME;
  const fields: ([string, string] | string)[] =
    //Generated by GenerateSQLFieldList
    [
      "id",
      "name",
      "type",
      "cost",
      ["battle_style", "battleStyle"],
      "atk",
      "shield",
      "description",
      ["deck_id", "deckId"],
    ];

  //This will be used to store the fields to be used from the joins
  const joinFields: string[] = [];

  //This will be used to store the replacements needed
  let replacements: Record<string, string> = {};

  const sql = new clsSQL();
  sql.source = table;

  const filters: string[] = [];

  if (!simpleOnly || simpleOnly !== "true") {
    //Generated by GenerateSeqModelFilters
    //Generated by GetLikeFilters
    const q = query.q as string;

    if (q && !dontFilter) {
      const fields: string[] = ["name", "description"];
      const likeFields = fields.map((field) => `${field} LIKE :q`);

      filters.push(`(${likeFields.join(" OR ")})`);
      replacements["q"] = `%${q}%`;
    }

    //Generated by GenerateModelFilterSnippet
    //Generated by GetSingleFilter
    const battleStyle = query.battleStyle as string;

    if (battleStyle && !dontFilter) {
      filters.push(`battle_style = :battleStyle`);
      replacements["battleStyle"] = battleStyle;
    }

    //Generated by GetMultipleFilter - Multiple Filter
    const cost = query.cost as string;

    if (cost && !dontFilter) {
      const costArr = cost.split(",");
      const costFilters: string[] = [];
      costArr.forEach((item) => {
        costFilters.push(`cost = :cost${item}`);
        replacements[`cost${item}`] = item;
      });

      filters.push("(" + costFilters.join(" OR ") + ")");
    }

    //Generated by GenerateModelFilterSnippet
    //Generated by GetSingleFilter
    const deckId = query.deckId as string;

    if (deckId && !dontFilter) {
      filters.push(`deck_id = :deckId`);
      replacements["deckId"] = deckId;
    }

    //Generated by GenerateModelFilterSnippet
    //Generated by GetSingleFilter
    const type = query.type as string;

    if (type && !dontFilter) {
      filters.push(`type = :type`);
      replacements["type"] = type;
    }
  }

  /* INSERT JOINS HERE */
  //Generated by GetAllSQLRightJoinSnippets
  //Generated by GetSQLRightJoinSnippetFromRelationship - GetSQLRightJoinSnippetFromRelationship
  let {
    sql: deck_SQL,
    fieldAliases: deck_fieldAliases,
    replacements: deck_replacements,
    subqueryAlias: deck_subqueryAlias,
    modelName: deck_modelName,
    filtered: deck_filtered,
  } = getDeckSQL(query, dontFilter);

  replacements = { ...replacements, ...deck_replacements };

  deck_fieldAliases.forEach((field) => {
    joinFields.push(`${deck_subqueryAlias}.${field}`);
  });

  const deckJoin = new clsJoin(
    deck_SQL.sql(),
    "deck_id",
    `\`${deck_modelName}.id\``, //`deck.id`
    deck_subqueryAlias, //tempDecks
    "INNER"
  );

  if (deck_filtered) {
    sql.joins.push(deckJoin);
  }

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

  sql.fields = sql.fields.concat(joinFields);

  /* Insert Join Cancellations here..*/
  //Generated by GetAllRightModelJoinCancellationSnippet
  //Generated by GetRightModelJoinCancellationSnippet - GetRightModelJoinCancellationSnippet
  deck_SQL = getDeckSQL(query, true).sql;
  deckJoin.source = deck_SQL.sql();
  deckJoin.joinType = "LEFT";

  //Insert joins here LEFT joins e.g. cardCardKeywordJoin, distincJoin or
  //new clsJoin("marvelduel_belongsto", "deck_id", "id", null)
  sql.joins = [
    distinctJoin,
    //Generated by GetAllRightJoinName
    deckJoin, //Generated by GetRightJoinName - GetRightJoinName
  ];
  resetSQL(sql);

  const sqlString: string = sql.sql();

  return {
    sqlString,
    countSQL,
    replacements,
  };
}

//Generated by GetAllGetmodelsqlChildNext13
//Generated by GetRightModelgetModelSQLSnippet - GetRightModelgetModelSQLSnippet
function getDeckSQL(
  query: Partial<CardSearchParams>,
  dontFilter: boolean = false
) {
  const table = "marvelduel_belongsto";
  const fields: (string | [string, string])[] =
    //Generated by GenerateSQLFieldList
    ["id", "name"];
  const fieldAliases: string[] = [];
  const modelName = "Deck";
  let filtered = false;
  let replacements: Record<string, string> = {};

  let sql = new clsSQL();
  sql.source = table;

  //build the sql field name and aliases (aliases are used to destructure the object)
  processFields(fields, modelName, table, fieldAliases, sql);

  const filters: string[] = [];
  //Generated by GenerateSeqModelFilters

  /*INSERT JOINS HERE*/

  if (filters.length > 0) {
    filtered = true;
    sql.filter = filters.join(" AND ");
  }

  return {
    sql,
    fieldAliases,
    replacements,
    subqueryAlias: "tempDeck",
    modelName,
    filtered,
  };
}

//Generated by GetSqlModelsGetRoute - GET Models route
export const GET = async (req: Request) => {
  const searchParams = new URL(req.url).searchParams;
  const query = parseParams(searchParams) as Partial<CardSearchParams>;

  const cardAttributes = getMappedKeys(COLUMNS);

  const fetchCount = query["fetchCount"] === "true";
  const sort = getSortedValue(
    query["sort"]
      ? `${query["sort"].includes("-") ? "-" : ""}${getDatabaseFieldName(
          query["sort"],
          COLUMNS
        )}`
      : undefined,
    cardAttributes,
    DEFAULT_SORT_BY
  );

  //Remove the - from the sort parameter
  const sortField = sort.includes("-") ? sort.substring(1) : sort;
  const cursorField = getColumnKeyByDbName(sortField, COLUMNS);

  let { sqlString, countSQL, replacements } = getCardSQL(query);

  let recordCount;
  if (fetchCount) {
    const countResult: any = await sequelize.query(countSQL, {
      replacements,
      type: QueryTypes.SELECT,
    });

    recordCount = countResult[0].count;
  }

  const data: CardModel[] = await sequelize.query(sqlString, {
    replacements,
    type: QueryTypes.SELECT,
    nest: true,
  });

  let cursor = "";

  if (data && data.length > 0) {
    cursor = getCursorString(cursorField, PRIMARY_KEY, data);
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
  const body = (await req.json()) as CardUpdatePayload;
  const { Cards } = body;

  //Generated by GenerateUniquenessValidation
  //Validate record uniqueness

  UNIQUE_FIELDS.forEach((item) => {
    const uniquenessError = checkDuplicateCombinations(item, Cards);

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

  for (const item of Cards) {
    try {
      await CardSchema.validate(item);
    } catch (error) {
      return handleSequelizeError(error);
    }
  }

  try {
    for (const item of Cards) {
      if (item[PRIMARY_KEY] === "") {
        await createCard(item, t);
        recordsCreated++;
      } else {
        await updateCard(item, PRIMARY_KEY, t);
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
  const body = (await req.json()) as CardDeletePayload;
  const { deletedCards } = body;

  if (deletedCards.length > 0) {
    const t = await sequelize.transaction();
    try {
      await deleteCards(PRIMARY_KEY, deletedCards, t);
      t.commit();
      return NextResponse.json("success");
    } catch (error) {
      t.rollback();
      return handleSequelizeError(error);
    }
  }
};