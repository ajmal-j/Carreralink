"use client";
import { motion } from "framer-motion";

export default function MainText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="mx-auto flex max-w-[600px] flex-col gap-1 py-16"
    >
      <span className="block text-center text-4xl">
        Job hunting made easy.
        <br />
        Your gateway to professional success!
      </span>
    </motion.div>
  );
}
