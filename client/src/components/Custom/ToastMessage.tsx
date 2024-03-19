"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ToastMessageProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

export function ToastMessage({
  description,
  title,
  variant,
}: ToastMessageProps) {
  const { toast } = useToast();
  toast({
    title: title || "Uh oh! Something went wrong.",
    description,
    variant,
  });
}
