import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar/Navbar";
import SideNav from "./components/SideNav/SideNav";
import Hero from "./components/Hero/Hero";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import StarField from "./components/StarField/StarField";
import MobileMenu from "./components/MobileMenu/MobileMenu";

gsap.registerPlugin(ScrollTrigger);

export default function App() {

  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") || el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      gsap.utils.toArray("[data-section-line]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="app-shell">
      <StarField density={0.00015} />
      <Navbar />
      <MobileMenu/>
      <SideNav />
      <main>
        <Hero onIntroComplete={() => setIntroFinished(true)} />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}