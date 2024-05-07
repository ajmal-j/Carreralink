"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LineChart from "@/components/Charts/Line";
import { toast } from "@/components/ui/use-toast";
import { graphData } from "@/services/recruiter.service";
import { useEffect, useState } from "react";
import BarChart from "@/components/Charts/Bar";
import { getMessage } from "@/lib/utils";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const years: number[] = [];

const now = new Date().getFullYear();

for (let i = 2023; i <= now; i++) {
  years.push(i);
}

export default function RecruiterChart() {
  const [filter, setFilter] = useState<"yearly" | "monthly">("monthly");
  const [chart, setChart] = useState<"line" | "bar">("line");
  const [fields, setFields] = useState<Record<string, any>[]>([]);
  const [yearsData, setYearsData] = useState<Record<string, any>[] | null>(
    null,
  );
  const [monthsData, setMonthsData] = useState<Record<string, any>[] | null>(
    null,
  );

  const [data, setData] = useState<any>({
    labels: months,
    datasets: [
      {
        label: "Jobs",
        data: [],
        fill: true,
        borderColor: "hsl(268, 100%, 50%)",
        backgroundColor: "hsl(268, 100%, 50% , 0.5)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Applicants",
        data: [],
        fill: true,
        borderColor: "hsl(267, 100%, 64%)",
        backgroundColor: "hsl(267, 100%, 64% , 0.5)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  });

  const fetchData = async () => {
    try {
      const response = await graphData({
        filter,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
        duration: 500,
      });
    }
  };
  const setLabels = () =>
    setData((prev: any) => ({
      ...prev,
      labels: filter === "yearly" ? years : months,
    }));
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: `${filter} report`,
      },
    },
  };
  useEffect(() => {
    setData((prev: any) => ({
      ...prev,
      datasets: prev.datasets.map((dataset: any) => {
        const newData: number[] =
          fields.find((field) => field.label === dataset.label)?.data || [];
        return {
          ...dataset,
          data: newData,
        };
      }),
    }));
  }, [fields]);

  useEffect(() => {
    if (filter === "yearly" && yearsData) {
      setLabels();
      setFields(yearsData);
      return;
    }
    if (filter === "monthly" && monthsData) {
      setLabels();
      setFields(monthsData);
      return;
    }
    fetchData().then((data) => {
      if (data) {
        if (filter === "yearly") {
          setYearsData(data);
        } else if (filter === "monthly") {
          setMonthsData(data);
        }
        setLabels();
        setFields(data);
      }
    });
  }, [filter]);

  return (
    <div className="my-3">
      <div className="flex items-center justify-between gap-3">
        <RadioGroup
          defaultValue={chart}
          onValueChange={(val: "bar" | "line") => setChart(val)}
          className="flex gap-2"
        >
          <div
            className={`ms-auto flex items-center space-x-2 rounded-full px-2 py-1 ${chart === "line" && "bg-primaryColor text-white transition-colors duration-200"}`}
          >
            <RadioGroupItem value="line" id="line" />
            <Label htmlFor="line">Line</Label>
          </div>
          <div
            className={`ms-auto flex items-center space-x-2 rounded-full px-2 py-1 ${chart === "bar" && "bg-primaryColor text-white transition-colors duration-200"}`}
          >
            <RadioGroupItem value="bar" id="bar" />
            <Label htmlFor="bar">Bar</Label>
          </div>
        </RadioGroup>
        <RadioGroup
          defaultValue={filter}
          onValueChange={(val: "yearly" | "monthly") => setFilter(val)}
          className="flex gap-2"
        >
          <div className="ms-auto flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly">Monthly</Label>
          </div>
          <div className="ms-auto flex items-center space-x-2">
            <RadioGroupItem value="yearly" id="yearly" />
            <Label htmlFor="yearly">Yearly</Label>
          </div>
        </RadioGroup>
      </div>
      {chart === "line" ? (
        <LineChart options={options} data={data} />
      ) : (
        <BarChart options={options} data={data} />
      )}
    </div>
  );
}
