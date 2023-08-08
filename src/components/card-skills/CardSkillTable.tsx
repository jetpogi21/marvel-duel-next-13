//Generated by WriteToModeltable_tsx
"use client";
//Generated by GeneratePageFile
import React, { useEffect, useState } from "react";
import { getAxiosParams } from "@/utils/utilities";
import { useCardSkillStore } from "@/hooks/card-skills/useCardSkillStore";
import {
  CardSkillFormikInitialValues,
  CardSkillSearchParams,
  CardSkillUpdatePayload,
  GetCardSkillsResponse,
} from "@/interfaces/CardSkillInterfaces";
import axiosClient from "@/utils/api";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { DEFAULT_LIMIT } from "@/utils/constants";
import { useURL } from "@/hooks/useURL";
import { Formik } from "formik";
import { CardSkillArraySchema } from "@/schema/CardSkillSchema";
import { toast } from "@/hooks/use-toast";
import {
  DEFAULT_FILTERS,
  DEFAULT_FORM_VALUE,
  DEFAULT_SORT_BY,
} from "@/utils/constants/CardSkillConstants";
import { useCardSkillDeleteDialog } from "@/hooks/card-skills/useCardSkillDeleteDialog";
import CardSkillFormArray from "@/components/card-skills/CardSkillFormArray";

const CardSkillTable: React.FC = () => {
  const { query } = useURL<CardSkillSearchParams>();
  const queryClient = useQueryClient();

  ///Local States
  const [mounted, setMounted] = useState(false);

  //SearchParams Variables
  //Generated by GetAllSearchParamsBySeqModel
const q = query["q"] || ""
  const sort = query["sort"] || DEFAULT_SORT_BY;
  const limit = query["limit"] || DEFAULT_LIMIT;

  //Page constants
  const DEFAULT_CARDSKILL = DEFAULT_FORM_VALUE;

  //Store Variables
  const {
    recordCount,
    setRecordCount,
    lastPage,
    setLastPage,
    setPage,
    fetchCount,
    setFetchCount,
    resetRowSelection,
    currentData,
    setCurrentData,
    setIsUpdating,
  } = useCardSkillStore();

  const [setRecordsToDelete, setIsDialogLoading, setMutate] =
    useCardSkillDeleteDialog((state) => [
      state.setRecordsToDelete,
      state.setIsDialogLoading,
      state.setMutate,
    ]);

  //API Functions
  const getCardSkills = async ({ pageParam = "" }) => {
    //First argument is the queries from the form, second one is so that the queries can be turned into the desired shape while the defaultFilters will be the searchParams not included from the from
    const axiosParams = getAxiosParams({ q }, DEFAULT_FILTERS, {
      cursor: pageParam,
      limit,
      sort,
      fetchCount: fetchCount.toString(),
    }) as Partial<CardSkillSearchParams>;

    const { data } = await axiosClient.get<GetCardSkillsResponse>(`card-skills`, {
      params: axiosParams,
    });

    return data;
  };

  const updateCardSkills = async (payload: CardSkillUpdatePayload) => {
    const { data } = await axiosClient({
      url: "card-skills",
      method: "post",
      data: payload,
    });

    return data;
  };
  //API Functions end here

  //Tanstacks
  const { refetch } = useInfiniteQuery(["cardSkills"], getCardSkills, {
    getNextPageParam: (lastPage) => lastPage.cursor ?? undefined,
    onSuccess: (data) => {
      const dataPageLength = data.pages.length;
      const dataLastPageRowCount = data.pages[dataPageLength - 1].count;

      if (dataPageLength > lastPage) {
        setLastPage(dataPageLength);
        setPage(dataPageLength);
        setCurrentData([
          ...data.pages[dataPageLength - 1].rows.map((item) => ({
            ...item,
            touched: false,
          })),
          { ...DEFAULT_CARDSKILL },
        ]);
      } else {
        setLastPage(1);
        setPage(1);
        setCurrentData([
          ...data.pages[0].rows.map((item) => ({
            ...item,
            touched: false,
          })),
          { ...DEFAULT_CARDSKILL },
        ]);
      }

      if (dataLastPageRowCount) {
        setFetchCount(false);
        setRecordCount(dataLastPageRowCount);
      }
    },
    enabled: mounted,
  });

  const { mutate } = useMutation(updateCardSkills, {
    onMutate: () => {
      setIsDialogLoading(true);
      setIsUpdating(true);
    },
    onSuccess: (data: { recordsCreated: number; recordsDeleted: number }) => {
      toast({
        description: "Card Skill list updated successfully",
        variant: "success",
        duration: 2000,
      });

      //Refetch the current page
      resetRowSelection();
      setRecordCount(recordCount + data.recordsCreated - data.recordsDeleted);
      sliceQueryDataAndRefetch(0);
    },
    onError: (error) => {
      const responseText =
        //@ts-ignore
        error?.response?.statusText || "Something went wrong with the app";
      toast({
        description: responseText,
        variant: "destructive",
        duration: 2000,
      });
    },
    onSettled: () => {
      setIsDialogLoading(false);
      setIsUpdating(false);
      setRecordsToDelete([]);
    },
  });

  //Transformations
  const sliceQueryDataAndRefetch = (idx: number) => {
    queryClient.setQueryData(
      ["cardSkills"],
      (data: InfiniteData<GetCardSkillsResponse> | undefined) => {
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
  const handleSubmit = async (values: CardSkillFormikInitialValues) => {
    //The reference is the index of the row
    const CardSkillsToBeSubmitted = values.CardSkills.filter((item) => item.touched);

    if (CardSkillsToBeSubmitted.length > 0) {
      const payload: CardSkillUpdatePayload = {
        CardSkills: CardSkillsToBeSubmitted,
        deletedCardSkills: [],
      };

      mutate(payload);
    }
  };

  useEffect(() => {
    setMounted(true);
    setMutate(mutate);
  }, []);

  useEffect(() => {
    if (mounted) {
      sliceQueryDataAndRefetch(0);
    }
  }, [limit, sort, //Generated by GetAllFilterQueryNameBySeqModel
q]);

  return (
    <Formik
      initialValues={{
        CardSkills: currentData,
      }}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      validationSchema={CardSkillArraySchema}
      validateOnChange={false}
    >
      {(formik) => <CardSkillFormArray formik={formik} />}
    </Formik>
  );
};

export default CardSkillTable;