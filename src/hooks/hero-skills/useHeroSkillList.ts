//Generated by GetuseModelListts - useModelList.ts
"use client";
import { GetHeroSkillsResponse } from "@/interfaces/HeroSkillInterfaces";
import { HeroSkillSearchParams } from "@/interfaces/HeroSkillInterfaces";
import { BasicModel } from "@/interfaces/GeneralInterfaces";
import axiosClient from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const getHeroSkills = async (useName: boolean = false) => {
  const { data } = await axiosClient.get<GetHeroSkillsResponse>(`hero-skills`, {
    params: {
      fetchCount: "false",
      simpleOnly: "true",
    } as Partial<HeroSkillSearchParams>,
  });

  return data.rows.map((item) => ({
    id: !useName ? item.id : item.name,
    name: item.name,
  }));
};

interface UseListProps {
  placeholderData?: BasicModel[];
  useName?: boolean;
}

const useHeroSkillList = (prop?: UseListProps) => {
  //local states
  const [mounted, setMounted] = useState(false);

  const _ = useQuery({
    queryKey: ["heroSkill-list"],
    queryFn: () => getHeroSkills(prop?.useName),
    enabled: mounted,
    placeholderData: prop?.placeholderData,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return _;
};

export default useHeroSkillList;
