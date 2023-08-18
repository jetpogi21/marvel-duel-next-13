//Generated by WriteToModelconstants_ts - ModelConstants.ts
import { LockedDeckCardFormikFilter } from "@/interfaces/LockedDeckCardInterfaces";

export const MODEL_NAME = "LockedDeckCard";
export const TABLE_NAME = "lockeddeckcards";
export const PLURALIZED_MODEL_NAME = "LockedDeckCards";
export const VERBOSE_MODEL_NAME = "Locked Deck Card";
export const PLURALIZED_VERBOSE_MODEL_NAME = "Locked Deck Cards";
export const DEFAULT_SORT_BY = "id";
export const DEFAULT_FILTERS: Partial<LockedDeckCardFormikFilter> = { 
//Generated by GetAllModelFilterDefaultBySeqModel
 
};
export const FIRST_FIELD_IN_FORM = "lockedDeckId"; //Generated by GetFirstFieldInForm
export const LAST_FIELD_IN_FORM = "cardId"; //Generated by GetLastFieldInForm
export const DEFAULT_FORM_VALUE = {
  //Generated by GetAllFormDefaultValueBySeqModel
id: "",//Generated by GetFormDefaultValue
lockedDeckId: "",//Generated by GetFormDefaultValue
cardId: "",//Generated by GetFormDefaultValue,
  touched: false,
};
export const PRIMARY_KEY = "id";
export const UNIQUE_FIELDS = [//Generated by GetAllUniqueFieldsBySeqModel
];
export const REQUIRED_FIELDS = { 
//Generated by GetAllRequiredFieldsBySeqModel
lockedDeckId: "Locked Deck",//Generated by GetRequiredField - Get Required Field
cardId: "Card",//Generated by GetRequiredField - Get Required Field 
};

//Generated by GetControlOptionsBySeqModel
export const CONTROL_OPTIONS = {
}

//Generated by GetCOLUMNSObject
export const COLUMNS = {id: {type: "number", db_name: "id"},//Generated by GetConstantFieldDictionary - Constant Field Dictionary
lockedDeckId: {type: "number", db_name: "lockedDeckId"},//Generated by GetConstantFieldDictionary - Constant Field Dictionary
cardId: {type: "number", db_name: "cardId"},//Generated by GetConstantFieldDictionary - Constant Field Dictionary
}