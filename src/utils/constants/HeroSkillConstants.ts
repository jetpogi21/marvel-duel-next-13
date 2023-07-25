//Generated by WriteToModelconstants_ts
import { HeroSkillFormikFilter } from "@/interfaces/HeroSkillInterfaces";

export const MODEL_NAME = "HeroSkill";
export const TABLE_NAME = "marvelduel_heroskill";
export const PLURALIZED_MODEL_NAME = "HeroSkills";
export const DEFAULT_SORT_BY = "name";
export const DEFAULT_FILTERS: Partial<HeroSkillFormikFilter> = { //Generated by GetAllModelFilterDefaultBySeqModel
q: "" };
export const FIRST_FIELD_IN_FORM = "name";
export const LAST_FIELD_IN_FORM = "heroId";
export const DEFAULT_FORM_VALUE = {
  //Generated by GetAllFormDefaultValueBySeqModel
id: "",name: "",type: "",cost: "",description: "",heroId: "",
  touched: false,
};
export const PRIMARY_KEY = "id";
export const UNIQUE_FIELDS = [//Generated by GetAllUniqueFieldsBySeqModel
{ name: "Name" }];
export const REQUIRED_FIELDS = { //Generated by GetAllRequiredFieldsBySeqModel
name: "Name",type: "Type",description: "Description",heroId: "Hero" };
