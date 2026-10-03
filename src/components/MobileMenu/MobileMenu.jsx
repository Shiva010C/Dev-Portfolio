import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./MobileMenu.module.css";

const navItems = [
  ["01", "INTRO", "Home"],
  ["02", "SKILLS", "Skills"],
  ["03", "PROJECTS", "Projects"],
  ["04", "CONTACT", "Contact"],
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [menuReady, setMenuReady] = useState(false);

  /* =================================
     WAIT FOR HERO ENTRY ANIMATION
  ================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setMenuReady(true);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);


  /* =================================
     LOCK SCROLL ONLY WHEN MENU OPEN
  ================================= */

  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);


  /* =================================
     ESC TO CLOSE
  ================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);


  const handleNavigation = (id) => {
    setOpen(false);

    setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 200);
  };


  return (
    <>
      {/* =================================
          HAMBURGER
          Hidden until Hero entry finishes
      ================================= */}

      <AnimatePresence>
        {menuReady && !open && (
          <motion.button
            type="button"
            className={styles.menuButton}
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            aria-expanded={open}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            transition={{
              duration: 0.35,
            }}
          >
            ☰
          </motion.button>
        )}
      </AnimatePresence>


      {/* =================================
          DRAWER
      ================================= */}

      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}

            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.25,
              }}
              onClick={() => setOpen(false)}
            />


            {/* DRAWER */}

            <motion.aside
              className={styles.drawer}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >

              {/* HEADER */}

              <div className={styles.header}>

                <div className={styles.drawerLogo}>
                  <strong>SM</strong>
                  <span>_01</span>
                </div>

                <button
                  type="button"
                  className={styles.close}
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation"
                >
                  ×
                </button>

              </div>


              <div className={styles.separator} />


              {/* LABEL */}

              <div className={styles.menuLabel}>
                <span />
                NAVIGATION
              </div>


              {/* LINKS */}

              <nav className={styles.links}>
                {navItems.map(
                  ([number, label, id], index) => (
                    <motion.button
                      key={id}
                      type="button"
                      className={styles.link}
                      onClick={() =>
                        handleNavigation(id)
                      }
                      initial={{
                        opacity: 0,
                        x: 30,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          0.1 + index * 0.08,
                        duration: 0.35,
                      }}
                    >
                      <span
                        className={styles.number}
                      >
                        {number}
                      </span>

                      <span
                        className={styles.label}
                      >
                        {label}
                      </span>

                      <span
                        className={styles.arrow}
                      >
                        →
                      </span>
                    </motion.button>
                  )
                )}
              </nav>


              {/* BOTTOM */}

              <div className={styles.bottom}>

                <div className={styles.status}>
                  <span
                    className={styles.statusDot}
                  />

                  <div>
                    <small>SYSTEM</small>
                    <strong>ONLINE</strong>
                  </div>
                </div>


                <a
                  href="/resume.pdf"
                  download
                  className={styles.resume}
                >
                  DOWNLOAD RESUME
                  <span>↗</span>
                </a>

              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}