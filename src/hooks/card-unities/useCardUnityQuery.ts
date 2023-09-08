//Generated by WriteToUsemodelquery_ts - useModelQuery.ts
import {
  CardUnityFormUpdatePayload,
  CardUnityModel,
} from "@/interfaces/CardUnityInterfaces";
import axiosClient from "@/utils/api";
import { PRIMARY_KEY } from "@/utils/constants/CardUnityConstants";
import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";

const BASE_URL = "card-unities";

type IndexAndID = {
  index: number;
  id: number | string;
};

type Response = {
  id?: number | string;
  slug?: string;
  //Generated by GetAllRelatedIndexAndID
  CardUnityCards: IndexAndID[];
};

const updateCardUnity = async (
  payload: CardUnityFormUpdatePayload,
  id: string | number
) => {
  const { data } = await axiosClient({
    url: BASE_URL + "/" + id,
    method: "put",
    data: payload,
  });

  return data as Response;
};

const addCardUnity = async (payload: CardUnityFormUpdatePayload) => {
  const { data } = await axiosClient({
    url: BASE_URL,
    method: "post",
    data: payload,
  });

  return data as Response;
};

export const getCardUnity = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const { data } = await axiosClient.get<CardUnityModel>(
    `${BASE_URL}/${queryKey[1]}`
  );
  return data;
};

const addOrUpdateCardUnity = (payload: CardUnityFormUpdatePayload) => {
  if (payload[PRIMARY_KEY]) {
    return updateCardUnity(payload, payload[PRIMARY_KEY]);
  } else {
    return addCardUnity(payload);
  }
};

export const useCardUnityQuery = (
  slug: string,
  options?: Parameters<typeof useQuery>[2]
) => {
  const cardUnityMutation = useMutation(addOrUpdateCardUnity);

  const cardUnityQuery = useQuery(
    ["cardUnity", slug],
    getCardUnity,
    //@ts-ignore
    options
  ) as UseQueryResult<CardUnityModel, any>;

  return { cardUnityMutation, cardUnityQuery };
};
