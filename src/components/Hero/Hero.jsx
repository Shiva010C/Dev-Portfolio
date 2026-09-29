import React from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero({ onIntroComplete }) {



  return (
    <section id="home" className={styles.hero}>

      <div className={styles.nebula} data-parallax />

      <div className={styles.aniContainer}>

        <div className={styles.rocketHolder}>
          <motion.img
            src="/rocket.png"
            alt=""
            className={styles.rocket}
            initial={{ y: 0, scale: 1 }}
            animate={{ y: [0, -90, -800], scale: [1, 1, 0.5] }}
            transition={{
              duration: 6.0,
              times: [0, 0.1, 0.8,]
            }}

          />
        </div>

        <motion.div className={styles.pcHolder}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: [1, 1, 1], y: [0, 40, 300] }}
          transition={{ duration: 1.5, time: [0, 0.1, 0.2] }}
        >

          <div className={styles.cloudHolder}>
            <motion.img
              src="/BornCloud.png"
              alt=""
              className={styles.burnCloud}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 1] }}
            transition={{ duration: 1.5, time: [0, 0.1, 0.2] }}
            />
          </div>

          <motion.img
            src="/planet.png"
            alt="Planet"
            className={styles.planet}

          />
        </motion.div>
      </div>


      {/* CHANGE HERE: Put your profile image at public/profile.jpg. */}
      <motion.div className={styles.moonWrapper}>

        <motion.div
          className={styles.moonRoll}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, delay: 6.4 }}
        >
          <div className={styles.moon} data-parallax>
            <div className={styles.moonGlow} />
            <div className={styles.profileFrame} >
              <motion.img
                src="/profile.PNG"
                alt="Shiva Mandal"
                className={styles.profileImage}
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.0, delay: 6.8 }}

                // scroll lock to prevent scrolling until the animation is complete
                onAnimationComplete={onIntroComplete}
              />
            </div>
          </div>

        </motion.div>

      </motion.div>

      {/* if add mountains then add here */}

      <div className={styles.content}>
        <motion.p className={styles.eyebrow} initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 4.7 }}>
          Hey, I’m
        </motion.p>

        {/* CHANGE HERE: Your name. */}
        <motion.h1 initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.3, delay: 5.6 }}>
          Shiva <span>Mandal</span>
        </motion.h1>

        {/* CHANGE HERE: Your short positioning statement. */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 6.2 }}>
          A Developer who turns ideas<br />into interactive experiences.
        </motion.h2>

        {/* CHANGE HERE: Hero supporting paragraph. */}
        <motion.p className={styles.description}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 6.2 }}>

          I build modern web experiences with clean code,<br className="desktopOnly" />
          creative design and a focus on performance.

        </motion.p>

        <motion.div className={styles.actions}
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.3, delay: 5.6 }}>

          <a className={styles.primary} href="#projects">View My Work <span>→</span></a>
          {/* CHANGE HERE: Put your real resume at public/resume.pdf. */}
          <a className={styles.secondary}
            href="/resume.pdf" download>Download Resume <span>↓</span></a>
        </motion.div>

        <motion.div className={styles.scrollHint}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 4.7 }}>

          <span className={styles.mouse}><i /></span>
          SCROLL TO EXPLORE
        </motion.div>
      </div>

      {/* CHANGE HERE: Replace this handwritten quote. */}
      <motion.div className={styles.quote}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 7.7 }}>

        <span>Good<br />Code<br />Better<br />Future</span>
        <svg viewBox="0 0 130 35"><path d="M3 25C40 5 80 18 125 2M34 31c22-9 52-4 76-12" /></svg>
      </motion.div>

      <motion.div className={styles.location}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: .8, delay: 5.0 }}>
        BASED IN<br /><b>INDIA</b><i>◆</i>
      </motion.div>
    </section>
  );
}
