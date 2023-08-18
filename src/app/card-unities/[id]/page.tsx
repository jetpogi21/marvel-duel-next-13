//Generated by WriteToDetailPageNext13 - Detail Page Sidebar
import CardUnityForm from "@/components/card-unities/CardUnityForm";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Card Unity Form",
};

async function getData(id: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/card-unities/" + id,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw notFound();
  }

  return res.json();
}

const CardUnityFormPage = async ({ params }: { params: { id: string } }) => {
  const data = params.id === "new" ? null : await getData(params.id);

  return (
    <div className="flex flex-col flex-1 w-full px-4 mx-auto text-sm lg:px-0 main-height-less-footer">
      <div className="flex flex-col w-full h-full gap-4 p-4 border rounded-sm border-border">
        <div className="flex flex-col h-full">
          <CardUnityForm
            id={params.id}
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

export default CardUnityFormPage;
