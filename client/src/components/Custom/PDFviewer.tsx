"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useMemo } from "react";
import { Document, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const PDFviewer = ({
  children,
  resume,
}: {
  children: ReactNode;
  resume: string;
}) => {
  const url = useMemo(() => resume, [resume]);
  return (
    <Dialog open>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="pb-3 text-xl text-foreground/70">
            Resume
          </DialogTitle>
        </DialogHeader>
        <Document
          className={"z-30 min-h-[500px] w-full overflow-auto"}
          file={{ url }}
          loading={<div>Loading!!!</div>}
        />
      </DialogContent>
    </Dialog>
  );
};
