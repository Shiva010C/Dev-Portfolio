import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}><b><span>S</span><span>M</span></b><span>Shiva Mandal</span></div>
      <nav>
        <a href="#home">Home</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className={styles.words}>Design&nbsp; → &nbsp;Code&nbsp; → &nbsp;Create&nbsp; → &nbsp;Repeat&nbsp; ∞</div>
    </footer>
  );
}