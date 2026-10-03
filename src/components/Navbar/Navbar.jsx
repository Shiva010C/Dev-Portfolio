import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";

const navItems = [
  ["01", "INTRO", "Home"],
  ["02", "SKILLS", "Skills"],
  ["03", "PROJECTS", "Projects"],
  ["04", "CONTACT", "Contact"],
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const sections = navItems
      .map(([, , id]) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.15, 0.3, 0.5, 0.7],
        rootMargin: "-15% 0px -45% 0px",
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    setActiveSection(id);
  };

  return (
    <motion.header
      className={styles.navbar}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 2.3,
        ease: "easeOut",
      }}
    >
      {/* LEFT — IDENTITY */}
      <motion.a
        href="#Home"
        className={styles.logo}
        aria-label="Shiva Mandal Home"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.7,
          delay: 2.4,
        }}
      >
        <span className={styles.logoMain}>
          <span className={styles.logoLetter}>S</span><span className={styles.logoLetter}>M</span>
        </span>

        <span className={styles.logoCode}>
          _01
        </span>
      </motion.a>

      {/* CENTER — NAVIGATION */}
      <nav className={styles.nav}>
        {navItems.map(([number, label, id], index) => {
          const active = activeSection === id;

          return (
            <motion.a
              key={id}
              href={`#${id}`}
              className={`${styles.navItem} ${
                active ? styles.active : ""
              }`}
              onClick={() => handleNavClick(id)}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 2.6 + index * 0.12,
              }}
            >
              <span className={styles.number}>
                {number}
              </span>

              <span className={styles.label}>
                {label}
              </span>

              {active && (
                <motion.span
                  className={styles.activeLine}
                  layoutId="navbarActiveLine"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </motion.a>
          );
        })}
      </nav>

      {/* RIGHT — RESUME */}
      <motion.a
        href="/resume.pdf"
        download
        className={styles.resume}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.7,
          delay: 3.1,
        }}
      >
        <span>RESUME</span>
        <b>↗</b>
      </motion.a>
    </motion.header>
  );
}