//Generated by WriteToModelconstants_ts
import { DeckFormikFilter } from "@/interfaces/DeckInterfaces";

export const MODEL_NAME = "Deck";
export const TABLE_NAME = "marvelduel_belongsto";
export const PLURALIZED_MODEL_NAME = "Decks";
export const VERBOSE_MODEL_NAME = "Deck";
export const PLURALIZED_VERBOSE_MODEL_NAME = "Decks";
export const DEFAULT_SORT_BY = "name";
export const DEFAULT_FILTERS: Partial<DeckFormikFilter> = {
  //Generated by GetAllModelFilterDefaultBySeqModel
  q: "",
  is_hero: false,
};
export const FIRST_FIELD_IN_FORM = "name";
export const LAST_FIELD_IN_FORM = "is_hero";
export const DEFAULT_FORM_VALUE = {
  //Generated by GetAllFormDefaultValueBySeqModel
  id: "",
  name: "",
  is_hero: false,
  touched: false,
};
export const PRIMARY_KEY = "id";
export const UNIQUE_FIELDS = [
  //Generated by GetAllUniqueFieldsBySeqModel
  { name: "Name" },
];
export const REQUIRED_FIELDS = {
  //Generated by GetAllRequiredFieldsBySeqModel
  name: "Name",
};

//Generated by GetCOLUMNSObject
export const COLUMNS = {
  id: { type: "number" },
  name: { type: "string" },
  is_hero: { type: "boolean" },
};
