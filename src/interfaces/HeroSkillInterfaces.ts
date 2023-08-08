//Generated by WriteToModelinterface_ts

import { ListQuery } from "./interface";

export interface HeroSkillModel {
  //Generated by GetAllModelFieldTypeBySeqModel
  id: number | string;
  name: string;
  type: "Active" | "Passive";
  cost?: number | string;
  description: string;
  heroId: number | string;
}

//The keys after the updatedAt is generated by GetAllRelatedModelNameBySeqModel
export interface HeroSkillFormikShape
  extends Omit<HeroSkillModel, "slug" | "createdAt" | "updatedAt"> {
  touched: boolean;
  index: number;
}

//Use for continuos list form
export interface HeroSkillFormikInitialValues {
  HeroSkills: HeroSkillFormikShape[];
}

//The FormikInitialValues is generated by GetAllRelatedFormikInitialValues
export interface HeroSkillFormFormikInitialValues
  extends Omit<HeroSkillFormikShape, "touched"> {}

export interface HeroSkillUpdatePayload {
  HeroSkills: Omit<HeroSkillFormikShape, "touched">[];
}

export interface HeroSkillDeletePayload {
  deletedHeroSkills: string[] | number[];
}

//Use for single form (with children)
//The Omitted keys will be generated by GetAllOmittedModelFormKeys (should be replaced by the Payload version)
//The Related Models will be replaced by the Payload version
export interface HeroSkillFormUpdatePayload
  extends Omit<HeroSkillFormFormikInitialValues, ""> {}

export interface HeroSkillFormikFilter {
  //Generated by GetAllFilterInterfaceBySeqmodel
  q: string;
  type: string;
  hero: string[];
}

export interface HeroSkillSearchParams
  extends ListQuery,
    Omit<
      HeroSkillFormikFilter, //Generated by GetAllNonStringFilterNames
      "hero"
    > {
  //Generated by GetAllNonStringFilterTypes
  hero: string;
}

export interface GetHeroSkillsResponse {
  count: number;
  rows: HeroSkillModel[];
  cursor: string;
}