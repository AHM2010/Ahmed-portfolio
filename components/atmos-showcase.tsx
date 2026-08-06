"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FiCheckCircle, FiChevronDown, FiGithub } from "react-icons/fi";
import { ProjectImageSlider } from "./project-image-slider";
import { Badge, ButtonLink } from "./ui";

const features = [
  "Live weather conditions",
  "Location search",
  "Multi-day forecasts",
  "Weather analytics",
  "City comparison",
  "Interactive weather map",
  "Arabic interface",
  "Unit preferences",
  "Responsive design",
  "Dark mode",
  "Accessible controls",
  "Loading and error states",
];

const tech = ["React", "TypeScript", "Tailwind CSS", "Weather API", "Charts"];

const atmosImages = [
  {
    src: "/screenshots/atmos-dashboard-overview.png",
    alt: "Atmos weather dashboard showing current conditions in dark mode",
  },
  {
    src: "/screenshots/atmos-forecast.png",
    alt: "Atmos responsive weather forecast on a mobile screen",
  },
  {
    src: "/screenshots/atmos-analytics-overview.png",
    alt: "Atmos weather analytics and forecast trends",
  },
  {
    src: "/screenshots/atmos-comparison-mode.png",
    alt: "Atmos weather analytics and city comparison view",
  },
  {
    src: "/screenshots/atmos-weather-map.png",
    alt: "Atmos interactive weather map",
  },
  {
    src: "/screenshots/atmos-arabic-dashboard.png",
    alt: "Atmos Arabic interface and weather preferences",
  },
] as const;

export function AtmosShowcase() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <article className="grid overflow-hidden rounded-[30px] border border-[#d5c9aa] bg-[#eee8d9] p-5 text-[#272820] shadow-soft md:p-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-12 lg:p-12 dark:border-transparent dark:bg-[#1b1d18] dark:text-[#f2f2ec]">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#8a6515] dark:text-[#dbb557]">
          Featured case study · Live project
        </p>
        <h3 className="mt-4 font-display text-5xl leading-none">
          Atmos Weather Dashboard
        </h3>
        <p className="mt-4 text-[#55574f] dark:text-[#c4c6bd]">
          A responsive weather workspace that turns live conditions, forecasts,
          maps, and comparisons into a clear experience for planning ahead.
        </p>
        <h4 className="mb-2 mt-7 text-xs font-bold uppercase tracking-widest text-[#8a6515] dark:text-[#dbb557]">
          Project overview
        </h4>
        <p className="text-[#5e6058] dark:text-[#bcbeb6]">
          Atmos brings current conditions, forecast trends, weather analytics,
          and location-based exploration into one polished dashboard that works
          across languages, themes, and screen sizes.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {tech.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <ButtonLink
            href="https://atmos-weather-dashboard-swart.vercel.app/"
            variant="contact"
            external
          >
            Live demo
          </ButtonLink>
          <ButtonLink
            href="https://github.com/AHM2010/atmos-weather-dashboard"
            variant="contact"
            external
          >
            <FiGithub aria-hidden />
            GitHub repo
          </ButtonLink>
        </div>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {features.map((feature) => (
            <li
              className="flex items-center gap-2 text-xs text-[#55574f] dark:text-[#c5c7be]"
              key={feature}
            >
              <FiCheckCircle
                className="shrink-0 text-[#9a7119] dark:text-[#d9ad45]"
                aria-hidden
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <ProjectImageSlider
        images={atmosImages}
        galleryLabel="Atmos Weather Dashboard project screenshots"
        priority
        aspectClassName="aspect-16/10"
        className="mt-9 self-center rounded-[20px] border border-[#cbbd99] bg-[#ddd4bd] shadow-2xl lg:mt-0 dark:border-[#363a31] dark:bg-[#0d0f0c]"
      />
      <div className="col-span-full mt-8 border-t border-[#cfc3a5] pt-5 dark:border-[#34372f]">
        <button
          className="flex w-full items-center justify-between text-left font-bold"
          type="button"
          aria-expanded={detailsOpen}
          aria-controls="atmos-case-study-details"
          onClick={() => setDetailsOpen((open) => !open)}
        >
          {detailsOpen ? "Hide case-study details" : "Read case-study details"}
          <FiChevronDown
            className={`transition-transform duration-300 ${detailsOpen ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
        <AnimatePresence initial={false}>
          {detailsOpen && (
            <motion.div
              id="atmos-case-study-details"
              className="overflow-hidden"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="mt-5 grid gap-4 text-xs text-[#5e6058] sm:grid-cols-2 lg:grid-cols-5 [&_b]:block [&_b]:text-[#8a6515] dark:text-[#aeb1a8] dark:[&_b]:text-[#dfb956]"
                initial={reduceMotion ? false : { y: -8 }}
                animate={{ y: 0 }}
                exit={reduceMotion ? undefined : { y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <p>
                  <b>Problem</b> Weather data is often spread across
                  disconnected views, making it harder to compare places or
                  understand how conditions will change.
                </p>
                <p>
                  <b>Solution</b> A unified dashboard with clear forecasts,
                  interactive analytics, map exploration, and preferences that
                  adapt the experience to each user.
                </p>
                <p>
                  <b>What I learned</b> Working with asynchronous weather data,
                  data visualization, localization, and responsive information
                  design for both quick checks and deeper analysis.
                </p>
                <p>
                  <b>Challenges</b> Presenting dense, changing data clearly
                  while keeping charts, maps, themes, and mobile layouts
                  consistent.
                </p>
                <p>
                  <b>Future improvements</b> Add saved locations, severe-weather
                  alerts, offline-friendly caching, and broader automated test
                  coverage.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}
