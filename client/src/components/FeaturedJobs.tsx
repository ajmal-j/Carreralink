import Image from "next/image";
import PrimaryButton from "./PrimaryButton";

const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    icon: "https://cdn2.hubspot.net/hubfs/53/image8-2.jpg",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Facebook",
    location: "Menlo Park, CA",
    icon: "https://1000logos.net/wp-content/uploads/2017/02/Facebook-Logosu.png",
  },
  {
    id: 3,
    title: "Unit Test Engineer",
    company: "Apple",
    location: "San Francisco, CA",
    icon: "https://images.crowdspring.com/blog/wp-content/uploads/2022/08/18131304/apple_logo_black.svg_.png",
  },
];
export default function FeaturedJobs() {
  return (
    <div className="mt-6 flex flex-col items-center gap-2 rounded-xl border bg-background px-2 py-3">
      {jobs.map((job) => (
        <>
          <div className="flex w-full font-montserrat items-center justify-between rounded-lg bg-background px-5 py-2">
            <div className="flex-1">
              <p className="pb-2 text-lg  text-foreground/90">{job.title}</p>
              <p className="text-foreground/60">{job.company}</p>
              <p className="text-foreground/60">{job.location}</p>
            </div>
            <div className="flex h-[100px] items-center overflow-hidden rounded-xl bg-white">
              <Image
                alt="logo"
                className="rounded-lg"
                src={job.icon}
                width={100}
                height={100}
              />
            </div>
          </div>
        </>
      ))}
      <div className="me-5 ms-auto mt-5">
        <PrimaryButton className="px-5">View all</PrimaryButton>
      </div>
    </div>
  );
}
