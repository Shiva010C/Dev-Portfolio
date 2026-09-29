import React from "react";
import styles from "./Navbar.module.css";
import { motion } from "framer-motion";

const navItems = [
  ["Home", "home"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Contact", "contact"],
];

export default function Navbar() {
  return (
    <motion.header className={styles.navbar}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 2.3 }}>
      <motion.a href="#home" className={styles.logo} aria-label="Shiva Mandal home" initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2.3 }}>
        <span>S</span><span>M</span>
      </motion.a>

      <nav>
        {navItems.map(([label, id], index) => (
          <motion.a className={index === 0 ? styles.active : ""} href={`#${id}`} key={id}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 2.8 }}>
            {label}
          </motion.a>
        ))}
      </nav>

      {/* CHANGE HERE: Edit the top-right CTA label and destination. */}
      <motion.a className={styles.talk} href="#contact" initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: navItems.length * 0.2 + 3.0 }}>
        Let’s Talk <span>→</span>
      </motion.a>
    </motion.header>
  );
}