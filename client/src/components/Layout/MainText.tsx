"use client";
import { motion } from "framer-motion";

export default function MainText({ text }: { text?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="mx-auto flex max-w-[800px] flex-col gap-1 py-16"
    >
      <span className="block text-center">
        {text ? (
          text
        ) : (
          <>
            <span className="font-arial bg-gradient-to-br  from-foreground/90 to-foreground/50 bg-clip-text text-5xl font-extralight leading-10 text-transparent sm:text-6xl">
              <span className="text-6xl sm:text-7xl">J</span>ob hunting made
              easy.
            </span>
            <br />
            <span className="mt-2 block text-lg text-foreground/50 md:text-xl">
              Your gateway to professional{" "}
              <span className="text-lg text-foreground md:text-2xl">
                success!
              </span>
            </span>
          </>
        )}
      </span>
    </motion.div>
  );
}
