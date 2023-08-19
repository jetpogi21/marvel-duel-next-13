//Generated by WriteToModelsRouteApi - models route next 13 with SQL
import CardModel, { Card } from "@/models/CardModel";
import { FindOptions, QueryTypes, Transaction } from "sequelize";
import {
  checkDuplicateCombinations,
  getSort,
  parseParams,
  reduceResult,
  removeDuplicates,
  returnJSONResponse,
} from "@/utils/utils";
import sequelize from "@/config/db";
import handleSequelizeError from "@/utils/errorHandling";
import { Op } from "sequelize";
import {
  CardDeletePayload,
  CardFormUpdatePayload,
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
//Generated by GetAllCreateSimpleModelFromRoute
//Generated by GetCreateSimpleModelFromRoute - GetCreateSimpleModelFromRoute
import { createCardCardKeyword } from "@/app/api/card-card-keywords/route";
//Generated by GetAllRelatedLeftModelImportRoute
//Generated by GetRelatedLeftModelImportRoute - GetRelatedLeftModelImportRoute
import {
  createCardUnityCard,
  updateCardUnityCard,
} from "@/app/api/card-unity-cards/route";
import { CardUnityCardSchema } from "@/schema/CardUnityCardSchema";
import { PRIMARY_KEY as CARDUNITYCARD_PRIMARY_KEY } from "@/utils/constants/CardUnityCardConstants";
//Generated by GetRelatedLeftModelImportRoute - GetRelatedLeftModelImportRoute
import {
  createLockedDeckCard,
  updateLockedDeckCard,
} from "@/app/api/locked-deck-cards/route";
import { LockedDeckCardSchema } from "@/schema/LockedDeckCardSchema";
import { PRIMARY_KEY as LOCKEDDECKCARD_PRIMARY_KEY } from "@/utils/constants/LockedDeckCardConstants";

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
  card: Omit<CardFormikShape, "touched" | "index">,
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
      "slug",
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
    //Generated by GetLikeFilters - LIKE Template
    const q = query.q as string;
    const orFilters: string[] = [];
    if (q && !dontFilter) {
      const fields: string[] = ["name", "description"];
      orFilters.push(
        `(MATCH (${fields
          .map((field) => `${TABLE_NAME}.${field}`)
          .join(",")}) AGAINST (:q IN boolean mode))`
      );
      replacements["q"] = `*${q}*`;
      //Should result to ((Filter on model 1) OR (Filter on model 2) OR (Filter on model 3))
      //Filter by `CardUnityCard.description`
      orFilters.push(`(\`CardUnityCard.description\` LIKE :q2)`);
      filters.push(orFilters.join(" OR "));
      replacements["q2"] = `%${q}%`;
    }

    //Generated by GenerateModelFilterSnippet
    //Generated by GetSingleFilter - Single Filter
    const battleStyle = query.battleStyle as string;

    if (battleStyle && !dontFilter) {
      filters.push(`${TABLE_NAME}.battle_style = :battleStyle`);
      replacements["battleStyle"] = battleStyle;
    }

    //Generated by GetMultipleFilter - Multiple Filter
    const cost = query.cost as string;

    if (cost && !dontFilter) {
      const costArr = cost.split(",");
      const costFilters: string[] = [];
      costArr.forEach((item) => {
        costFilters.push(`${TABLE_NAME}.cost = :cost${item}`);
        replacements[`cost${item}`] = item;
      });

      filters.push("(" + costFilters.join(" OR ") + ")");
    }

    //Generated by GenerateModelFilterSnippet
    //Generated by GetSingleFilter - Single Filter
    const deckId = query.deckId as string;

    if (deckId && !dontFilter) {
      if (deckId === "9") {
        filters.push(
          `(${TABLE_NAME}.deck_id = :deckId OR NOT \`LockedDeckCard.id\` IS NULL) `
        );
      } else {
        filters.push(`${TABLE_NAME}.deck_id = :deckId`);
      }
      replacements["deckId"] = deckId;
    }

    //Generated by GenerateModelFilterSnippet
    //Generated by GetSingleFilter - Single Filter
    const type = query.type as string;

    if (type && !dontFilter) {
      filters.push(`${TABLE_NAME}.type = :type`);
      replacements["type"] = type;
    }

    //Generated by GetIsPresentFilter - isPresent Filter
    if (query.hasUnity === "true") {
      const cardUnityCardJoin = new clsJoin(
        "cardunitycards",
        "id",
        "CardId",
        "",
        "INNER"
      );
      sql.joins = [cardUnityCardJoin];
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
  //Generated by GetAllSQLLeftJoinSnippets
  //Generated by GetSQLLeftJoinSnippetFromRelationship - GetSQLLeftJoinSnippetFromRelationship
  let {
    sql: cardCardKeyword_SQL,
    fieldAliases: cardCardKeyword_fieldAliases,
    replacements: cardCardKeyword_replacements,
    subqueryAlias: cardCardKeyword_subqueryAlias,
    modelName: cardCardKeyword_modelName,
    filtered: cardCardKeyword_filtered,
  } = getCardCardKeywordSQL(query, dontFilter);

  replacements = { ...replacements, ...cardCardKeyword_replacements };

  cardCardKeyword_fieldAliases.forEach((field) => {
    joinFields.push(`${cardCardKeyword_subqueryAlias}.${field}`);
  });

  const cardCardKeywordJoin = new clsJoin(
    cardCardKeyword_SQL.sql(),
    "id",
    `\`${cardCardKeyword_modelName}.cardId\``, //`cardCardKeyword.id`
    cardCardKeyword_subqueryAlias, //tempCardCardKeywords
    "INNER"
  );

  if (cardCardKeyword_filtered) {
    sql.joins.push(cardCardKeywordJoin);
  }
  //Generated by GetSQLLeftJoinSnippetFromRelationship - GetSQLLeftJoinSnippetFromRelationship
  let {
    sql: cardUnityCard_SQL,
    fieldAliases: cardUnityCard_fieldAliases,
    replacements: cardUnityCard_replacements,
    subqueryAlias: cardUnityCard_subqueryAlias,
    modelName: cardUnityCard_modelName,
    filtered: cardUnityCard_filtered,
  } = getCardUnityCardSQL(query, dontFilter);

  replacements = { ...replacements, ...cardUnityCard_replacements };

  cardUnityCard_fieldAliases.forEach((field) => {
    joinFields.push(`${cardUnityCard_subqueryAlias}.${field}`);
  });

  const cardUnityCardJoin = new clsJoin(
    cardUnityCard_SQL.sql(),
    "id",
    `\`${cardUnityCard_modelName}.CardId\``, //`cardUnityCard.id`
    cardUnityCard_subqueryAlias, //tempCardUnityCards
    "LEFT"
  );

  sql.joins.push(cardUnityCardJoin);

  //Generated by GetSQLLeftJoinSnippetFromRelationship - GetSQLLeftJoinSnippetFromRelationship
  let {
    sql: lockedDeckCard_SQL,
    fieldAliases: lockedDeckCard_fieldAliases,
    replacements: lockedDeckCard_replacements,
    subqueryAlias: lockedDeckCard_subqueryAlias,
    modelName: lockedDeckCard_modelName,
    filtered: lockedDeckCard_filtered,
  } = getLockedDeckCardSQL(query, dontFilter);

  replacements = { ...replacements, ...lockedDeckCard_replacements };

  lockedDeckCard_fieldAliases.forEach((field) => {
    joinFields.push(`${lockedDeckCard_subqueryAlias}.${field}`);
  });

  const lockedDeckCardJoin = new clsJoin(
    lockedDeckCard_SQL.sql(),
    "id",
    `\`${lockedDeckCard_modelName}.cardId\``, //`lockedDeckCard.id`
    lockedDeckCard_subqueryAlias, //tempLockedDeckCards
    lockedDeckCard_filtered ? "LEFT" : "INNER" //always include if deck_id is #9
  );

  if (lockedDeckCard_filtered) {
    sql.joins.push(lockedDeckCardJoin);
  }

  //Count should be pre-cursor
  //This part would return the count SQL
  sql.fields = [`COUNT(DISTINCT ${TABLE_NAME}.${PRIMARY_KEY}) AS count`];
  if (filters.length > 0) {
    sql.filter = filters.join(" AND ");
  }
  const countSQL = sql.sql();
  sql.filter = "";

  sql.orderBy = getSort(sort, DEFAULT_SORT_BY, PRIMARY_KEY);
  if (cursor) {
    addCursorFilterToQuery(
      cursor,
      sort,
      sortField,
      PRIMARY_KEY,
      replacements,
      filters,
      TABLE_NAME
    );
  }

  if (filters.length > 0) {
    sql.filter = filters.join(" AND ");
  }

  sql.limit = simpleOnly === "true" ? 0 : parseInt(limit);

  //This part will produce the distinct SQL
  sql.fields = [`${TABLE_NAME}.${PRIMARY_KEY}`];
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
  //Generated by GetAllLeftModelJoinCancellationSnippet
  //Generated by GetLeftModelJoinCancellationSnippet - GetLeftModelJoinCancellationSnippet
  cardCardKeyword_SQL = getCardCardKeywordSQL(query, true).sql;
  cardCardKeywordJoin.source = cardCardKeyword_SQL.sql();
  cardCardKeywordJoin.joinType = "LEFT";
  //Generated by GetLeftModelJoinCancellationSnippet - GetLeftModelJoinCancellationSnippet
  cardUnityCard_SQL = getCardUnityCardSQL(query, true).sql;
  cardUnityCardJoin.source = cardUnityCard_SQL.sql();
  cardUnityCardJoin.joinType = "LEFT";
  //Generated by GetLeftModelJoinCancellationSnippet - GetLeftModelJoinCancellationSnippet
  lockedDeckCard_SQL = getLockedDeckCardSQL(query, true).sql;
  lockedDeckCardJoin.source = lockedDeckCard_SQL.sql();
  lockedDeckCardJoin.joinType = "LEFT";

  //Insert joins here LEFT joins e.g. cardCardKeywordJoin, distincJoin or
  //new clsJoin("marvelduel_belongsto", "deck_id", "id", null)
  sql.joins = [
    distinctJoin,
    //Generated by GetAllRightJoinName
    deckJoin, //Generated by GetRightJoinName - GetRightJoinName
    //Generated by GetAllLeftJoinName
    cardCardKeywordJoin, //Generated by GetLeftJoinName - GetLeftJoinName
    cardUnityCardJoin, //Generated by GetLeftJoinName - GetLeftJoinName
    lockedDeckCardJoin, //Generated by GetLeftJoinName - GetLeftJoinName
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
    ["slug", "id", "name"];
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

//Generated by GetAllGetmodelsqlLeftModelChildNext13
//Generated by GetGetmodelsqlLeftModelChildNext13 - GetGetmodelsqlLeftModelChildNext13
function getCardCardKeywordSQL(
  query: Partial<CardSearchParams>,
  dontFilter: boolean = false
) {
  const table = "marvelduel_card_card_keywords";
  const fields: (string | [string, string])[] =
    //Generated by GenerateSQLFieldList
    ["id", ["card_id", "cardId"], ["cardkeyword_id", "cardKeywordId"]];
  const fieldAliases: string[] = [];
  const modelName = "CardCardKeyword";
  let filtered = false;
  let replacements: Record<string, string> = {};

  let sql = new clsSQL();
  sql.source = table;

  //build the sql field name and aliases (aliases are used to destructure the object)
  processFields(fields, modelName, table, fieldAliases, sql);

  const filters: string[] = [];

  //Generated by GenerateSeqModelFilters
  //Generated by GetMultipleFilter - Multiple Filter
  const cardKeyword = query.cardKeyword as string;

  if (cardKeyword && !dontFilter) {
    const cardKeywordArr = cardKeyword.split(",");
    const cardKeywordFilters: string[] = [];
    cardKeywordArr.forEach((item) => {
      cardKeywordFilters.push(
        `${TABLE_NAME}.cardkeyword_id = :cardKeyword${item}`
      );
      replacements[`cardKeyword${item}`] = item;
    });

    filters.push("(" + cardKeywordFilters.join(" OR ") + ")");
  }

  /*INSERT JOINS HERE*/
  //Generated by GenerateModelJoin
  let {
    sql: cardKeyword_SQL,
    fieldAliases: cardKeyword_fieldAliases,
    replacements: cardKeyword_replacements,
    subqueryAlias: cardKeyword_subqueryAlias,
    modelName: cardKeyword_modelName,
    filtered: cardKeyword_filtered,
  } = getCardKeywordSQL(query, true);

  if (!filtered) {
    filtered = cardKeyword_filtered;
    sql.filter = filters.join(" AND ");
  }

  replacements = { ...replacements, ...cardKeyword_replacements };

  cardKeyword_fieldAliases.forEach((field) => {
    const fieldAlias = `\`${modelName}.${field.slice(1, -1)}\``; //`cardCardKeyword.cardKeyword.id`
    fieldAliases.push(fieldAlias);
    sql.fields.push(`${cardKeyword_subqueryAlias}.${field} AS ${fieldAlias}`); //tempCardKeywords.`cardKeyword.id` AS `cardCardKeyword.cardKeyword.id`
  });

  let connectionType: "LEFT" | "INNER" = "LEFT";
  if (!dontFilter && cardKeyword_SQL.filter) {
    connectionType = "INNER";
  }

  const cardKeywordJoin = new clsJoin(
    cardKeyword_SQL.sql(),
    "cardkeyword_id",
    `\`${cardKeyword_modelName}.id\``, //`cardKeyword.id`
    cardKeyword_subqueryAlias, //tempCardKeywords
    connectionType
  );

  sql.joins.push(cardKeywordJoin);
  if (filters.length > 0) {
    filtered = true;
    sql.filter = filters.join(" AND ");
  }

  return {
    sql,
    fieldAliases,
    replacements,
    subqueryAlias: "tempCardCardKeyword",
    modelName,
    filtered,
  };
}

//Generated by GetGetmodelsqlChildNext13 - getModelSQL child next 13
function getCardKeywordSQL(
  query: Partial<CardSearchParams>,
  dontFilter: boolean = false
) {
  //Do the card keyword portion first
  const table = "marvelduel_cardkeyword";
  const fields: (string | [string, string])[] =
    //Generated by GenerateSQLFieldList
    ["id", "name"];
  const fieldAliases: string[] = [];
  const modelName = "CardKeyword";
  let filtered = false;
  let replacements: Record<string, string> = {};

  let sql = new clsSQL();
  sql.source = table;

  //build the sql field name and aliases (aliases are used to destructure the object)
  processFields(fields, modelName, table, fieldAliases, sql);

  const filters: string[] = [];
  //Generated by GenerateSeqModelFilters
  //Generated by GetLikeFilters
  const q = query.q as string;

  if (q && !dontFilter) {
    const fields: string[] = ["name"];
    const likeFields = fields.map((field) => `${field} LIKE :q`);

    filters.push(`(${likeFields.join(" OR ")})`);
    replacements["q"] = `%${q}%`;
  }

  /*INSERT JOINS HERE*/

  if (filters.length > 0) {
    filtered = true;
    sql.filter = filters.join(" AND ");
  }

  return {
    sql,
    fieldAliases,
    replacements,
    subqueryAlias: "tempCardKeyword",
    modelName,
    filtered,
  };
}

//Generated by GetGetmodelsqlLeftModelChildNext13 - GetGetmodelsqlLeftModelChildNext13
function getCardUnityCardSQL(
  query: Partial<CardSearchParams>,
  dontFilter: boolean = false
) {
  const table = "cardunitycards";
  const fields: (string | [string, string])[] =
    //Generated by GenerateSQLFieldList
    ["id", "description", "CardUnityId", "CardId"];
  const fieldAliases: string[] = [];
  const modelName = "CardUnityCard";
  let filtered = false;
  let replacements: Record<string, string> = {};

  let sql = new clsSQL();
  sql.source = table;

  //build the sql field name and aliases (aliases are used to destructure the object)
  processFields(fields, modelName, table, fieldAliases, sql);

  const filters: string[] = [];

  /*INSERT JOINS HERE*/
  //Generated by GenerateModelJoin
  let {
    sql: cardUnity_SQL,
    fieldAliases: cardUnity_fieldAliases,
    replacements: cardUnity_replacements,
    subqueryAlias: cardUnity_subqueryAlias,
    modelName: cardUnity_modelName,
    filtered: cardUnity_filtered,
  } = getCardUnitySQL(query, dontFilter);

  if (!filtered) {
    filtered = cardUnity_filtered;
  }

  replacements = { ...replacements, ...cardUnity_replacements };

  cardUnity_fieldAliases.forEach((field) => {
    const fieldAlias = `\`${modelName}.${field.slice(1, -1)}\``; //`cardCardUnity.cardUnity.id`
    fieldAliases.push(fieldAlias);
    sql.fields.push(`${cardUnity_subqueryAlias}.${field} AS ${fieldAlias}`); //tempCardUnitys.`cardUnity.id` AS `cardCardUnity.cardUnity.id`
  });

  let connectionType: "LEFT" | "INNER" = "LEFT";
  if (!dontFilter && cardUnity_SQL.filter) {
    connectionType = "INNER";
  }

  const cardUnityJoin = new clsJoin(
    cardUnity_SQL.sql(),
    "CardUnityId",
    `\`${cardUnity_modelName}.id\``, //`cardUnity.id`
    cardUnity_subqueryAlias, //tempCardUnitys
    connectionType
  );

  sql.joins.push(cardUnityJoin);

  if (filters.length > 0) {
    filtered = true;
    sql.filter = filters.join(" AND ");
  }

  return {
    sql,
    fieldAliases,
    replacements,
    subqueryAlias: "tempCardUnityCard",
    modelName,
    filtered,
  };
}

//Generated by GetGetmodelsqlChildNext13 - getModelSQL child next 13
function getCardUnitySQL(
  query: Partial<CardSearchParams>,
  dontFilter: boolean = false
) {
  //Do the card keyword portion first
  const table = "cardunities";
  const fields: (string | [string, string])[] =
    //Generated by GenerateSQLFieldList
    ["id", "cardCompositions"];
  const fieldAliases: string[] = [];
  const modelName = "CardUnity";
  let filtered = false;
  let replacements: Record<string, string> = {};

  let sql = new clsSQL();
  sql.source = table;

  //build the sql field name and aliases (aliases are used to destructure the object)
  processFields(fields, modelName, table, fieldAliases, sql);

  const filters: string[] = [];
  /*INSERT JOINS HERE*/

  if (filters.length > 0) {
    filtered = true;
    sql.filter = filters.join(" AND ");
  }

  return {
    sql,
    fieldAliases,
    replacements,
    subqueryAlias: "tempCardUnity",
    modelName,
    filtered,
  };
}

//Generated by GetGetmodelsqlLeftModelChildNext13 - GetGetmodelsqlLeftModelChildNext13
function getLockedDeckCardSQL(
  query: Partial<CardSearchParams>,
  dontFilter: boolean = false
) {
  const table = "lockeddeckcards";
  const fields: (string | [string, string])[] =
    //Generated by GenerateSQLFieldList
    ["id", "lockedDeckId", "cardId"];
  const fieldAliases: string[] = [];
  const modelName = "LockedDeckCard";
  let filtered = false;
  let replacements: Record<string, string> = {};

  let sql = new clsSQL();
  sql.source = table;

  //build the sql field name and aliases (aliases are used to destructure the object)
  processFields(fields, modelName, table, fieldAliases, sql);

  const filters: string[] = [];

  //Generated by GenerateSeqModelFilters

  /*INSERT JOINS HERE*/
  //Generated by GenerateModelJoinFromChildSQL - GenerateModelJoin From Child SQL
  let {
    sql: lockedDeck_SQL,
    fieldAliases: lockedDeck_fieldAliases,
    replacements: lockedDeck_replacements,
    subqueryAlias: lockedDeck_subqueryAlias,
    modelName: lockedDeck_modelName,
    filtered: lockedDeck_filtered,
  } = getLockedDeckSQL(query, dontFilter);

  if (!filtered) {
    filtered = lockedDeck_filtered;
  }

  replacements = { ...replacements, ...lockedDeck_replacements };

  lockedDeck_fieldAliases.forEach((field) => {
    const fieldAlias = `\`${modelName}.${field.slice(1, -1)}\``; //`cardLockedDeck.lockedDeck.id`
    fieldAliases.push(fieldAlias);
    sql.fields.push(`${lockedDeck_subqueryAlias}.${field} AS ${fieldAlias}`); //temp[RightPluralizedModelName].`lockedDeck.id` AS `cardLockedDeck.lockedDeck.id`
  });

  let connectionType: "LEFT" | "INNER" = "LEFT";
  if (!dontFilter && lockedDeck_SQL.filter) {
    connectionType = "INNER";
  }

  const lockedDeckJoin = new clsJoin(
    lockedDeck_SQL.sql(),
    "lockedDeckId",
    `\`${lockedDeck_modelName}.id\``, //`lockedDeck.id`
    lockedDeck_subqueryAlias, //temp[RightPluralizedModelName]
    connectionType
  );

  sql.joins.push(lockedDeckJoin);
  //Check if filtered by Locked deck
  if (query.deckId && query.deckId === "9") {
    filtered = true;
    /* sql.filter = filters.join(" AND "); */
  }

  return {
    sql,
    fieldAliases,
    replacements,
    subqueryAlias: "tempLockedDeckCard",
    modelName,
    filtered,
  };
}

//Generated by GetGetmodelsqlChildNext13 - getModelSQL child next 13
function getLockedDeckSQL(
  query: Partial<CardSearchParams>,
  dontFilter: boolean = false
) {
  //Do the card keyword portion first
  const table = "lockeddecks";
  const fields: (string | [string, string])[] =
    //Generated by GenerateSQLFieldList
    ["slug", "id", "name"];
  const fieldAliases: string[] = [];
  const modelName = "LockedDeck";
  let filtered = false;
  let replacements: Record<string, string> = {};

  let sql = new clsSQL();
  sql.source = table;

  //build the sql field name and aliases (aliases are used to destructure the object)
  processFields(fields, modelName, table, fieldAliases, sql);

  const filters: string[] = [];
  /*INSERT JOINS HERE*/

  if (filters.length > 0) {
    filtered = true;
    sql.filter = filters.join(" AND ");
  }

  return {
    sql,
    fieldAliases,
    replacements,
    subqueryAlias: "tempLockedDeck",
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

  let data: CardModel[] = await sequelize.query(sqlString, {
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

  //Generated by GetAllLeftModelReduceResultAndRemoveDuplicates
  //Generated by GetLeftModelReduceResultAndRemoveDuplicates - GetLeftModelReduceResultAndRemoveDuplicates
  data = reduceResult(data as any, [
    ["CardCardKeyword", "CardCardKeywords"],
  ]) as unknown as CardModel[];

  removeDuplicates(data as any, "CardCardKeywords", "id");
  //Generated by GetLeftModelReduceResultAndRemoveDuplicates - GetLeftModelReduceResultAndRemoveDuplicates
  data = reduceResult(data as any, [
    ["CardUnityCard", "CardUnityCards"],
  ]) as unknown as CardModel[];

  removeDuplicates(data as any, "CardUnityCards", "id");
  //Generated by GetLeftModelReduceResultAndRemoveDuplicates - GetLeftModelReduceResultAndRemoveDuplicates
  data = reduceResult(data as any, [
    ["LockedDeckCard", "LockedDeckCards"],
  ]) as unknown as CardModel[];

  removeDuplicates(data as any, "LockedDeckCards", "id");

  return NextResponse.json({
    rows: data,
    cursor,
    ...(fetchCount && { count: recordCount }),
  });
};

//Generated by GetSingleCreateModelPOSTRoute - GetSingleCreateModelPOSTRoute
export const POST = async (req: Request) => {
  const res = (await req.json()) as CardFormUpdatePayload;

  try {
    await CardSchema.validate(res);
  } catch (error) {
    return handleSequelizeError(error);
  }

  const t = await sequelize.transaction();

  try {
    const newCard = await createCard(res, t);
    const id = newCard[PRIMARY_KEY];

    //Generated by GetAllSimpleModelInserts
    //Generated by GetSimpleModelInserts - GetSimpleModelInserts
    const { newCardKeywords } = res;
    const CardCardKeywords = [];

    for (const item of newCardKeywords) {
      const newCardCardKeyword = await createCardCardKeyword(
        {
          cardId: newCard.id,
          cardKeywordId: item,
        },
        t
      );

      CardCardKeywords.push({
        cardKeywordId: item,
        id: newCardCardKeyword.id,
      });
    }

    await t.commit();

    return NextResponse.json({
      status: "success",
      id,
      slug: newCard.slug,
      //Generated by GetAllSimplePluralizedModelName
      CardCardKeywords, //Generated by GetSimplePluralizedModelName - GetSimplePluralizedModelName
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
