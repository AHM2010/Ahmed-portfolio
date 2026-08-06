"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown, FiGithub } from "react-icons/fi";
import type { Project } from "@/types";
import { Badge, ButtonLink } from "./ui";
import { ProjectImageSlider } from "./project-image-slider";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  return (
    <article className="group overflow-hidden rounded-[22px] border border-[#dcd7cc] bg-paper transition duration-300 hover:-translate-y-1.5 hover:shadow-soft dark:border-[#33352e] dark:bg-[#191a16]">
      <ProjectImageSlider
        images={project.images}
        galleryLabel={`${project.title} project screenshots`}
        priority={priority}
      />
      <div className="p-6">
        <h3 className="font-display text-2xl">{project.title}</h3>
        <p className="mt-2 text-muted dark:text-[#b0b0a7]">
          {project.description}
        </p>
        <ul className="my-5 flex list-disc flex-wrap gap-x-6 gap-y-1 pl-5 text-sm text-muted dark:text-[#b0b0a7]">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.liveUrl && (
            <ButtonLink href={project.liveUrl} variant="secondary" external>
              Live demo
            </ButtonLink>
          )}
          {project.githubUrl && (
            <ButtonLink href={project.githubUrl} variant="secondary" external>
              <FiGithub />
              GitHub repo
            </ButtonLink>
          )}
        </div>
        <div className="mt-6 border-t border-[#dcd7cc] pt-5 dark:border-[#33352e]">
          <button
            className="flex w-full items-center justify-between text-left font-bold"
            type="button"
            aria-expanded={detailsOpen}
            aria-controls={`details-${project.title.replaceAll(" ", "-").toLowerCase()}`}
            onClick={() => setDetailsOpen((open) => !open)}
          >
            {detailsOpen ? "Hide project details" : "Read project details"}
            <FiChevronDown
              className={`transition-transform duration-300 ${detailsOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
          <AnimatePresence initial={false}>
            {detailsOpen && (
              <motion.div
                id={`details-${project.title.replaceAll(" ", "-").toLowerCase()}`}
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
                  className="mt-5 grid gap-5 sm:grid-cols-2"
                  initial={reduceMotion ? false : { y: -8 }}
                  animate={{ y: 0 }}
                  exit={reduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <Detail title="Overview" text={project.overview} />
                  <Detail title="Problem" text={project.problem} />
                  <Detail title="Solution" text={project.solution} />
                  <Detail title="What I learned" text={project.learned} />
                  <Detail title="Challenges" text={project.challenges} />
                  <Detail title="Future improvements" text={project.future} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}

function Detail({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-[#8a6515] dark:text-[#e1b54e]">
        {title}
      </h4>
      <p className="text-xs leading-relaxed text-muted dark:text-[#b0b0a7]">
        {text}
      </p>
    </div>
  );
}
