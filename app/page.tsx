import Image from "next/image";
import Link from "next/link";
import {
  FiArrowDown,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import { BackToTop } from "@/components/back-to-top";
import { ContactCards } from "@/components/contact-cards";
import { CrmShowcase } from "@/components/crm-showcase";
import { AtmosShowcase } from "@/components/atmos-showcase";
import { Header } from "@/components/header";
import { Reveal } from "@/components/motion";
import { ProjectExplorer } from "@/components/project-explorer";
import { Timeline } from "@/components/timeline";
import { Badge, ButtonLink, Section } from "@/components/ui";
import { skillGroups, socialLinks } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <a
        className="fixed -top-16 left-3 z-999 rounded-lg bg-ink px-4 py-2 text-cream focus:top-3"
        href="#main"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <section
          id="top"
          className="mx-auto grid min-h-[calc(100vh-88px)] w-[min(1160px,calc(100%-40px))] items-center gap-16 py-16 sm:w-[min(1160px,calc(100%-28px))] lg:grid-cols-[1.18fr_.82fr] lg:gap-20 lg:py-24"
        >
          <Reveal className="hero-copy">
            <p className="mb-5 text-xs font-bold uppercase tracking-[.15em] text-[#8a6515] dark:text-[#e1b54e]">
              <span className="relative mr-2.5 inline-flex size-2" aria-hidden>
                <span className="absolute inset-0 animate-ping rounded-full bg-[#54a26c]/65 [animation-duration:2s] motion-reduce:animate-none" />
                <span className="relative size-2 rounded-full bg-[#54a26c] shadow-[0_0_0_5px_rgba(84,162,108,.15)]" />
              </span>
              Available for junior / mid-level opportunities
            </p>
            <h1 className="mb-7 max-w-4xl font-display text-[clamp(3.4rem,6.7vw,6.4rem)] font-semibold leading-[.94] tracking-[-.055em] [&_em]:font-medium [&_em]:text-[#8a6515] dark:[&_em]:text-[#e1b54e]">
              I build digital experiences that feel <em>clear, useful,</em> and
              human.
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-muted dark:text-[#b0b0a7]">
              I’m Ahmed Ashraf, a front-end developer based in Saudi Arabia. I
              turn product ideas into responsive, accessible interfaces using
              React, Next.js, and TypeScript.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="#projects">
                View projects <FiArrowDown />
              </ButtonLink>
              <span className="grid text-center">
                <span
                  className="inline-flex min-h-12 cursor-not-allowed items-center gap-2 rounded-[14px] border border-[#dcd7cc] bg-paper px-5 font-bold opacity-60 dark:border-[#33352e] dark:bg-[#191a16]"
                  aria-disabled="true"
                >
                  <FiDownload />
                  Download CV
                </span>
                <small className="text-[.65rem] text-muted dark:text-[#b0b0a7]">
                  CV coming soon
                </small>
              </span>
              <ButtonLink href="#contact" variant="text">
                Contact me
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted dark:text-[#b0b0a7]">
              <span className="flex items-center gap-2">
                <FiMapPin />
                Al Madinah, Saudi Arabia
              </span>
              <span>Arabic & English</span>
            </div>
          </Reveal>
          <Reveal
            delay={0.12}
            className="relative mx-auto aspect-4/5 w-full max-w-lg"
          >
            <div className="absolute inset-x-0 -top-4 bottom-6 rounded-[180px_180px_34px_34px] border border-gold sm:-inset-x-4" />
            <Image
              src="/logo/logo.jpeg"
              fill
              priority
              sizes="(max-width: 850px) 92vw, 38vw"
              alt="Ahmed Ashraf wearing a dark suit"
              className="rounded-[160px_160px_24px_24px] object-cover object-[54%_35%] saturate-[.78] shadow-soft"
            />
            <div className="absolute bottom-7 right-0 grid rounded-2xl border border-[#dcd7cc] bg-paper px-4 py-3 shadow-soft md:-right-7 dark:border-[#33352e] dark:bg-[#191a16]">
              <span className="text-[.7rem] uppercase tracking-wider text-muted dark:text-[#b0b0a7]">
                Current focus
              </span>
              <strong>Next.js · TypeScript · UI systems</strong>
            </div>
          </Reveal>
        </section>
        <div className="mx-auto w-[min(1160px,calc(100%-40px))] sm:w-[min(1160px,calc(100%-28px))]">
          <Section
            id="projects"
            eyebrow="Selected work"
            title="Projects with purpose."
            intro="Filter the collection by technology, then open any case study for the decisions, challenges, and next steps behind it."
          >
            <div className="grid gap-6 md:gap-8">
              <Reveal>
                <CrmShowcase />
              </Reveal>
              <Reveal>
                <AtmosShowcase />
              </Reveal>
            </div>
            <ProjectExplorer />
          </Section>
          <Section
            id="skills"
            eyebrow="Capabilities"
            title="Tools I use to build."
            intro="A focused toolkit for creating maintainable interfaces—from semantic foundations to polished interactions."
          >
            <div className="grid gap-5 lg:grid-cols-3">
              {skillGroups.map((group, i) => (
                <Reveal
                  key={group.title}
                  delay={i * 0.08}
                  className="min-h-64 rounded-[22px] border border-[#dcd7cc] bg-paper p-7 dark:border-[#33352e] dark:bg-[#191a16]"
                >
                  <span className="font-display text-sm text-[#8a6515] dark:text-[#e1b54e]">
                    0{i + 1}
                  </span>
                  <h3 className="mb-2 mt-8 font-display text-3xl">
                    {group.title}
                  </h3>
                  <p className="text-muted dark:text-[#b0b0a7]">
                    {group.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
          <Section
            id="about"
            eyebrow="About me"
            title="Learning by building."
            intro="Curious about the details, practical about the outcome."
          >
            <div className="grid gap-8 md:grid-cols-[.85fr_1.15fr] md:gap-20">
              <Reveal>
                <p className="font-display text-[clamp(2rem,3.5vw,3.4rem)] leading-[1.14] tracking-[-.035em]">
                  I’m a student and front-end developer who enjoys turning
                  complex ideas into interfaces that are straightforward to use.
                </p>
              </Reveal>
              <Reveal
                delay={0.08}
                className="space-y-5 text-lg text-muted dark:text-[#b0b0a7]"
              >
                <p>
                  I specialize in responsive React interfaces and I’m developing
                  deeper expertise in Next.js, TypeScript, accessibility, and
                  scalable component architecture. My recent work ranges from
                  e-commerce experiences to small tools and business dashboards.
                </p>
                <p>
                  I’m currently learning more about testing, performance, and
                  design systems. My goal is to join a collaborative team where
                  I can contribute dependable UI work, learn from experienced
                  engineers, and grow into a well-rounded product developer.
                </p>
              </Reveal>
            </div>
          </Section>
          <Section
            id="journey"
            eyebrow="Experience"
            title="A practical learning journey."
            intro="Realistic milestones from foundational study to client work and modern React projects."
          >
            <Timeline />
          </Section>
          <Section
            id="contact"
            eyebrow="Let’s connect"
            title="Have a role or project in mind?"
            intro="I’m open to front-end opportunities, freelance projects, and conversations with other builders."
          >
            <Reveal className="flex flex-col items-start justify-between gap-8 rounded-[28px] bg-gold p-7 text-ink md:flex-row md:items-center md:p-12">
              <div>
                <h3 className="font-display text-4xl">
                  Let’s make something useful.
                </h3>
                <p className="mt-2 max-w-2xl text-[#3f361f]">
                  Tell me about the role, your product, or the problem you’re
                  trying to solve. I’ll get back to you as soon as I can.
                </p>
              </div>
              <ButtonLink
                href="mailto:ahmed_ashraf2010@yahoo.com"
                variant="contact"
              >
                Email Ahmed <FiMail />
              </ButtonLink>
            </Reveal>
            <ContactCards />
          </Section>
        </div>
      </main>
      <footer className="relative overflow-hidden py-7">
        <div className="relative mx-auto grid min-h-44 w-[min(1160px,calc(100%-40px))] gap-8 overflow-hidden rounded-[26px] border border-[#dcd7cc] bg-paper p-7 text-ink shadow-soft before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:animate-footer-shimmer before:bg-linear-to-r before:from-transparent before:via-gold before:to-transparent before:bg-size-[45%_100%] before:bg-no-repeat motion-reduce:before:animate-none sm:w-[min(1160px,calc(100%-28px))] md:grid-cols-[1fr_auto_auto] md:items-end md:p-11 dark:border-white/10 dark:bg-[#151815] dark:text-[#e8e9e4] dark:shadow-2xl">
          <div className="grid self-stretch">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d8ae4a]">
              Let’s keep in touch
            </span>
            <strong className="mt-auto font-display text-3xl text-ink dark:text-white">
              Ahmed Ashraf
            </strong>
            <p className="text-sm text-[#989d95]">
              © {new Date().getFullYear()} · Front-End Developer
            </p>
          </div>
          <nav
            className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm font-bold text-muted dark:text-[#adb1aa]"
            aria-label="Footer navigation"
          >
            {[
              ["Projects", "#projects"],
              ["Skills", "#skills"],
              ["About", "#about"],
              ["Journey", "#journey"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <Link
                className="group flex items-center transition hover:translate-x-1 hover:text-ink dark:hover:text-white"
                href={href}
                key={href}
              >
                {label}
                <span className="ml-1 -translate-x-1 translate-y-1 text-gold opacity-0 transition group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                  ↗
                </span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              className="grid size-10 place-items-center rounded-xl border border-[#dcd7cc] bg-ink/5 transition hover:-translate-y-1 hover:border-[#8a6515] hover:bg-[#8a6515] dark:hover:text-[#e1b54e] dark:border-white/15 dark:bg-white/5"
              href={socialLinks.github}
              aria-label="GitHub"
              target="_blank"
            >
              <FiGithub />
            </Link>
            <Link
              className="grid size-10 place-items-center rounded-xl border border-[#dcd7cc] bg-ink/5 transition hover:-translate-y-1 hover:border-[#8a6515] hover:bg-[#8a6515] dark:hover:text-[#e1b54e] dark:border-white/15 dark:bg-white/5"
              href={socialLinks.linkedin}
              aria-label="LinkedIn"
              target="_blank"
            >
              <FiLinkedin />
            </Link>
            <Link
              className="grid size-10 place-items-center rounded-xl border border-[#dcd7cc] bg-ink/5 transition hover:-translate-y-1 hover:border-[#8a6515] hover:bg-[#8a6515] dark:hover:text-[#e1b54e] dark:border-white/15 dark:bg-white/5"
              href="mailto:ahmed_ashraf2010@yahoo.com"
              aria-label="Email"
            >
              <FiMail />
            </Link>
            <BackToTop />
          </div>
        </div>
      </footer>
    </>
  );
}
