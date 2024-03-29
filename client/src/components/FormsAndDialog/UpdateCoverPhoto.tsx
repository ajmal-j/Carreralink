"use client";
import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { UploadIcon } from "@radix-ui/react-icons";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const UpdateCoverPhoto = ({
  open,
  setOpen,
  updateCoverPhoto,
}: {
  open: boolean;
  setOpen: any;
  updateCoverPhoto: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  const [image, setImage] = useState<Blob | undefined>();
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setImage(undefined);
        setOpen(!open);
      }}
    >
      <DialogTrigger asChild>
        <div className="absolute bottom-[-3px] right-0 cursor-pointer rounded-full border border-foreground/20 bg-background p-1 opacity-60 transition-all duration-200 hover:opacity-100">
          <UploadIcon className="size-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="pb-3 text-xl text-foreground/70">
            Update Cover Photo.
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={updateCoverPhoto}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="coverPhoto" className="pb-2 ps-1">
              Image
            </Label>
            <Input
              type="file"
              className="pt-3"
              id="coverPhoto"
              name="coverPhoto"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  setImage(e.target.files[0]);
                }
              }}
            />
            {image && (
              <img
                src={image ? URL.createObjectURL(image) : ""}
                className="mx-auto mb-1 mt-3 w-[200px] rounded-xl object-cover"
              />
            )}
          </div>
          <div className="flex justify-end pt-4">
            <Button type="submit" variant="outline">
              <UploadIcon />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
