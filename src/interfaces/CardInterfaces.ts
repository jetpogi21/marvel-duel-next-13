//Generated by WriteToModelinterface_ts - ModelInterface.ts Next 13
//Generated by GetAllRelatedInterfaceImportBySeqModel
//Generated by GetRelatedInterfaceImport - RelatedInterfaceImport
import {
  CardCardKeywordFormikInitialValues,
  CardCardKeywordFormikShape,
  CardCardKeywordModel,
  CardCardKeywordUpdatePayload,
} from "@/interfaces/CardCardKeywordInterfaces"; //Generated by GetRelatedInterfaceImport - RelatedInterfaceImport
import {
  CardUnityCardFormikInitialValues,
  CardUnityCardFormikShape,
  CardUnityCardModel,
  CardUnityCardUpdatePayload,
} from "@/interfaces/CardUnityCardInterfaces";
//Generated by GetAllRelatedRightModelImport
import { DeckModel } from "@/interfaces/DeckInterfaces"; //Generated by GetRelatedRightModelImport - GetRelatedRightModelImport
import { ListQuery } from "./interface";

export interface CardModel {
  //Generated by GetAllModelFieldTypeBySeqModel
  id: number | string; //Generated by GetModelFieldType
  name: string; //Generated by GetModelFieldType
  type: "Character" | "Weapon" | "Power" | "Tactic"; //Generated by GetModelFieldType
  cost: number | string; //Generated by GetModelFieldType
  battleStyle: "Support" | "Attack" | "Guardian" | null; //Generated by GetModelFieldType
  atk: number | string | null; //Generated by GetModelFieldType
  shield: number | string | null; //Generated by GetModelFieldType
  description: string | null; //Generated by GetModelFieldType
  deckId: number | string; //Generated by GetModelFieldType
  slug: string;
  //Generated by GetAllChildModelInterfaceBySeqModel
  CardCardKeywords: CardCardKeywordModel[]; //Generated by GetChildModelInterface - ChildModelInterface
  CardUnityCards: CardUnityCardModel[]; //Generated by GetChildModelInterface - ChildModelInterface

  //Generated by GetAllRelatedRightModelInterface
  Deck: DeckModel; //Generated by GetRelatedRightModelInterface - GetRelatedRightModelInterface
}

//The keys after the updatedAt is generated by GetAllRelatedModelNameBySeqModel - RelatedModelName
export interface CardFormikShape
  extends Omit<
    CardModel,
    | "slug"
    | "createdAt"
    | "updatedAt"
    | "CardCardKeywords" //Generated by GetRelatedPluralizedModelName - RelatedPluralizedModelName
    | "CardUnityCards" //Generated by GetRelatedPluralizedModelName - RelatedPluralizedModelName
    | "Deck" //Generated by GetRelatedRightModelName - GetRelatedRightModelName
  > {
  touched: boolean;
  index: number;
}

//Use for continuos list form
export interface CardFormikInitialValues {
  Cards: CardFormikShape[];
}

//The FormikInitialValues is generated by GetAllRelatedFormikInitialValues - ModelFormikInitialValue
export interface CardFormFormikInitialValues
  extends Omit<CardFormikShape, "touched" | "index"> {
  //Generated by GetAllSimpleRelatedKey
  //Generated by GetSimpleRelatedKey - GetSimpleRelatedKey
  CardCardKeywords: string[] | number[];
}

//The extends portion is generated by GetModelUpdatePayloadExtension - GetRelatedPartialPayload
export interface CardUpdatePayload
  extends Partial<CardCardKeywordUpdatePayload> {
  Cards: Omit<CardFormikShape, "touched">[];
}

export interface CardDeletePayload {
  deletedCards: string[] | number[];
}

//Use for single form (with children)
//The Related Models will be replaced by the Payload version
export interface CardFormUpdatePayload
  extends Omit<
    CardFormikShape,
    | "touched"
    | "index" //Generated by GetAllSimplePluralizedFieldName
    | "CardCardKeywords" //Generated by GetSimplePluralizedFieldName - GetSimplePluralizedFieldName
  > {
  //Generated by GetAllSimpleRelatedKeyPayload
  //Generated by GetSimpleRelatedKeyPayload - GetSimpleRelatedKeyPayload
  deletedCardCardKeywords: string[];
  newCardKeywords: string[];
}

export interface CardFormikFilter {
  //Generated by GetAllFilterInterfaceBySeqmodel
  q: string;
  battleStyle: string; //Generated by GetThisFilterInterface
  cost: string[]; //Generated by GetThisFilterInterface
  deckId: string; //Generated by GetThisFilterInterface
  type: string; //Generated by GetThisFilterInterface
  cardKeyword: string[]; //Generated by GetThisFilterInterface
}

export interface CardSearchParams
  extends ListQuery,
    Omit<
      CardFormikFilter, //Generated by GetAllNonStringFilterNames
      "cost" | "cardKeyword"
    > {
  //Generated by GetAllNonStringFilterTypes
  cost: string; //Generated by GetThisFilterInterface
  cardKeyword: string; //Generated by GetThisFilterInterface
}

export interface GetCardsResponse {
  count: number;
  rows: CardModel[];
  cursor: string;
}
