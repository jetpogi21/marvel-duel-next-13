import clsSQL from "@/utils/clsSQL";
import { splitWordByLastHyphen } from "@/utils/utils";

export function getSortedValue(
  sort: string | undefined,
  deckAttributes: string[],
  DEFAULT_SORT_BY: string
): string {
  if (sort) {
    const isSortValid =
      deckAttributes.includes(sort) ||
      deckAttributes.includes(sort.substring(1));
    return isSortValid ? sort : DEFAULT_SORT_BY;
  } else {
    return DEFAULT_SORT_BY;
  }
}

type DataItem = {
  [key: string]: any;
};

export function getCursorString(
  sortField: string,
  PRIMARY_KEY: string,
  data: DataItem[]
): string {
  let cursor: string;

  if (sortField !== PRIMARY_KEY) {
    //@ts-ignore
    cursor = `${data[data.length - 1][sortField].toString()}-${data[
      data.length - 1
    ][PRIMARY_KEY].toString()}`;
  } else {
    cursor = `${data[data.length - 1][sortField].toString()}`;
  }

  return cursor;
}

export function addCursorFilterToQuery(
  cursor: string,
  sort: string,
  sortField: string,
  PRIMARY_KEY: string,
  replacements: Record<string, any>,
  filters: string[]
): void {
  const cursorCondition = sort.includes("-") ? "<" : ">";
  if (sortField !== PRIMARY_KEY) {
    const cursorArray = splitWordByLastHyphen(cursor); // Make sure to define splitWordByLastHyphen function
    filters.push(
      `(${sortField} ${cursorCondition} :cursorArray0 OR (${sortField} = :cursorArray0 AND ${PRIMARY_KEY} > :cursorArray1))`
    );
    replacements["cursorArray0"] = cursorArray[0];
    replacements["cursorArray1"] = cursorArray[1];
  } else {
    filters.push(`${sortField} ${cursorCondition} :cursor`);
    replacements["cursor"] = cursor;
  }
}

type Field = string | [string, string];

export function appendFieldsToSQL(
  fields: Field[],
  sql: clsSQL,
  table: string
): void {
  fields.forEach((field) => {
    let fieldName, fieldAlias;
    if (Array.isArray(field)) {
      fieldAlias = `\`${field[1]}\``;
      fieldName = `\`${field[0]}\``;
    } else {
      fieldAlias = `\`${field}\``;
      fieldName = `\`${field}\``;
    }

    sql.fields.push(`${table}.${fieldName} AS ${fieldAlias}`);
  });
}

export function resetSQL(sql: clsSQL) {
  sql.limit = 0;
  sql.orderBy = [];
  sql.filter = "";
  sql.groupBy = [];
}

export function processFields(
  fields: (string | [string, string])[],
  modelName: string,
  table: string,
  fieldAliases: string[],
  sql: clsSQL
): void {
  fields.forEach((field) => {
    let fieldAlias, fieldName;
    if (Array.isArray(field)) {
      fieldAlias = `\`${modelName}.${field[1]}\``;
      fieldName = field[0];
    } else {
      fieldAlias = `\`${modelName}.${field}\``;
      fieldName = field;
    }

    fieldAliases.push(fieldAlias);
    sql.fields.push(`${table}.${fieldName} AS ${fieldAlias}`);
  });
}
