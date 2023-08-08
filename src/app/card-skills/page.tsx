//Generated by WriteToModelsPage
import React from "react";
import CardSkillFilterForm from "@/components/card-skills/CardSkillFilterForm";
import CardSkillTable from "@/components/card-skills/CardSkillTable";
import { CardSkillDeleteDialog } from "@/components/card-skills/CardSkillDeleteDialog";

export const metadata = {
  title: "Card Skills",
};

const CardSkills: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 w-full max-w-screen-lg px-4 mx-auto text-sm lg:px-0">
      <div className="flex flex-col w-full gap-4 p-4 border rounded-sm border-border">
        <h1 className="text-2xl font-bold">Card Skills</h1>
        <div className="flex">
          <CardSkillFilterForm />
        </div>
        <div className="flex flex-col flex-1 ">
          <CardSkillTable />
        </div>
      </div>
      <CardSkillDeleteDialog />
    </div>
  );
};

export default CardSkills;