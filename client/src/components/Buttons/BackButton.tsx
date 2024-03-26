"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function BackButton({ className }: { className?: string }) {
  const { back } = useRouter();
  return (
    <Button variant={"outline"} type="button" className={className} onClick={back}>
      <ArrowLeftIcon />
    </Button>
  );
}
