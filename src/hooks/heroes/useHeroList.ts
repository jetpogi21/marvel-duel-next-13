"use client";
import { GetHeroesResponse } from "@/interfaces/HeroInterfaces";
import { HeroSkillSearchParams } from "@/interfaces/HeroSkillInterfaces";
import axiosClient from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const getHeroes = async () => {
  const { data } = await axiosClient.get<GetHeroesResponse>(`heroes`, {
    params: {
      fetchCount: "false",
      simpleOnly: "true",
    } as Partial<HeroSkillSearchParams>,
  });

  return data.rows.map((item) => ({
    id: item.belongsto_id,
    name: item.heroName,
  }));
};

const useHeroList = () => {
  //local states
  const [mounted, setMounted] = useState(false);

  const _ = useQuery({
    queryKey: ["hero-list"],
    queryFn: getHeroes,
    enabled: mounted,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return _;
};

export default useHeroList;
