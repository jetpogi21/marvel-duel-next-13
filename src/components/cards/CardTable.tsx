//Generated by WriteToModeltable_tsx - ModelTable.tsx for Table
"use client";
import React, { useEffect, useState } from "react";
import { getAxiosParams } from "@/utils/utilities";
import { useCardStore } from "@/hooks/cards/useCardStore";
import {
  CardSearchParams,
  GetCardsResponse,
} from "@/interfaces/CardInterfaces";
import axiosClient from "@/utils/api";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DEFAULT_LIMIT } from "@/utils/constants";
import { useURL } from "@/hooks/useURL";
import {
  DEFAULT_FILTERS,
  DEFAULT_SORT_BY,
} from "@/utils/constants/CardConstants";
import CardDataTable from "@/components/cards/CardDataTable";

const CardTable: React.FC = () => {
  const { query } = useURL<CardSearchParams>();
  const queryClient = useQueryClient();

  ///Local States
  const [mounted, setMounted] = useState(false);

  //SearchParams Variables
  //Generated by GetAllSearchParamsBySeqModel
  const q = query["q"] || "";
  const battleStyle = query["battleStyle"] || "";
  const cost = query["cost"] || "";
  const deckId = query["deckId"] || "";
  const type = query["type"] || "";
  const cardKeyword = query["cardKeyword"] || "";
  const sort = query["sort"] || DEFAULT_SORT_BY;
  const limit = query["limit"] || DEFAULT_LIMIT;

  //Page constants

  //Store Variables
  const {
    setRecordCount,
    lastPage,
    setLastPage,
    setPage,
    fetchCount,
    setFetchCount,
    setCurrentData,
  } = useCardStore((state) => ({
    setRecordCount: state.setRecordCount,
    lastPage: state.lastPage,
    setLastPage: state.setLastPage,
    setPage: state.setPage,
    fetchCount: state.fetchCount,
    setFetchCount: state.setFetchCount,
    setCurrentData: state.setCurrentData,
  }));

  //API Functions
  const getCards = async ({ pageParam = "" }) => {
    //First argument is the queries from the form, second one is so that the queries can be turned into the desired shape while the defaultFilters will be the searchParams not included from the from
    const axiosParams = getAxiosParams(
      {
        //Generated by GetAllFilterQueryNameBySeqModel
        q,
        battleStyle,
        cost,
        deckId,
        type,
        cardKeyword,
      },
      DEFAULT_FILTERS,
      {
        cursor: pageParam,
        limit,
        sort,
        fetchCount: fetchCount.toString(),
      }
    ) as Partial<CardSearchParams>;

    const { data } = await axiosClient.get<GetCardsResponse>(`cards`, {
      params: axiosParams,
    });

    return data;
  };

  //API Functions end here

  //Tanstacks
  const { refetch } = useInfiniteQuery(["cards"], getCards, {
    getNextPageParam: (lastPage) => lastPage.cursor ?? undefined,
    onSuccess: (data) => {
      const dataPageLength = data.pages.length;
      const dataLastPageRowCount = data.pages[dataPageLength - 1].count;

      if (dataPageLength > lastPage) {
        setLastPage(dataPageLength);
        setPage(dataPageLength);
        setCurrentData([
          ...data.pages[dataPageLength - 1].rows.map((item, index) => ({
            ...item,
          })),
        ]);
      } else {
        setLastPage(1);
        setPage(1);
        setCurrentData([
          ...data.pages[0].rows.map((item, index) => ({
            ...item,
          })),
        ]);
      }

      if (dataLastPageRowCount) {
        setFetchCount(false);
        setRecordCount(dataLastPageRowCount);
      }
    },
    enabled: mounted,
    staleTime: Infinity,
  });

  //Transformations
  const sliceQueryDataAndRefetch = (idx: number) => {
    queryClient.setQueryData(
      ["cards"],
      (data: InfiniteData<GetCardsResponse> | undefined) => {
        return data
          ? {
              pages: data.pages.slice(0, idx + 1),
              pageParams: data.pageParams.slice(0, idx + 1),
            }
          : undefined;
      }
    );
    refetch();
  };

  //Client Actions

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      sliceQueryDataAndRefetch(0);
    }
  }, [
    limit,
    sort, //Generated by GetAllFilterQueryNameBySeqModel
    q,
    battleStyle,
    cost,
    deckId,
    type,
    cardKeyword,
  ]);

  return <CardDataTable />;
};

export default CardTable;
