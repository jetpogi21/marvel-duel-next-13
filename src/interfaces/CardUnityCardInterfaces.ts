//Generated by WriteToModelinterface_ts - ModelInterface.ts Next 13

//Generated by GetAllRelatedRightModelImport
import { CardUnityModel } from "@/interfaces/CardUnityInterfaces"; //Generated by GetRelatedRightModelImport - GetRelatedRightModelImport
import { CardModel } from "@/interfaces/CardInterfaces"; //Generated by GetRelatedRightModelImport - GetRelatedRightModelImport
import { ListQuery } from "./interface";

export interface CardUnityCardModel {
  //Generated by GetAllModelFieldTypeBySeqModel
  description: string; //Generated by GetModelFieldType
  CardUnityId: number | string; //Generated by GetModelFieldType
  CardId: number | string; //Generated by GetModelFieldType
  id: number | string; //Generated by GetModelFieldType
  createdAt: string;
  updatedAt: string;

  //Generated by GetAllRelatedRightModelInterface
  CardUnity: CardUnityModel; //Generated by GetRelatedRightModelInterface - GetRelatedRightModelInterface
  Card: CardModel; //Generated by GetRelatedRightModelInterface - GetRelatedRightModelInterface
}

//The keys after the updatedAt is generated by GetAllRelatedModelNameBySeqModel - RelatedModelName
export interface CardUnityCardFormikShape
  extends Omit<
    CardUnityCardModel,
    | "slug"
    | "createdAt"
    | "updatedAt"
    | "CardUnity" //Generated by GetRelatedRightModelName - GetRelatedRightModelName
    | "Card" //Generated by GetRelatedRightModelName - GetRelatedRightModelName
  > {
  touched: boolean;
  index: number;
}

//Use for continuos list form
export interface CardUnityCardFormikInitialValues {
  CardUnityCards: CardUnityCardFormikShape[];
}

//The FormikInitialValues is generated by GetAllRelatedFormikInitialValues - ModelFormikInitialValue
export interface CardUnityCardFormFormikInitialValues
  extends Omit<CardUnityCardFormikShape, "touched" | "index"> {}

//The extends portion is generated by GetModelUpdatePayloadExtension - GetRelatedPartialPayload
export interface CardUnityCardUpdatePayload {
  CardUnityCards: Omit<CardUnityCardFormikShape, "touched">[];
}

export interface CardUnityCardDeletePayload {
  deletedCardUnityCards: string[] | number[];
}

//Use for single form (with children)
//The Related Models will be replaced by the Payload version
export interface CardUnityCardFormUpdatePayload
  extends Omit<CardUnityCardFormikShape, "touched" | "index"> {}

export interface CardUnityCardFormikFilter {
  //Generated by GetAllFilterInterfaceBySeqmodel
  q: string;
  card: string; //Generated by GetThisFilterInterface
}

export interface CardUnityCardSearchParams
  extends ListQuery,
    Omit<CardUnityCardFormikFilter, ""> {
  //Generated by GetAllNonStringFilterTypes
}

export interface GetCardUnityCardsResponse {
  count: number;
  rows: CardUnityCardModel[];
  cursor: string;
}
