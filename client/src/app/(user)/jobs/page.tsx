import Search from "@/components/FormsAndDialog/Search";
import JobFilterSideBar from "@/components/Layout/JobFilterSideBar";
import { SingleJob } from "@/components/Utils/SingleJob";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: {
      id: 1,
      name: "Apple",
      logo: "https://images.crowdspring.com/blog/wp-content/uploads/2022/08/18131304/apple_logo_black.svg_.png",
    },
    location: "Cupertino, California, United States",
    type: "Full-time",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    pay: {
      minimum: 100000,
      maximum: 200000,
      rate: "per month",
    },
  },
  {
    id: 2,
    title: "Backend Developer",
    company: {
      id: 1,
      name: "Apple",
      logo: "https://images.crowdspring.com/blog/wp-content/uploads/2022/08/18131304/apple_logo_black.svg_.png",
    },
    location: "Cupertino, California, United States",
    type: "Full-time",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    pay: {
      minimum: 4000,
      maximum: 5000,
      rate: "per day",
    },
  },
  {
    id: 3,
    title: "Backend Developer",
    company: {
      id: 1,
      name: "Apple",
      logo: "https://images.crowdspring.com/blog/wp-content/uploads/2022/08/18131304/apple_logo_black.svg_.png",
    },
    location: "Cupertino, California, United States",
    type: "Full-time",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    pay: {
      minimum: 55000000,
      maximum: 60000000,
      rate: "per year",
    },
  },
];
interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
  };
}
export default function JobsList({
  searchParams: { q, location, type },
}: PageProps) {
  const defaultValues = { q, location, type };
  return (
    <div>
      <h1 className="mt-6 text-center text-4xl">All Jobs</h1>
      <Search action="/jobs" className="mt-10 max-w-[600px]" />
      <div className="mt-7 flex flex-col gap-3 lg:flex-row">
        <div className="flex min-w-full justify-between lg:block lg:min-w-[260px]">
          <h1 className="flex text-xl font-semibold text-foreground/80">
            Filter
          </h1>
          <JobFilterSideBar
            defaultValues={defaultValues}
            className="me-3 hidden lg:block"
          />
          <div className="inline-block lg:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <span className="flex cursor-pointer items-center px-3">
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <JobFilterSideBar defaultValues={defaultValues} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mt-10 w-full space-y-4">
          {jobs.map((job) => (
            <SingleJob key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
