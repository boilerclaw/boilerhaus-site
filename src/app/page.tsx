"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Theme = "light" | "dark";

const links = [
  { label: "Farcaster", href: "https://farcaster.xyz/boiler" },
  { label: "Substack", href: "https://substack.com/@boiler" },
  { label: "Telegram", href: "https://t.me/boilerrat" },
  { label: "GitHub", href: "https://github.com/boilerrat" },
];

const agentLinks = [
  {
    name: "Boilerclaw",
    href: "https://github.com/boilerclaw",
    description: "Autonomous builder agent",
  },
  {
    name: "Boilermolt",
    href: "https://github.com/boilermolt",
    description: "Companion execution agent",
  },
];

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.dataset.theme = stored;
      return;
    }

    const system = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(system);
    document.documentElement.dataset.theme = system;
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  };

  return (
    <main className={styles.page}>
      <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle color theme">
        {theme === "light" ? "Dark" : "Light"}
      </button>

      <section className={styles.hero}>
        <h1 className={styles.wordmark}>boilerhaus</h1>
        <p className={styles.tagline}>Ideas, built.</p>

        <nav className={styles.links} aria-label="Social links">
          {links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
              <span aria-hidden="true"> ↗</span>
            </a>
          ))}
        </nav>

        <section className={styles.agentSection} aria-label="Agent profiles">
          <p className={styles.agentHeading}>agents</p>
          <div className={styles.agentGrid}>
            {agentLinks.map((agent) => (
              <a
                key={agent.name}
                className={styles.agentCard}
                href={agent.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.agentName}>{agent.name}</span>
                <span className={styles.agentDescription}>{agent.description}</span>
              </a>
            ))}
          </div>
        </section>
      </section>

      <footer className={styles.footer}>© 2026 boilerhaus</footer>
    </main>
  );
}
