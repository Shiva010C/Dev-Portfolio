import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    AnimatePresence,
    motion,
    useAnimationFrame,
    useMotionValue,
} from "framer-motion";

import styles from "./Projects.module.css";

/* =========================================================
   PROJECT DATA
   ========================================================= */

const projects = [
    {
        id: "portfolio",
        number: "01",
        name: "My Portfolio",
        description:
            "A futuristic interactive developer portfolio built with React, Framer Motion and GSAP.",
        stack: ["React", "Framer Motion", "GSAP", "CSS"],
        weight: 10,
        color: "#55eaff",
        image: "/projects/portfolio.png",
        github: "",
        demo: "",
    },

    {
        id: "weather",
        number: "02",
        name: "Weather Dashboard",
        description:
            "A dynamic weather dashboard showing live weather information with a responsive interface.",
        stack: ["React", "API", "JavaScript", "CSS"],
        weight: 7,
        color: "#9b7cff",
        image: "/projects/weather.png",
        github: "https://github.com/Shiva010C/FWD-PRODUCTSHOWCASE",
        demo: "https://shiva010c.github.io/FWD-PRODUCTSHOWCASE/",
    },

    {
        id: "student",
        number: "03",
        name: "Smart Events",
        description:
            "A modern crowd-management system that provides seamless physical event experiences to attendees and manage venue without hassle.",
        stack: ["React", "Firebase", "JavaScript", "Node.js", "TailwindCSS", ""],
        weight: 8,
        color: "#69ff8b",
        image: "/projects/Smart-Events.png",
        github: "https://github.com/Shiva010C/Prompt-War",
        demo: "",
    },

    {
        id: "todo",
        number: "04",
        name: "Smart ToDo",
        description:
            "A responsive task management application with local storage and interactive controls.",
        stack: ["HTML", "CSS", "JavaScript", "LocalStorage"],
        weight: 5,
        color: "#ffd45a",
        image: "/projects/todo.png",
        github: "https://github.com/Shiva010C/ToDo-s-List",
        demo: "https://shiva010c.github.io/ToDo-s-List/",
    },
];

/* =========================================================
   RANDOM ASTEROIDS
   ========================================================= */

function createAsteroids(count, seed) {
    let value = seed * 99991;

    const random = () => {
        value =
            (value * 9301 + 49297) % 233280;

        return value / 233280;
    };

    return Array.from(
        { length: count },
        (_, index) => ({
            id: `asteroid-${seed}-${index}`,

            size:
                10 +
                random() * 21,

            top:
                16 +
                random() * 68,

            left:
                2 +
                random() * 112,

            rotation:
                random() * 360,

            opacity:
                0.35 +
                random() * 0.4,
        })
    );
}

/* =========================================================
   NORMAL ASTEROID
   ========================================================= */

function NormalAsteroid({ asteroid }) {
    return (
        <div
            className={styles.normalAsteroid}
            style={{
                width: `${asteroid.size}px`,
                height: `${asteroid.size}px`,
                top: `${asteroid.top}%`,
                left: `${asteroid.left}%`,
                opacity: asteroid.opacity,
                transform: `rotate(${asteroid.rotation}deg)`,
            }}
        >
            <span />
            <span />
            <span />
        </div>
    );
}

/* =========================================================
   PROJECT ASTEROID
   ========================================================= */

