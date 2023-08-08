import { DeckFormUpdatePayload, DeckModel } from "@/interfaces/DeckInterfaces";
import axiosClient from "@/utils/api";
import { PRIMARY_KEY } from "@/utils/constants/DeckConstants";
import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";

const BASE_URL = "decks";

type IndexAndID = {
  index: number;
  id: number | string;
};

type Response = {
  id: number | string;
  HeroSkills: IndexAndID[];
};

const updateDeck = async (
  payload: DeckFormUpdatePayload,
  id: string | number
) => {
  const { data } = await axiosClient({
    url: BASE_URL + "/" + id,
    method: "put",
    data: payload,
  });

  return data as Response;
};

const addDeck = async (payload: DeckFormUpdatePayload) => {
  const { data } = await axiosClient({
    url: BASE_URL,
    method: "post",
    data: payload,
  });

  return data as Response;
};

export const getDeck = async ({ queryKey }: { queryKey: [string, string] }) => {
  const { data } = await axiosClient.get<DeckModel>(
    `${BASE_URL}/${queryKey[1]}`
  );
  return data;
};

const addOrUpdateDeck = (payload: DeckFormUpdatePayload) => {
  if (payload[PRIMARY_KEY]) {
    return updateDeck(payload, payload[PRIMARY_KEY]);
  } else {
    return addDeck(payload);
  }
};

export const useDeckQuery = (
  slug: string,
  options?: Parameters<typeof useQuery>[2]
) => {
  const deckMutation = useMutation(addOrUpdateDeck);

  const deckQuery = useQuery(
    ["deck", slug],
    getDeck,
    //@ts-ignore
    options
  ) as UseQueryResult<DeckModel, any>;

  return { deckMutation, deckQuery };
};
