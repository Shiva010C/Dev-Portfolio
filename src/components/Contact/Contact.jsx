import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Contact.module.css";

const socialLinks = [
  {
    name: "GitHub",
    icon: "⌘",
    href: "https://shiva010c.github.io/",
  },
  {
    name: "LinkedIn",
    icon: "in",
    href: "https://linkedin.com/",
  },
  {
    name: "Email",
    icon: "✉",
    href: "shivamandal0030@gmail.com",
  },
];

function Contact() {
  const formRef = useRef(null);

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = formRef.current;

    if (!form) return;

    // Get form values
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Validation BEFORE transmission animation
    if (!name || !email || !message) {
      setError("PLEASE COMPLETE ALL TRANSMISSION FIELDS.");
      return;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("PLEASE ENTER A VALID EMAIL ADDRESS.");
      return;
    }

    // Everything is valid
    setError("");
    setSending(true);

    emailjs
      .sendForm(
        "service_mail04",
        "template_9qaen5e",
        form,
        {
          publicKey: "VS2GA49915xKAoK0K",
        }
      )
      .then(() => {
        setSending(false);
        setSent(true);
      })
      .catch((error) => {
        console.error("Transmission failed:", error);

        setSending(false);
        setError(
          "TRANSMISSION FAILED. PLEASE TRY AGAIN."
        );
      });
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }

    setSent(false);
    setError("");
  };

  return (
    <section id="contact" className={styles.contact}>
      {/* Background atmosphere */}
      <div className={styles.nebula} />
      <div className={styles.grid} />

      {/* Heading */}
      <motion.div
        className={styles.heading}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <span className={styles.sectionNumber}>04</span>

        <div>
          <p className={styles.eyebrow}>COMMUNICATION CHANNEL</p>
          <h2>
            CONTACT<span>.</span>
          </h2>
        </div>
      </motion.div>

      <div className={styles.content}>
        {/* LEFT SIDE */}
        <motion.div
          className={styles.identity}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.signalHeader}>
            <span className={styles.signalDot} />
            <span>SIGNAL DETECTED</span>
          </div>

          <h3>
            HELLO,
            <br />
            <span>EXPLORER.</span>
          </h3>

          <p className={styles.introText}>
            Have a project in mind, want to collaborate, or simply want to
            say hello?
          </p>

          <p className={styles.introText}>
            Open a communication channel and send me a transmission.
          </p>

          {/* Status */}
          <div className={styles.statusBox}>
            <div className={styles.statusIcon}>
              <span />
            </div>

            <div>
              <small>STATUS</small>
              <strong>AVAILABLE FOR CONNECTION</strong>
            </div>
          </div>

          {/* Social links */}
          <div className={styles.socials}>
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target={social.name !== "Email" ? "_blank" : undefined}
                rel={
                  social.name !== "Email"
                    ? "noopener noreferrer"
                    : undefined
                }
                className={styles.social}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + index * 0.1,
                  duration: 0.5,
                }}
                whileHover={{ y: -5 }}
              >
                <span className={styles.socialIcon}>{social.icon}</span>
                <span>{social.name}</span>
                <span className={styles.arrow}>↗</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className={styles.terminal}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {/* Terminal top */}
          <div className={styles.terminalTop}>
            <div className={styles.terminalLights}>
              <span />
              <span />
              <span />
            </div>

            <span className={styles.terminalTitle}>
              TRANSMISSION_PORTAL
            </span>

            <span className={styles.online}>ONLINE</span>
          </div>

          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                ref={formRef}
                key="form"
                className={styles.form}
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
              >
                {/* Name */}
                <div className={styles.field}>
                  <label htmlFor="name">
                    <span>&gt;</span> ENTER YOUR NAME
                  </label>

                  <div className={styles.inputWrapper}>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your name..."
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className={styles.field}>
                  <label htmlFor="email">
                    <span>&gt;</span> ENTER EMAIL
                  </label>

                  <div className={styles.inputWrapper}>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div className={styles.field}>
                  <label htmlFor="message">
                    <span>&gt;</span> TRANSMISSION MESSAGE
                  </label>

                  <div className={styles.inputWrapper}>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      rows="5"
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.p
                    className={styles.errorMessage}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ⚠ {error}
                  </motion.p>
                )}

                {/* Send */}
                <motion.button
                  type="submit"
                  className={styles.sendButton}
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {sending ? (
                    <>
                      <span className={styles.loader} />
                      TRANSMITTING...
                    </>
                  ) : (
                    <>
                      SEND TRANSMISSION
                      <span>→</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className={styles.success}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={styles.successRing}>
                  <span>✓</span>
                </div>

                <p className={styles.successLabel}>
                  TRANSMISSION COMPLETE
                </p>

                <h4>MESSAGE SENT</h4>

                <p>
                  Your transmission has successfully reached the destination.
                </p>

                <motion.button
                  type="button"
                  onClick={resetForm}
                  className={styles.newMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  NEW TRANSMISSION
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom decoration */}
      <div className={styles.bottomLine}>
        <span />
        <p>END OF COMMUNICATION CHANNEL</p>
        <span />
      </div>
    </section>
  );
}

export default Contact;