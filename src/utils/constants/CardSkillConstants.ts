//Generated by WriteToModelconstants_ts - ModelConstants.ts
import { CardSkillFormikFilter } from "@/interfaces/CardSkillInterfaces";

export const MODEL_NAME = "CardSkill";
export const TABLE_NAME = "marvelduel_cardskill";
export const PLURALIZED_MODEL_NAME = "CardSkills";
export const VERBOSE_MODEL_NAME = "Card Skill";
export const PLURALIZED_VERBOSE_MODEL_NAME = "Card Skills";
export const DEFAULT_SORT_BY = "name";
export const DEFAULT_FILTERS: Partial<CardSkillFormikFilter> = {
  //Generated by GetAllModelFilterDefaultBySeqModel
  q: "",
};
export const FIRST_FIELD_IN_FORM = "name"; //Generated by GetFirstFieldInForm
export const LAST_FIELD_IN_FORM = "description"; //Generated by GetLastFieldInForm
export const DEFAULT_FORM_VALUE = {
  //Generated by GetAllFormDefaultValueBySeqModel
  id: "", //Generated by GetFormDefaultValue
  name: "", //Generated by GetFormDefaultValue
  description: "", //Generated by GetFormDefaultValue,
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
  description: "Description", //Generated by GetRequiredField - Get Required Field
};

//Generated by GetControlOptionsBySeqModel
export const CONTROL_OPTIONS = {};

//Generated by GetCOLUMNSObject
export const COLUMNS = {
  id: { type: "number", db_name: "id" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  name: { type: "string", db_name: "name" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  description: { type: "string", db_name: "description" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
};
