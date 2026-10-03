import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Hero.module.css";

const roles = [
    "BUILDING DIGITAL WORLDS_",
    "CRAFTING WEB EXPERIENCES_",
    "BUILDING ANDROID APPS_",
    "EXPLORING GAME DEVELOPMENT_",
];

const stack = ["React", "Java", "C++"];

function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
   const [bootComplete, setBootComplete] = useState(false);
const [introFinished, setIntroFinished] = useState(false);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    

    /* ================================
       ROLE TEXT LOOP
    ================================= */

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    /* ================================
       BOOT SEQUENCE
    ================================= */

    useEffect(() => {
  // Boot screen complete
  const bootTimer = setTimeout(() => {
    setBootComplete(true);
  }, 1600);

  // Complete Hero entry animation
  const introTimer = setTimeout(() => {
    setIntroFinished(true);
  }, 2400);

  return () => {
    clearTimeout(bootTimer);
    clearTimeout(introTimer);
  };
}, []);

useEffect(() => {
  if (introFinished) {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    document.documentElement.style.touchAction = "";
    document.body.style.touchAction = "";

    return;
  }

  // 🔒 Hero entry animation ke time scroll lock
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  document.documentElement.style.touchAction = "none";
  document.body.style.touchAction = "none";

  return () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    document.documentElement.style.touchAction = "";
    document.body.style.touchAction = "";
  };
}, [introFinished]);

    /* ================================
       MOUSE PARALLAX
    ================================= */

    useEffect(() => {
        const handleMouseMove = (event) => {
            const x =
                (event.clientX / window.innerWidth - 0.5) * 2;

            const y =
                (event.clientY / window.innerHeight - 0.5) * 2;

            setMouse({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMouseMove
            );
        };
    }, []);

    /* ================================
       SCROLL
    ================================= */

    const scrollTo = (id) => {
        document
            .getElementById(id)
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    };

    return (
        <section id="Home" className={styles.hero}>
            {/* =================================
          ATMOSPHERE
      ================================= */}

            <div className={styles.planetGlow} />
            <div className={styles.planet} />

            {/* subtle scan lines */}
            <div className={styles.scanlines} />

            {/* =================================
          TOP HUD
      ================================= */}

            <motion.div
                className={styles.topHud}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                    opacity: bootComplete ? 1 : 0,
                    y: bootComplete ? 0 : -20,
                }}
                transition={{ duration: 0.7 }}
            >
                <div className={styles.sectionCode}>
                    <span>01</span>
                    <i />
                    <span>INTRO</span>
                </div>

                <div className={styles.systemStatus}>
                    <span className={styles.statusDot} />
                    SYSTEM ONLINE
                </div>
            </motion.div>

            {/* =================================
          BOOT MESSAGE
      ================================= */}

            <AnimatePresence>
                {!bootComplete && (
                    <motion.div
                        className={styles.bootScreen}
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            y: -10,
                        }}
                        transition={{ duration: 0.45 }}
                    >
                        <div className={styles.bootLine}>
                            INITIALIZING SYSTEM
                            <span>...</span>
                        </div>

                        <div className={styles.bootProgress}>
                            <span />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* =================================
          MAIN CONTENT
      ================================= */}

            <div className={styles.heroContent}>
                {/* =================================
            LEFT SIDE
        ================================= */}

                <motion.div
                    className={styles.intro}
                    initial={{
                        opacity: 0,
                        x: -60,
                    }}
                    animate={{
                        opacity: bootComplete ? 1 : 0,
                        x: bootComplete ? 0 : -60,
                    }}
                    transition={{
                        duration: 0.9,
                        delay: 0.25,
                    }}
                    
                >
                    <div className={styles.helloLine}>
                        <span />
                        HELLO, I'M
                    </div>

                    <h1>
                        <span className={styles.nameSolid}>
                            SHIVA
                        </span>

                        <span className={styles.nameOutline}>
                            MANDAL
                        </span>
                    </h1>

                    <div className={styles.role}>
                        <span className={styles.roleSymbol}>
                            &gt;
                        </span>

                        <AnimatePresence mode="wait">
                            <motion.span
                                key={roleIndex}
                                initial={{
                                    opacity: 0,
                                    y: 12,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -12,
                                }}
                                transition={{
                                    duration: 0.35,
                                }}
                            >
                                {roles[roleIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    <p className={styles.description}>
                        Software developer focused on building
                        interactive digital experiences across web,
                        Android and beyond.
                    </p>

                    {/* CTA */}

                    <div className={styles.actions}>
                        <motion.button
                            type="button"
                            className={styles.primaryButton}
                            onClick={() => scrollTo("projects")}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <span>EXPLORE MY WORK</span>
                            <b>→</b>
                        </motion.button>

                        <motion.button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={() => scrollTo("contact")}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            CONNECT
                            <span>↗</span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* =================================
            PROFILE HOLOGRAM
        ================================= */}

                <motion.div
                    className={styles.visual}
                    initial={{
                        opacity: 0,
                        scale: 0.8,
                    }}
                    animate={{
                        opacity: bootComplete ? 1 : 0,
                        scale: bootComplete ? 1 : 0.8,
                        x: mouse.x * 8,
                        y: mouse.y * 6,
                    }}
                    transition={{
                        opacity: {
                            duration: 1,
                            delay: 0.45,
                        },
                        scale: {
                            duration: 1,
                            delay: 0.45,
                        },
                        x: {
                            type: "spring",
                            stiffness: 80,
                            damping: 18,
                        },
                        y: {
                            type: "spring",
                            stiffness: 80,
                            damping: 18,
                        },
                    }}
                >
                    {/* Outer ring */}

                    <div className={styles.outerRing}>
                        <span className={styles.ringPoint} />
                        <span className={styles.ringPointTwo} />
                    </div>

                    {/* Middle orbit */}

                    <div className={styles.orbit}>
                        <div className={styles.orbitNode} />
                    </div>

                    {/* Main hologram */}

                    <div className={styles.hologram}>
                        <div className={styles.imageFrame}>
                            {/* =================================
                  CHANGE YOUR IMAGE PATH HERE
              ================================= */}

                            <img
                                src="/profile.png"
                                alt="Shiva Mandal"
                            />

                            <div className={styles.imageScan} />
                        </div>

                        {/* corner brackets */}

                        <span className={`${styles.corner} ${styles.topLeft}`} />
                        <span className={`${styles.corner} ${styles.topRight}`} />
                        <span className={`${styles.corner} ${styles.bottomLeft}`} />
                        <span className={`${styles.corner} ${styles.bottomRight}`} />
                    </div>

                    {/* Hologram data */}

                    <div className={styles.visualLabel}>
                        <span>IDENTITY</span>
                        <strong>DEVELOPER_01</strong>
                    </div>

                    {/* Floating data */}

                    <motion.div
                        className={`${styles.dataPanel} ${styles.panelTop}`}
                        animate={{
                            y: [0, -6, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <small>SYSTEM</small>
                        <strong>ONLINE</strong>
                    </motion.div>

                    <motion.div
                        className={`${styles.dataPanel} ${styles.panelBottom}`}
                        animate={{
                            y: [0, 6, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <small>STACK</small>

                        <strong>
                            {stack.map((item, index) => (
                                <React.Fragment key={item}>
                                    {item}
                                    {index !== stack.length - 1 && (
                                        <em> / </em>
                                    )}
                                </React.Fragment>
                            ))}
                        </strong>
                    </motion.div>
                </motion.div>
            </div>

            {/* =================================
          BOTTOM HUD
      ================================= */}

            <motion.div
                className={styles.bottomHud}
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: bootComplete ? 1 : 0,
                    y: bootComplete ? 0 : 20,
                }}
                transition={{
                    duration: 0.7,
                    delay: 1,
                }}
            >
                <div className={styles.coordinates}>
                    <span>DEV.SIGNAL</span>
                    <span>CS / WEB / MOBILE</span>
                </div>

                <button
                    type="button"
                    className={styles.scrollIndicator}
                    onClick={() => scrollTo("skills")}
                >
                    <span>SCROLL TO EXPLORE</span>

                    <motion.b
                        animate={{
                            y: [0, 7, 0],
                        }}
                        transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        ↓
                    </motion.b>
                </button>

                <div className={styles.coordinates}>
                    <span>STATUS</span>
                    <span>READY_</span>
                </div>
            </motion.div>
        </section>
    );
}

export default Hero;