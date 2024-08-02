"use client";

import { motion } from "framer-motion";

export default function H1({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1
      initial={{ y: -10 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="text-lg font-bold"
    >
      {children}
    </motion.h1>
  );
}
