"use client";

import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { IResponseData } from "@/types/paginateResponse";
import { deleteJobs, deleteUsers, toggleBlock } from "@/services/admin.service";
import { getMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PopoverClose } from "@radix-ui/react-popover";
import { toast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { PaginationComponent } from "@/components/Custom/Pagination";

export type Jobs = {
  _id: string;
  title: string;
  company: string;
  status: string;
  applicants: string[];
};

interface ITableProps {
  jobs: Jobs[];
  query: Record<string, any>;
  options: IResponseData;
  total: number;
}

export function JobsTable({ jobs = [], query, options, total }: ITableProps) {
  const [data, setData] = useState(jobs);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { push } = useRouter();
  const toggleJobStatus = async ({ job }: { job: Jobs }) => {
    try {
      //   await toggleBlock({ email: job.email });
      toast({
        title: `Job ${job.status === "open" ? "Closed" : "Reopened"} successfully.`,
      });
      setData((prev) =>
        prev.map((j) =>
          j._id === job._id
            ? { ...j, status: j.status === "open" ? "closed" : "open" }
            : j,
        ),
      );
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteJob = async (jobs: string[]) => {
    try {
      if (!jobs) return toast({ title: "Job's not found." });
      await deleteJobs({ jobs });
      setData((data) => data.filter((u) => !jobs.includes(u._id)));
      setRowSelection({});
      toast({
        title: `${jobs.length > 1 ? "Job's" : "Job"} deleted successfully.`,
      });
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    }
  };

  const columns: ColumnDef<Jobs>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: any) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const job = row.original;
        return (
          <Link
            href={`/dashboard/admin/jobs/${job._id}`}
            className="capitalize underline"
          >
            {row.getValue("title")}
          </Link>
        );
      },
    },
    {
      accessorKey: "company",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Company
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("company")}</div>
      ),
    },
    {
      accessorKey: "applicants",
      header: () => <div className="text-center">Applicants</div>,
      cell: ({ row }) => {
        const totalApplicants =
          // @ts-expect-error
          (row.getValue("applicants")?.length?.toString() as string) || "0";

        return <div className="text-center font-medium">{totalApplicants}</div>;
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("status")}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const job = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => push(`/dashboard/admin/users/${job.title}`)}
              >
                Job Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={`${job.status === "open" ? "bg-violet-600/30 hover:bg-violet-500 hover:text-white" : "bg-red-500/20 text-red-500 hover:bg-red-500/70 hover:text-white"} cursor-pointer`}
                onClick={() => toggleJobStatus({ job })}
              >
                {job.status === "open" ? "Close job" : "Open job"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-3 py-4">
        <Input
          placeholder="Filter company..."
          value={(table.getColumn("company")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("company")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              disabled={
                !table?.getIsSomeRowsSelected() &&
                !table?.getIsAllRowsSelected()
              }
              className="h-12"
              variant={"destructive"}
            >
              Delete
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="flex flex-col gap-2">
            <Label>Are you sure you want to delete these job&apos;s?</Label>
            <PopoverClose className="ms-auto space-x-1">
              <Button
                onClick={async () => {
                  try {
                    const jobs = table
                      .getSelectedRowModel()
                      .flatRows.map((row) => row.original?._id);
                    await handleDeleteJob(jobs as string[]);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                size={"sm"}
                className="bg-red-500/20 text-red-500 hover:bg-red-500/50 hover:text-white"
              >
                confirm
              </Button>
            </PopoverClose>
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto h-12">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <span className="mb-2 block ps-1 text-sm text-foreground/70">
        Total {total ?? 0} job&apos;s.
      </span>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-wrap items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-nowrap text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <PaginationComponent
            defaultValues={query}
            options={options}
            path="/dashboard/admin/jobs"
          />
        </div>
      </div>
    </div>
  );
}
