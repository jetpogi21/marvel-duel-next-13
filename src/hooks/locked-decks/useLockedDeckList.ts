//Generated by GetuseModelListts - useModelList.ts
"use client";
import { GetLockedDecksResponse } from "@/interfaces/LockedDeckInterfaces";
import { LockedDeckSearchParams } from "@/interfaces/LockedDeckInterfaces";
import { BasicModel } from "@/interfaces/GeneralInterfaces";
import axiosClient from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const getLockedDecks = async (useName: boolean = false) => {
  const { data } = await axiosClient.get<GetLockedDecksResponse>(
    `locked-decks`,
    {
      params: {
        fetchCount: "false",
        simpleOnly: "true",
      } as Partial<LockedDeckSearchParams>,
    }
  );

  return data.rows.map((item) => ({
    id: !useName ? item.id : item.name,
    name: item.name,
  }));
};

interface UseListProps {
  placeholderData?: BasicModel[];
  useName?: boolean;
}

const useLockedDeckList = (prop?: UseListProps) => {
  //local states
  const [mounted, setMounted] = useState(false);

  const _ = useQuery({
    queryKey: ["lockedDeck-list"],
    queryFn: () => getLockedDecks(prop?.useName),
    enabled: mounted,
    placeholderData: prop?.placeholderData,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return _;
};

export default useLockedDeckList;
