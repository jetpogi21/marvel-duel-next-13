//Generated by WriteToModelsPage - Model Page Sidebar
import React from "react";
import LockedDeckFilterForm from "@/components/locked-decks/LockedDeckFilterForm";
import LockedDeckTable from "@/components/locked-decks/LockedDeckTable";

export const metadata = {
  title: "Locked Decks",
};

const LockedDecks: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 w-full px-4 mx-auto text-sm lg:px-0 main-height-less-footer">
      <div className="flex flex-col flex-1 w-full gap-4 p-4 border rounded-sm border-border">
        <h1 className="text-2xl font-bold">Locked Decks</h1>
        <div className="flex">
          <LockedDeckFilterForm />
        </div>
        <div className="flex flex-col flex-1 ">
          <LockedDeckTable />
        </div>
      </div>
    </div>
  );
};

export default LockedDecks;