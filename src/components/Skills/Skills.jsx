import React from "react";
import { motion } from "framer-motion";
import styles from "./Skills.module.css";

const orbitSkills = [
    { name: "React", icon: "⚛", className: "react", x: "50%", y: "5%" },
    { name: "JavaScript", icon: "JS", className: "javascript", x: "24%", y: "20%" },
    { name: "Java", icon: "☕", className: "java", x: "76%", y: "20%" },
    { name: "C++", icon: "C+", className: "cpp", x: "72%", y: "47%" },
    { name: "MongoDB", icon: "M", className: "mongodb", x: "83%", y: "67%" },
    { name: "Node.js", icon: "N", className: "node", x: "67%", y: "87%" },
    { name: "Python", icon: "Py", className: "python", x: "50%", y: "94%" },
    { name: "GitHub", icon: "GH", className: "github", x: "28%", y: "87%" },
    { name: "CSS", icon: "3", className: "css", x: "17%", y: "65%" },
    { name: "HTML", icon: "5", className: "html", x: "23%", y: "44%" },
    { name: "GSAP", icon: "ϟ", className: "gsap", x: "10%", y: "27%" },
];

const categories = [
    {
        number: "01",
        title: "Frontend",
        subtitle: "Development",
        icon: "</>",
        skills: [
            ["React", "70%"],
            ["JavaScript", "85%"],
            ["HTML", "95%"],
            ["CSS", "90%"],
            ["Tailwind CSS", "50%"],
        ],
    },
    {
        number: "02",
        title: "Backend",
        subtitle: "Development",
        icon: "◇",
        skills: [
            ["Node.js", "60%"],
            ["Express.js", "75%"],
            ["MongoDB", "70%"],
            ["SQL", "30%"],
            ["REST APIs", "80%"],
        ],
    },
    {
        number: "03",
        title: "Languages",
        subtitle: "",
        icon: "</>",
        skills: [
            ["Java", "85%"],
            ["Python", "60%"],
            ["C++", "80%"],
            ["C", "80%"],
            ["JavaScript", "85%"],
        ],
    },
    {
        number: "04",
        title: "Tools &",
        subtitle: "Others",
        icon: "⚙",
        skills: [
            ["Git & GitHub", "70%"],
            ["VS Code", "90%"],
            ["Framer Motion", "60%"],
            ["Figma", "30%"],
            ["Android Studio", "50%"],
        ],
    },
];

function SkillNode({ skill, index }) {
    return (
        <div
            className={`${styles.skillNode} ${styles[skill.className]}`}
            style={{
                left: skill.x,
                top: skill.y,
            }}
        >
            <motion.div
                className={styles.skillNodeMotion}
                initial={{
                    opacity: 0,
                    scale: 0.5,
                }}
                whileInView={{
                    opacity: 1,
                    scale: 1,
                }}
                viewport={{
                    once: false,
                    amount: 0.2,
                }}
                transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 120,
                }}
                whileHover={{
                    scale: 1.12,
                }}
            >
                <div className={styles.nodeGlow} />

                <div className={styles.nodeIcon}>
                    {skill.icon}
                </div>

                <span>{skill.name}</span>
            </motion.div>
        </div>
    );
}

function SkillCard({ category, index }) {
    return (
        <motion.article
            className={styles.skillCard}
            initial={{
                opacity: 0,
                y: 50,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: false,
                amount: 0.15,
            }}
            transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
                y: -8,
            }}
        >
            <div className={styles.cardHeader}>
                <div className={styles.cardNumber}>
                    {category.number}
                </div>

                <div className={styles.cardIcon}>
                    {category.icon}
                </div>

                <div className={styles.cardTitle}>
                    <h3>{category.title}</h3>

                    {category.subtitle && (
                        <h3>{category.subtitle}</h3>
                    )}
                </div>
            </div>

            <div className={styles.cardLine} />

            <div className={styles.cardSkills}>
                {category.skills.map(([name, level], skillIndex) => (
                    <div
                        className={styles.progressItem}
                        key={name}
                    >
                        <div className={styles.progressTop}>
                            <span>{name}</span>
                            <small>{level}</small>
                        </div>

                        <div className={styles.progressTrack}>
                            <motion.div
                                className={styles.progressBar}
                                initial={{ width: 0 }}
                                whileInView={{ width: level }}
                                viewport={{
                                    once: false,
                                    amount: 0.3,
                                }}
                                transition={{
                                    duration: 1,
                                    delay: skillIndex * 0.08,
                                    ease: "easeOut",
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* CHANGE HERE:
          Agar future me full skills page banana ho
          to is link ko apne URL se replace karo.
      */}
            <a
                href="#skills"
                className={styles.viewMore}
            >
                View more
                <span>→</span>
            </a>
        </motion.article>
    );
}

export default function Skills() {
    return (
        <section
            id="Skills"
            className={styles.skillsSection}
        >
            {/* Background glow */}
            <div className={styles.ambientGlow} />

            <div className={styles.container}>

                {/* ================= HEADER ================= */}

                <motion.div
                    className={styles.heading}
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: false,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                >
                    <div>
                        <div className={styles.sectionNumber}>
                            02
                            <span />
                        </div>

                        {/* CHANGE HERE: Section heading */}
                        <h2>
                            SKILLS
                        </h2>

                        <p className={styles.tagline}>
                            THINGS I BUILD WITH
                        </p>
                    </div>

                    {/* CHANGE HERE: Skills description */}
                    <p className={styles.description}>
                        A combination of technologies, tools and
                        <br />
                        creative skills I use to turn ideas into
                        <br />
                        real-world experiences.
                    </p>
                </motion.div>


                {/* ================= ORBIT AREA ================= */}

                <div className={styles.orbitArea}>

                    {/* Orbit rings */}
                    <div className={`${styles.orbit} ${styles.orbit1}`} />
                    <div className={`${styles.orbit} ${styles.orbit2}`} />
                    <div className={`${styles.orbit} ${styles.orbit3}`} />
                    <div className={`${styles.orbit} ${styles.orbit4}`} />

                    {/* Connecting vertical line */}
                    <div className={styles.centerLine} />

                    {/* Central developer core */}
                    <div className={styles.core}>
                        <motion.div
                            className={styles.coreMotion}
                            initial={{
                                opacity: 0,
                                scale: 0.7,
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                            }}
                            viewport={{
                                once: false,
                                amount: 0.3,
                            }}
                            transition={{
                                duration: 1,
                                type: "spring",
                            }}
                        >
                            <div className={styles.coreOuter} />

                            <div className={styles.coreInner}>
                                <span>DEVELOPER</span>
                                <small>IDEAS · CODE · CREATE</small>
                            </div>
                        </motion.div>
                    </div>

                    {/* Skill nodes */}
                    {orbitSkills.map((skill, index) => (
                        <SkillNode
                            key={skill.name}
                            skill={skill}
                            index={index}
                        />
                    ))}

                    {/* CHANGE HERE:
              Handwritten side message
          */}
                    <div className={styles.handwritten}>
                        Explore
                        <br />
                        Technologies
                        <br />
                        That Power
                        <br />
                        My Journey

                        <svg
                            viewBox="0 0 150 70"
                            aria-hidden="true"
                        >
                            <path d="M145 5 C115 30 75 30 20 58" />
                            <path d="M20 58 L36 54" />
                            <path d="M20 58 L28 45" />
                        </svg>
                    </div>
                </div>


                {/* ================= CATEGORY CARDS ================= */}

                <div className={styles.cardsGrid}>
                    {categories.map((category, index) => (
                        <SkillCard
                            key={category.number}
                            category={category}
                            index={index}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}