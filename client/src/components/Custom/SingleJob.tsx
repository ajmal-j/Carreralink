import { formatMoney } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface IJob {
  id: number;
  title: string;
  company: {
    id: number;
    name: string;
    logo: string;
  };
  location: string;
  type: string;
  skills: string[];
  pay: {
    minimum: number;
    maximum: number;
    rate: string;
  };
}
export function SingleJob({ job }: { job: IJob }) {
  return (
    <div className="flex items-center gap-3">
      <Link href={`/companies/${job.id}`}>
        <div className="mb-auto mt-1 flex size-[50px] justify-center gap-3 rounded-full border bg-white md:size-[60px] ">
          <Image
            className="rounded-full object-contain object-center"
            src={job.company.logo}
            alt="Company logo"
            width={100}
            height={100}
          />
        </div>
      </Link>
      <Link href={`/jobs/${job.id}`} className="flex-1 ">
        <h1 className="font-semibold">{job.title}</h1>
        <p className="text-sm text-foreground/70">{job.company.name}</p>
        <p className="text-sm text-foreground/70">{job.type}</p>
        <p className="text-sm text-foreground/70">{job.location}</p>
      </Link>
      <div className="flex max-w-[20%] flex-grow flex-col justify-between">
        <p className="text-end ">
          <span className="block text-foreground/70">{job.pay.rate}</span>₹{" "}
          {formatMoney(job.pay.minimum)} - {formatMoney(job.pay.maximum)}
        </p>
        <p className="text-end text-sm text-foreground/70">1 day ago</p>
      </div>
    </div>
  );
}
