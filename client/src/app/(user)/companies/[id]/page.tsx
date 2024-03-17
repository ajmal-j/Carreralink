import Separator from "@/components/Utils/Separator";
const company = {
  name: "Apple",
  foundedOn: 1976,
  description:
    "Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services. It is considered one of the Big Five American information technology companies, alongside Amazon, Google, Facebook, and Microsoft. It was founded on April 1, 1976, by Steve Jobs, Steve Wozniak, and Jeff Bezos. The company's parent company, Apple Computer, was founded in 1971. It is one of the oldest technology companies in the world. It is one of the oldest companies in the world. It is one of the oldest companies in the world. It is one of the oldest companies in the world. The company's parent company, Apple Computer, was founded in 1971. It is one of the oldest technology companies in the world. It is one of the oldest companies in the world. It is one of the oldest companies in the world. It is one of the oldest companies in the world. ",
  size: 147000,
};

export default function Page() {
  return (
    <div className="mt-7 flex flex-col gap-5">
      <Separator />
      <div className="flex gap-5">
        <span className="w-[20%] font-semibold text-foreground/70">
          Founded
        </span>
        <div className="w-[80%]">
          <span className="font-semibold text-foreground before:pe-3 before:content-[':']">
            {company.foundedOn}
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
            More than {company.size}{" "}
            <span className="hidden md:inline">employees.</span>
          </span>
        </div>
      </div>
      <Separator />
      <div>
        <h1 className="mb-3 text-center text-xl text-foreground/80">
          About {company.name}
        </h1>
        <p className="text-foreground/70 before:ps-[20%]">
          {company.description}
        </p>
      </div>
    </div>
  );
}
