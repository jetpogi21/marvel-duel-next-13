//Generated by WriteToModeltable_tsx - ModelTable.tsx
"use client";
//Generated by GeneratePageFile
import React, { useEffect, useState } from "react";
import { getAxiosParams } from "@/utils/utilities";
import { useHeroSkillStore } from "@/hooks/hero-skills/useHeroSkillStore";
import {
  HeroSkillFormikInitialValues,
  HeroSkillSearchParams,
  HeroSkillUpdatePayload,
  GetHeroSkillsResponse,
  HeroSkillDeletePayload,
} from "@/interfaces/HeroSkillInterfaces";
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
import { HeroSkillArraySchema } from "@/schema/HeroSkillSchema";
import { toast } from "@/hooks/use-toast";
import {
  DEFAULT_FILTERS,
  DEFAULT_FORM_VALUE,
  DEFAULT_SORT_BY,
} from "@/utils/constants/HeroSkillConstants";
import { useHeroSkillDeleteDialog } from "@/hooks/hero-skills/useHeroSkillDeleteDialog";
import HeroSkillFormArray from "@/components/hero-skills/HeroSkillFormArray";

const HeroSkillTable: React.FC = () => {
  const { query } = useURL<HeroSkillSearchParams>();
  const queryClient = useQueryClient();

  ///Local States
  const [mounted, setMounted] = useState(false);

  //SearchParams Variables
  //Generated by GetAllSearchParamsBySeqModel
  const q = query["q"] || "";
  const type = query["type"] || "";
  const hero = query["hero"] || "";
  const sort = query["sort"] || DEFAULT_SORT_BY;
  const limit = query["limit"] || DEFAULT_LIMIT;

  //Page constants
  const DEFAULT_HEROSKILL = DEFAULT_FORM_VALUE;

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
  } = useHeroSkillStore();

  const [setRecordsToDelete, setIsDialogLoading, setMutate] =
    useHeroSkillDeleteDialog((state) => [
      state.setRecordsToDelete,
      state.setIsDialogLoading,
      state.setMutate,
    ]);

  //API Functions
  const getHeroSkills = async ({ pageParam = "" }) => {
    //First argument is the queries from the form, second one is so that the queries can be turned into the desired shape while the defaultFilters will be the searchParams not included from the from
    const axiosParams = getAxiosParams(
      {
        //Generated by GetAllFilterQueryNameBySeqModel
        q,
        type,
        hero,
      },
      DEFAULT_FILTERS,
      {
        cursor: pageParam,
        limit,
        sort,
        fetchCount: fetchCount.toString(),
      }
    ) as Partial<HeroSkillSearchParams>;

    const { data } = await axiosClient.get<GetHeroSkillsResponse>(
      `hero-skills`,
      {
        params: axiosParams,
      }
    );

    return data;
  };

  const updateHeroSkills = async (payload: HeroSkillUpdatePayload) => {
    const { data } = (await axiosClient({
      url: "hero-skills",
      method: "post",
      data: payload,
    })) as { data: { recordsCreated: number } };

    return data;
  };

  const deleteHeroSkills = async (payload: HeroSkillDeletePayload) => {
    const { data } = (await axiosClient({
      url: "hero-skills",
      method: "delete",
      data: payload,
    })) as { data: { recordsDeleted: number } };

    return data;
  };

  //API Functions end here

  //Tanstacks
  const { refetch } = useInfiniteQuery(["heroSkills"], getHeroSkills, {
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
            index,
            touched: false,
          })),
          {
            ...DEFAULT_HEROSKILL,
            index: data.pages[dataPageLength - 1].rows.length,
          },
        ]);
      } else {
        setLastPage(1);
        setPage(1);
        setCurrentData([
          ...data.pages[0].rows.map((item, index) => ({
            ...item,
            index,
            touched: false,
          })),
          {
            ...DEFAULT_HEROSKILL,
            index: data.pages[dataPageLength - 1].rows.length,
          },
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

  //Generated by GetMutationSnippets
  type MutationData = { recordsCreated?: number; recordsDeleted?: number };
  const useHandleMutation = (
    mutationFunction: (payload: any) => Promise<MutationData>,
    successCallback: (data: MutationData) => string,
    updateRecordCountCallback: (
      recordCount: number,
      data: MutationData
    ) => number
  ) => {
    const { mutate } = useMutation(mutationFunction, {
      onMutate: () => {
        setIsDialogLoading(true);
        setIsUpdating(true);
      },
      onSuccess: (data) => {
        toast({
          description: successCallback(data),
          variant: "success",
          duration: 2000,
        });
        resetRowSelection();
        setRecordCount(updateRecordCountCallback(recordCount, data));
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

    return mutate;
  };

  // Usage for deleteHeroSkillMutation
  const deleteHeroSkillMutation = useHandleMutation(
    deleteHeroSkills,
    (data) => {
      return "Hero Skill(s) deleted successfully";
    },
    (recordCount, data) => {
      return recordCount - (data.recordsDeleted || 0);
    }
  );

  // Usage for updateHeroSkills
  const updateHeroSkillsMutation = useHandleMutation(
    updateHeroSkills,
    (data) => {
      return "Hero Skill list updated successfully";
    },
    (recordCount, data) => {
      return (
        recordCount + (data.recordsCreated || 0) - (data.recordsDeleted || 0)
      );
    }
  );

  //Transformations
  const sliceQueryDataAndRefetch = (idx: number) => {
    queryClient.setQueryData(
      ["heroSkills"],
      (data: InfiniteData<GetHeroSkillsResponse> | undefined) => {
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
  const handleSubmit = async (values: HeroSkillFormikInitialValues) => {
    //The reference is the index of the row
    const HeroSkillsToBeSubmitted = values.HeroSkills.filter(
      (item) => item.touched
    );

    if (HeroSkillsToBeSubmitted.length > 0) {
      const payload: HeroSkillUpdatePayload = {
        HeroSkills: HeroSkillsToBeSubmitted,
      };

      updateHeroSkillsMutation(payload);
    }
  };

  useEffect(() => {
    setMounted(true);
    setMutate(deleteHeroSkillMutation);
  }, []);

  useEffect(() => {
    if (mounted) {
      sliceQueryDataAndRefetch(0);
    }
  }, [
    limit,
    sort, //Generated by GetAllFilterQueryNameBySeqModel
    q,
    type,
    hero,
  ]);

  return (
    <Formik
      initialValues={{
        HeroSkills: currentData,
      }}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      validationSchema={HeroSkillArraySchema}
      validateOnChange={false}
    >
      {(formik) => <HeroSkillFormArray formik={formik} />}
    </Formik>
  );
};

export default HeroSkillTable;
