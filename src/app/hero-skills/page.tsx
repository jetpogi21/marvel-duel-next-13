//Generated by WriteToModelsPage - Model Page Sidebar
import React from "react";
import HeroSkillFilterForm from "@/components/hero-skills/HeroSkillFilterForm";
import HeroSkillTable from "@/components/hero-skills/HeroSkillTable";

export const metadata = {
  title: "Hero Skills",
};

const HeroSkills: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 w-full px-4 mx-auto text-sm lg:px-0 main-height-less-footer">
      <div className="flex flex-col flex-1 w-full gap-4 p-4 mx-auto border rounded-sm border-border">
        <h1 className="text-2xl font-bold">Hero Skills</h1>
        <div className="flex">
          <HeroSkillFilterForm />
        </div>
        <div className="flex flex-col flex-1 ">
          <HeroSkillTable />
        </div>
      </div>
    </div>
  );
};

export default HeroSkills;
