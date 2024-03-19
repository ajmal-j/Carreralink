"use client";
import { SparklesCore } from "../ui/sparkles";

export function SparklesTitle() {
  return (
    <div className="mt-8 flex w-full flex-col items-center justify-center overflow-hidden rounded-md">
      <span className="relative z-20 block max-w-[600px] text-center font-montserrat text-4xl ">
        Smart Resume Analysis with AI – Elevate Your Job Search Effortlessly!
      </span>
      <div className="relative h-40 w-[40rem]">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="h-full w-full"
        />
        <div className="absolute inset-0 h-full w-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
