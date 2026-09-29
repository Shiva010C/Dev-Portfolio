import React from "react";
import { motion } from "framer-motion";

export default function Reveal({ children, className = "", delay = 0, direction = "up" }) {
  const offsets = {
    up: { y: 44, x: 0 },
    down: { y: -44, x: 0 },
    left: { y: 0, x: -44 },
    right: { y: 0, x: 44 },
  };
  const initial = offsets[direction] || offsets.up;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...initial, filter: "blur(7px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.16 }}
      transition={{ duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}