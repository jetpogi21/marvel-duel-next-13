//Generated by WriteToModelinterface_ts
import { ListQuery } from "./interface";

export interface CardSkillModel {
  //Generated by GetAllModelFieldTypeBySeqModel
id: number | string;name: string;description: string;
}

export interface CardSkillFormikShape extends Omit<CardSkillModel, "slug" | "createdAt" | "updatedAt"> {
  touched: boolean;
}

export interface CardSkillFormikInitialValues {
  CardSkills: CardSkillFormikShape[];
}

export interface CardSkillUpdatePayload {
  CardSkills: Partial<Omit<CardSkillFormikShape, "touched">>[];
  deletedCardSkills: number[] | string[];
}

export interface CardSkillFormikFilter {
  //Generated by GetAllFilterInterfaceBySeqmodel
q: string
}

export interface CardSkillSearchParams
  extends ListQuery,
    Omit<CardSkillFormikFilter, ""> {
  //Generated by GetAllNonStringFilterTypes

}

export interface GetCardSkillsResponse {
  count: number;
  rows: CardSkillModel[];
  cursor: string;
}