function ProjectAsteroid({
    project,
    active,
    onSelect,
    registerNode,
}) {
    const size =
        52 + project.weight * 6;

    return (
        <motion.button
            ref={(node) => {
                registerNode(node, project.id);
            }}
            type="button"
            data-project={project.id}
            className={`${styles.projectAsteroid} ${active
                ? styles.activeAsteroid
                : ""
                }`}
            style={{
                "--project-color": project.color,
                "--asteroid-size": `${size}px`,
            }}
            onClick={(event) => {
                event.stopPropagation();

                /*
                  METHOD 2:
                  MANUAL ASTEROID CLICK
                */
                onSelect(
                    project.id,
                    "manual"
                );
            }}
            whileHover={{
                scale: 1.12,
            }}
            whileTap={{
                scale: 0.94,
            }}
        >
            <div
                className={styles.projectRock}
            >
                <div
                    className={styles.rockHighlight}
                />

                <div
                    className={styles.rockCraterOne}
                />

                <div
                    className={styles.rockCraterTwo}
                />
            </div>

            <div
                className={styles.projectGlow}
            />

            <AnimatePresence>
                {active && (
                    <motion.div
                        className={
                            styles.projectPointer
                        }
                        initial={{
                            opacity: 0,
                            x: -10,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: -10,
                        }}
                    >
                        <span
                            className={
                                styles.pointerLine
                            }
                        />

                        <span
                            className={
                                styles.projectLabel
                            }
                        >
                            <small>
                                PROJECT {project.number}
                            </small>

                            <strong>
                                {project.name}
                            </strong>
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}

/* =========================================================
   BELT GROUP
   ========================================================= */

function BeltGroup({
    copy,
    activeProject,
    onSelect,
    registerNode,
}) {
    /*
      16 random asteroids.
    */
    const asteroids = useMemo(
        () =>
            createAsteroids(
                16,
                copy + 1
            ),
        [copy]
    );

    /*
      Project positions.
    */
    const projectPositions = [
        8,
        38,
        68,
        101,
    ];

    return (
        <div
            className={styles.beltGroup}
        >
            {asteroids.map(
                (asteroid) => (
                    <NormalAsteroid
                        key={asteroid.id}
                        asteroid={asteroid}
                    />
                )
            )}

            {projects.map(
                (project, index) => (
                    <div
                        key={`${copy}-${project.id}`}
                        className={
                            styles.projectPosition
                        }
                        style={{
                            left:
                                `${projectPositions[index]}%`,
                        }}
                    >
                        <ProjectAsteroid
                            project={project}
                            active={
                                activeProject ===
                                project.id
                            }
                            onSelect={onSelect}
                            registerNode={
                                registerNode
                            }
                        />
                    </div>
                )
            )}
        </div>
    );
}

/* =========================================================
   ASTEROID BELT
   ========================================================= */

function AsteroidBelt({
    activeProject,
    targetProject,
    onSelect,
}) {
    const beltX =
        useMotionValue(0);

    const viewportRef =
        useRef(null);

    const groupWidthRef =
        useRef(0);

    const nodesRef =
        useRef(new Map());

    const draggingRef =
        useRef(false);

    const centeringRef =
        useRef(false);

    const animationRef =
        useRef(null);

    /*
      This prevents automatic selection from
      immediately fighting manual selection.
    */
    const autoLockUntilRef =
        useRef(0);

    /*
      This remembers which project was last
      automatically selected.
    */
    const lastAutoProjectRef =
        useRef(null);

    /*
      Previous frame's x position.
      Used to detect project crossing selection zone.
    */
    const previousXRef =
        useRef(0);

    const handleProjectSelect = useCallback(
        (projectId, source = "manual") => {
            if (source !== "auto") {
                // Manual click / Prev / Next ke baad
                // auto-selection ko thodi der ke liye pause karo.
                autoLockUntilRef.current = performance.now() + 1000;

                // Previous auto-selected project ko reset karo.
                lastAutoProjectRef.current = null;
            }

            onSelect(projectId, source);
        },
        [onSelect]
    );
    /* =======================================================
       GROUP WIDTH
    ======================================================= */

    useEffect(() => {
        const updateWidth = () => {
            groupWidthRef.current =
                window.innerWidth * 1.4;

            if (
                beltX.get() === 0
            ) {
                beltX.set(
                    -groupWidthRef.current
                );
            }

            previousXRef.current =
                beltX.get();
        };

        updateWidth();

        window.addEventListener(
            "resize",
            updateWidth
        );

        return () => {
            window.removeEventListener(
                "resize",
                updateWidth
            );
        };
    }, [beltX]);

    /* =======================================================
       REGISTER ALL PROJECT NODES
    ======================================================= */

    const registerNode =
        useCallback(
            (node, projectId) => {
                if (!node) return;

                const current =
                    nodesRef.current.get(
                        projectId
                    ) || [];

                if (
                    !current.includes(node)
                ) {
                    current.push(node);
                }

                nodesRef.current.set(
                    projectId,
                    current
                );
            },
            []
        );

    /* =======================================================
       NORMALIZE INFINITE BELT
    ======================================================= */

    const normalizePosition =
        useCallback(() => {
            const width =
                groupWidthRef.current;

            if (!width) return;

            let current =
                beltX.get();

            while (
                current > 0
            ) {
                current -= width;
            }

            while (
                current <=
                -2 * width
            ) {
                current += width;
            }

            beltX.set(current);
        }, [beltX]);

    /* =======================================================
       MOVE SPECIFIC PROJECT INTO VIEW
    ======================================================= */

    const moveProjectIntoView =
        useCallback(
            (projectId) => {
                const viewport =
                    viewportRef.current;

                if (!viewport) return;

                const nodes =
                    nodesRef.current.get(
                        projectId
                    );

                if (
                    !nodes ||
                    nodes.length === 0
                ) {
                    return;
                }

                const viewportRect =
                    viewport.getBoundingClientRect();

                const viewportCenter =
                    viewportRect.left +
                    viewportRect.width / 2;

                /*
                  Find closest duplicate.
                */
                let bestNode = null;

                let bestDistance =
                    Infinity;

                nodes.forEach(
                    (node) => {
                        if (!node) return;

                        const rect =
                            node.getBoundingClientRect();

                        const nodeCenter =
                            rect.left +
                            rect.width / 2;

                        const distance =
                            Math.abs(
                                nodeCenter -
                                viewportCenter
                            );

                        if (
                            distance <
                            bestDistance
                        ) {
                            bestDistance =
                                distance;

                            bestNode =
                                node;
                        }
                    }
                );

                if (!bestNode) return;

                const rect =
                    bestNode.getBoundingClientRect();

                const nodeCenter =
                    rect.left +
                    rect.width / 2;

                const difference =
                    viewportCenter -
                    nodeCenter;

                let target =
                    beltX.get() +
                    difference;

                const width =
                    groupWidthRef.current;

                if (width) {
                    while (
                        target > 0
                    ) {
                        target -= width;
                    }

                    while (
                        target <=
                        -2 * width
                    ) {
                        target += width;
                    }
                }

                if (
                    animationRef.current
                ) {
                    cancelAnimationFrame(
                        animationRef.current
                    );
                }

                centeringRef.current =
                    true;

                const start =
                    beltX.get();

                const distance =
                    target - start;

                const duration = 600;

                const startTime =
                    performance.now();

                const animate =
                    (now) => {
                        const elapsed =
                            now -
                            startTime;

                        const progress =
                            Math.min(
                                elapsed /
                                duration,
                                1
                            );

                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );

                        beltX.set(
                            start +
                            distance *
                            eased
                        );

                        if (
                            progress <
                            1
                        ) {
                            animationRef.current =
                                requestAnimationFrame(
                                    animate
                                );
                        } else {
                            centeringRef.current =
                                false;

                            normalizePosition();
                        }
                    };

                animationRef.current =
                    requestAnimationFrame(
                        animate
                    );
            },
            [
                beltX,
                normalizePosition,
            ]
        );

    /* =======================================================
       TARGET PROJECT CHANGED
       
       This is used by:
         - manual click
         - next
         - previous
    ======================================================= */

    useEffect(() => {
        if (!targetProject) {
            return;
        }

        requestAnimationFrame(() => {
            moveProjectIntoView(
                targetProject
            );
        });
    }, [
        targetProject,
        moveProjectIntoView,
    ]);

    /* =======================================================
       AUTO SELECTION
  
       THIS IS METHOD 1.
  
       Belt keeps moving automatically.
       When a project asteroid ENTERS the
       center selection zone, it becomes active.
  
       It does NOT continuously select the
       closest asteroid every frame.
    ======================================================= */

    useAnimationFrame(
        (time, delta) => {
            /*
              Don't auto move during drag.
            */
            if (
                draggingRef.current
            ) {
                return;
            }

            /*
              Don't auto move while a selected
              project is being brought into view.
            */
            if (
                centeringRef.current
            ) {
                return;
            }

            const width =
                groupWidthRef.current;

            if (!width) return;

            /*
              Slow automatic belt movement.
            */
            const speed = 14;

            let current =
                beltX.get();

            current -=
                (speed * delta) /
                1000;

            if (
                current <=
                -2 * width
            ) {
                current += width;
            }

            if (
                current > 0
            ) {
                current -= width;
            }

            beltX.set(current);

            /* -----------------------------------------------
               AUTO SELECTION LOCK
            ------------------------------------------------ */

            if (
                time <
                autoLockUntilRef.current
            ) {
                previousXRef.current =
                    current;

                return;
            }

            const viewport =
                viewportRef.current;

            if (!viewport) return;

            const viewportRect =
                viewport.getBoundingClientRect();

            const centerX =
                viewportRect.left +
                viewportRect.width / 2;

            /*
              Selection zone is slightly wider
              than exact center.
            */
            const selectionZone =
                Math.min(
                    100,
                    viewportRect.width *
                    0.12
                );

            let candidate =
                null;

            let candidateDistance =
                Infinity;

            nodesRef.current.forEach(
                (
                    nodes,
                    projectId
                ) => {
                    nodes.forEach(
                        (node) => {
                            if (!node) return;

                            const rect =
                                node.getBoundingClientRect();

                            const asteroidCenter =
                                rect.left +
                                rect.width / 2;

                            const distance =
                                Math.abs(
                                    asteroidCenter -
                                    centerX
                                );

                            /*
                              Project must actually be
                              inside the center selection zone.
                            */
                            if (
                                distance <=
                                selectionZone &&
                                distance <
                                candidateDistance
                            ) {
                                candidateDistance =
                                    distance;

                                candidate =
                                    projectId;
                            }
                        }
                    );
                }
            );

            /*
              Only select when the project
              enters the zone.
      
              If it's already active, nothing happens.
            */
            if (
                candidate &&
                candidate !==
                activeProject &&
                candidate !==
                lastAutoProjectRef.current
            ) {
                lastAutoProjectRef.current =
                    candidate;

                /*
                  METHOD 1:
                  AUTO SELECTION
                */
                onSelect(
                    candidate,
                    "auto"
                );
            }

            previousXRef.current =
                current;
        }
    );

    /* =======================================================
       DRAG START
    ======================================================= */

    const handleDragStart =
        () => {
            draggingRef.current =
                true;

            centeringRef.current =
                false;

            if (
                animationRef.current
            ) {
                cancelAnimationFrame(
                    animationRef.current
                );
            }
        };

    /* =======================================================
       DRAG END
    ======================================================= */

    const handleDragEnd =
        () => {
            normalizePosition();

            /*
              Give user control for a short
              moment after dragging.
            */
            autoLockUntilRef.current =
                performance.now() +
                500;

            setTimeout(() => {
                draggingRef.current =
                    false;
            }, 150);
        };

    return (
        <div
            ref={viewportRef}
            className={
                styles.beltViewport
            }
        >
            <motion.div
                className={
                    styles.beltTrack
                }
                style={{
                    x: beltX,
                }}
                drag="x"
                dragMomentum={false}
                dragElastic={0.025}
                dragDirectionLock
                onDragStart={
                    handleDragStart
                }
                onDragEnd={
                    handleDragEnd
                }
                whileDrag={{
                    cursor:
                        "grabbing",
                }}
            >
                <BeltGroup
                    copy={0}
                    activeProject={activeProject}
                    registerNode={registerNode}
                    onSelect={handleProjectSelect}
                />

                <BeltGroup
                    copy={1}
                    activeProject={activeProject}
                    registerNode={registerNode}
                    onSelect={handleProjectSelect}
                />

                <BeltGroup
                    copy={2}
                    activeProject={activeProject}
                    registerNode={registerNode}
                    onSelect={handleProjectSelect}
                />
            </motion.div>

            <div
                className={
                    styles.beltHint
                }
            >
                <span>←</span>
                DRAG TO EXPLORE
                <span>→</span>
            </div>
        </div>
    );
}

/* =========================================================
   PROJECT BOOK
   ========================================================= */

function ProjectBook({
    project,
    direction,
    onPrevious,
    onNext,
}) {
    return (
        <div
            className={
                styles.bookArea
            }
        >
            <div
                className={
                    styles.bookGlow
                }
            />

            <motion.div
                className={
                    styles.book
                }
                initial={{
                    opacity: 0,
                    y: 12,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.3,
                }}
            >
                {/* LEFT PAGE */}

                <div
                    className={
                        styles.bookPage
                    }
                >
                    <div
                        className={
                            styles.pageNumber
                        }
                    >
                        {project.number}
                    </div>

                    <div
                        className={
                            styles.projectImageFrame
                        }
                        style={{
                            "--project-color":
                                project.color,
                        }}
                    >
                        <img
                            src={
                                project.image
                            }
                            alt={
                                project.name
                            }
                            className={
                                styles.projectImage
                            }
                            onError={(event) => {
                                event.currentTarget.style.display =
                                    "none";
                            }}
                        />

                        <div
                            className={
                                styles.imagePlaceholder
                            }
                        >
                            PROJECT
                        </div>

                        <div
                            className={
                                styles.imageScan
                            }
                        />
                    </div>
                </div>

                {/* RIGHT PAGE */}

                <div
                    className={
                        styles.bookPage
                    }
                >
                    <div
                        className={
                            styles.pageTop
                        }
                    >
                        <span>
                            PROJECT LOG
                        </span>

                        <span>
                            {project.number}
                        </span>
                    </div>

                    <AnimatePresence
                        mode="wait"
                    >
                        <motion.div
                            key={
                                project.id
                            }
                            className={
                                styles.pageContent
                            }
                            initial={{
                                opacity: 0,
                                x:
                                    direction > 0
                                        ? 18
                                        : -18,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={{
                                opacity: 0,
                                x:
                                    direction > 0
                                        ? -18
                                        : 18,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                        >
                            <h3>
                                {project.name}
                            </h3>

                            <p>
                                {
                                    project.description
                                }
                            </p>

                            <div
                                className={
                                    styles.stack
                                }
                            >
                                {project.stack.map(
                                    (tech) => (
                                        <span
                                            key={tech}
                                        >
                                            {tech}
                                        </span>
                                    )
                                )}
                            </div>

                            <div
                                className={
                                    styles.bookLinks
                                }
                            >
                                <a
                                    href={
                                        project.github
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GITHUB ↗
                                </a>

                                <a
                                    href={
                                        project.demo
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    LIVE DEMO ↗
                                </a>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* =============================================
              NEXT / PREVIOUS
          ============================================= */}

                    <div
                        className={
                            styles.bookNavigation
                        }
                    >
                        <button
                            type="button"
                            onClick={
                                onPrevious
                            }
                        >
                            ← PREV
                        </button>

                        <span>
                            {project.number}
                            {" / "}
                            {String(
                                projects.length
                            ).padStart(
                                2,
                                "0"
                            )}
                        </span>

                        <button
                            type="button"
                            onClick={
                                onNext
                            }
                        >
                            NEXT →
                        </button>
                    </div>
                </div>

                <div
                    className={
                        styles.bookSpine
                    }
                />
            </motion.div>
        </div>
    );
}

/* =========================================================
   MAIN
   ========================================================= */

export default function Projects() {
    const [
        activeProject,
        setActiveProject,
    ] = useState(
        projects[0].id
    );

    /*
      Project that the belt should
      move toward.
    */
    const [
        targetProject,
        setTargetProject,
    ] = useState(
        projects[0].id
    );

    const [
        direction,
        setDirection,
    ] = useState(1);

    /* =======================================================
       SELECT PROJECT
  
       source:
         "auto"
         "manual"
         "next"
         "previous"
    ======================================================= */

    const selectProject = useCallback((projectId, source = "manual") => {
        setActiveProject((currentId) => {
            if (currentId === projectId) return currentId;

            const currentIndex = projects.findIndex((p) => p.id === currentId);
            const nextIndex = projects.findIndex((p) => p.id === projectId);

            if (currentIndex !== -1 && nextIndex !== -1) {
                setDirection(nextIndex > currentIndex ? 1 : -1);
            }

            return projectId;
        });

        // IMPORTANT:
        // Auto selection sirf active project change karega.
        // Manual / Prev / Next belt ko target karega.
        if (source !== "auto") {
            setTargetProject(projectId);
        }
    }, []);

    /* =======================================================
       NEXT
    ======================================================= */

    const handleNext =
        () => {
            const currentIndex =
                projects.findIndex(
                    (p) =>
                        p.id ===
                        activeProject
                );

            const nextIndex =
                (currentIndex + 1) %
                projects.length;

            setDirection(1);

            selectProject(
                projects[nextIndex].id,
                "next"
            );
        };

    /* =======================================================
       PREVIOUS
    ======================================================= */

    const handlePrevious =
        () => {
            const currentIndex =
                projects.findIndex(
                    (p) =>
                        p.id ===
                        activeProject
                );

            const previousIndex =
                (currentIndex -
                    1 +
                    projects.length) %
                projects.length;

            setDirection(-1);

            selectProject(
                projects[previousIndex].id,
                "previous"
            );
        };

    const currentProject =
        projects.find(
            (p) =>
                p.id ===
                activeProject
        ) || projects[0];

    return (
        <section
            id="projects"
            className={
                styles.projects
            }
        >
            {/* =================================================
          HEADER
      ================================================= */}

            <div
                className={
                    styles.sectionHeader
                }
            >
                <div className={styles.sectionLabel}>
                    <span
                        className={
                            styles.sectionNumber
                        }
                    >
                        03
                          <span />
                    </span>

                    <span
                        className={
                            styles.sectionTag
                        }
                    >
                        /PROJECTS
                    </span>
                </div>

                <h2>
                    THINGS I
                    <br />
                    <span>
                        HAVE BUILT.
                    </span>
                </h2>
            </div>

            {/* =================================================
          BELT
      ================================================= */}

            <div
                className={
                    styles.universe
                }
            >
                <div
                    className={
                        styles.energyLine
                    }
                />

                <div
                    className={
                        styles.energyLineTwo
                    }
                />

                <AsteroidBelt
                    activeProject={
                        activeProject
                    }
                    targetProject={
                        targetProject
                    }
                    onSelect={
                        selectProject
                    }
                />
            </div>

            {/* =================================================
          BOOK
      ================================================= */}

            <ProjectBook
                project={
                    currentProject
                }
                direction={
                    direction
                }
                onPrevious={
                    handlePrevious
                }
                onNext={
                    handleNext
                }
            />

            {/* =================================================
          BOTTOM
      ================================================= */}

            <div
                className={
                    styles.bottomInfo
                }
            >
                <span>
                    {String(
                        projects.findIndex(
                            (p) =>
                                p.id ===
                                activeProject
                        ) + 1
                    ).padStart(
                        2,
                        "0"
                    )}

                    {" / "}

                    {String(
                        projects.length
                    ).padStart(
                        2,
                        "0"
                    )}
                </span>

                <span>
                    DRAG THE BELT TO
                    EXPLORE
                </span>
            </div>
        </section>
    );
}