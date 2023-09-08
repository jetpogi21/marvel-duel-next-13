//Generated by WriteToUsemodelquery_ts - useModelQuery.ts
import { CardFormUpdatePayload, CardModel } from "@/interfaces/CardInterfaces";
import axiosClient from "@/utils/api";
import { PRIMARY_KEY } from "@/utils/constants/CardConstants";
import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";

const BASE_URL = "cards";

type IndexAndID = {
  index: number;
  id: number | string;
};

type Response = {
  id?: number | string;
  slug?: string;
  //Generated by GetAllRelatedIndexAndID
  CardUnityCards: IndexAndID[];
  LockedDeckCards: IndexAndID[];
  //Generated by GetAllRelatedIDSimple
  //Generated by GetRelatedIDSimple - GetRelatedIDSimple
  CardCardKeywords: {
    cardKeywordId: number;
    id: number | string;
  }[];
};

const updateCard = async (
  payload: CardFormUpdatePayload,
  id: string | number
) => {
  const { data } = await axiosClient({
    url: BASE_URL + "/" + id,
    method: "put",
    data: payload,
  });

  return data as Response;
};

const addCard = async (payload: CardFormUpdatePayload) => {
  const { data } = await axiosClient({
    url: BASE_URL,
    method: "post",
    data: payload,
  });

  return data as Response;
};

export const getCard = async ({ queryKey }: { queryKey: [string, string] }) => {
  const { data } = await axiosClient.get<CardModel>(
    `${BASE_URL}/${queryKey[1]}`
  );
  return data;
};

const addOrUpdateCard = (payload: CardFormUpdatePayload) => {
  if (payload[PRIMARY_KEY]) {
    return updateCard(payload, payload[PRIMARY_KEY]);
  } else {
    return addCard(payload);
  }
};

export const useCardQuery = (
  slug: string,
  options?: Parameters<typeof useQuery>[2]
) => {
  const cardMutation = useMutation(addOrUpdateCard);

  const cardQuery = useQuery(
    ["card", slug],
    getCard,
    //@ts-ignore
    options
  ) as UseQueryResult<CardModel, any>;

  return { cardMutation, cardQuery };
};
