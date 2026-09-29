import React, { useEffect, useState } from "react";
import styles from "./SideNav.module.css";
import { motion } from "framer-motion";

const sections = [
  "home",
  // "play",
  "skills",
  "projects",
  "contact",
];

export default function SideNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight / 2;

      let currentSection = "home";
      let closestDistance = Infinity;

      sections.forEach((id) => {
        const section = document.getElementById(id);

        if (!section) return;

        const rect = section.getBoundingClientRect();

        // Agar viewport ka center section ke andar hai
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          currentSection = id;
          closestDistance = 0;
          return;
        }

        // Otherwise nearest section find karo
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          currentSection = id;
        }
      });

      setActive(currentSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const handleNavigate = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <aside
      className={styles.sideNav}
      aria-label="Section navigation"
    >
      {sections.map((id, i) => (
        <motion.button
          key={id}
          type="button"
          className={active === id ? styles.active : ""}
          onClick={() => handleNavigate(id)}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8, delay: i * 0.4 + 5.0 }}
        >
          <span>
            {String(i + 1).padStart(2, "0")}
          </span>

          <motion.i
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 7.0 }}
          />

          <motion.em initial={{ x: -10, opacity: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 7.3 }}>
            {id}
          </motion.em>
        </motion.button>
      ))}
    </aside>
  );
}