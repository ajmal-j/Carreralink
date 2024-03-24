import Markdown from "@/components/Custom/Markdown";
import Separator from "@/components/Custom/Separator";
import { getCompany } from "@/services/company.service";
import { ICompany } from "@/store/reducers/company.slice";


export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  let company: ICompany | null = {} as ICompany;
  try {
    const response = await getCompany(id);
    company = response?.data;
  } catch (error) {
    company = null;
    console.log(error);
  }
  return (
    <div className="mt-7 flex flex-col gap-5">
      <Separator />
      <div className="flex gap-5">
        <span className="w-[20%] font-semibold text-foreground/70">
          Founded
        </span>
        <div className="w-[80%]">
          <span className="font-semibold text-foreground before:pe-3 before:content-[':']">
            {company?.foundedOn}
          </span>
        </div>
      </div>
      <Separator />
      <div className="flex gap-5">
        <span className="w-[20%] font-semibold text-foreground/70">
          Company Size
        </span>
        <div className="w-[80%]">
          <span className="font-semibold text-foreground before:pe-3 before:content-[':']">
            More than {company?.size}{" "}
            <span className="hidden md:inline">employees.</span>
          </span>
        </div>
      </div>
      <Separator />
      <div>
        <h1 className="mb-3 text-center text-xl text-foreground/80">
          About {company?.name}
        </h1>
        <Markdown>{company?.description as string}</Markdown>
      </div>
    </div>
  );
}
