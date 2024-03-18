import { SingleJob } from "@/components/Utils/SingleJob";

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

export default function Jobs() {
  return (
    <div className="space-y-3 px-1">
      {jobs.map((job) => (
        <SingleJob key={job.id} job={job} />
      ))}
    </div>
  );
}
