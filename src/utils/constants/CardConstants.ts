//Generated by WriteToModelconstants_ts - ModelConstants.ts
import { CardFormikFilter } from "@/interfaces/CardInterfaces";
import { convertDateToYYYYMMDD } from "@/utils/utilities";

export const MODEL_NAME = "Card";
export const TABLE_NAME = "marvelduel_card";
export const PLURALIZED_MODEL_NAME = "Cards";
export const VERBOSE_MODEL_NAME = "Card";
export const PLURALIZED_VERBOSE_MODEL_NAME = "Cards";
export const DEFAULT_SORT_BY = "name";
export const DEFAULT_FILTERS: Partial<CardFormikFilter> = {
  //Generated by GetAllModelFilterDefaultBySeqModel
  q: "",
  battleStyle: "", //Generated by GetModelFilterDefault
  cost: [], //Generated by GetModelFilterDefault
  deckId: "", //Generated by GetModelFilterDefault
  type: "", //Generated by GetModelFilterDefault
  cardKeyword: [], //Generated by GetModelFilterDefault
  hasUnity: false, //Generated by GetModelFilterDefault
};
export const FIRST_FIELD_IN_FORM = "name"; //Generated by GetFirstFieldInForm
export const LAST_FIELD_IN_FORM = "deckId"; //Generated by GetLastFieldInForm
export const DEFAULT_FORM_VALUE = {
  //Generated by GetAllFormDefaultValueBySeqModel
  id: "", //Generated by GetFormDefaultValue
  name: "", //Generated by GetFormDefaultValue
  type: "Character" as const, //Generated by GetFormDefaultValue
  cost: "2" as const, //Generated by GetFormDefaultValue
  battleStyle: null, //Generated by GetFormDefaultValue
  atk: "", //Generated by GetFormDefaultValue
  shield: "", //Generated by GetFormDefaultValue
  description: "", //Generated by GetFormDefaultValue
  deckId: "", //Generated by GetFormDefaultValue,
  touched: false,
};
export const PRIMARY_KEY = "id";
export const UNIQUE_FIELDS = [
  //Generated by GetAllUniqueFieldsBySeqModel
  { name: "Name" },
];
export const REQUIRED_FIELDS = {
  //Generated by GetAllRequiredFieldsBySeqModel
  name: "Name", //Generated by GetRequiredField - Get Required Field
  type: "Type", //Generated by GetRequiredField - Get Required Field
  cost: "Cost", //Generated by GetRequiredField - Get Required Field
  deckId: "Deck", //Generated by GetRequiredField - Get Required Field
};

//Generated by GetControlOptionsBySeqModel
export const CONTROL_OPTIONS = {
  type: [
    { id: "Character", name: "Character" },
    { id: "Weapon", name: "Weapon" },
    { id: "Power", name: "Power" },
    { id: "Tactic", name: "Tactic" },
  ], //Generated by GetFieldOptions
  cost: [
    { id: "2", name: "2" },
    { id: "3", name: "3" },
    { id: "4", name: "4" },
    { id: "5", name: "5" },
    { id: "6", name: "6" },
  ], //Generated by GetFieldOptions
  battleStyle: [
    { id: "Support", name: "Support" },
    { id: "Attack", name: "Attack" },
    { id: "Guardian", name: "Guardian" },
  ], //Generated by GetFieldOptions
};

//Generated by GetCOLUMNSObject
export const COLUMNS = {
  id: { type: "number", db_name: "id" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  name: { type: "string", db_name: "name" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  type: { type: "string", db_name: "type" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  cost: { type: "number", db_name: "cost" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  battleStyle: { type: "string", db_name: "battle_style" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  atk: { type: "number", db_name: "atk" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  shield: { type: "number", db_name: "shield" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  description: { type: "string", db_name: "description" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  deckId: { type: "number", db_name: "deck_id" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
};
