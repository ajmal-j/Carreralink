"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function ThreeDCard() {
  return (
    <CardContainer className="inter-var w-full">
      <CardBody className="group/card relative h-auto w-full rounded-xl dark:border-white/[0.2] dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-[50rem]">
        <CardItem translateZ="100" className="w-full">
          <Image
            src="/aiImage.png"
            height="1000"
            width="1000"
            className="h-full w-full rounded-xl object-cover group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
