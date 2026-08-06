import type { Project, ProjectFilter, SkillGroup } from "@/types";

export const projectFilters: Array<"All" | ProjectFilter> = [
  "All",
  "React",
  "Tailwind",
  "Frontend",
];

export const projects: Project[] = [
  {
    title: "Electro E-commerce",
    description:
      "A responsive storefront with product discovery, filtering, cart management, and a focused checkout journey.",
    overview:
      "Electro is a front-end e-commerce application for browsing products and managing a shopping cart across screen sizes.",
    problem:
      "Product-heavy interfaces can become difficult to scan, especially when search, filters, and cart actions compete for attention.",
    solution:
      "The interface separates product discovery from cart actions and uses reusable React components to keep the browsing flow consistent.",
    learned:
      "This project strengthened my understanding of React component composition, shared state, and responsive utility-first styling.",
    challenges:
      "Keeping product filtering and cart state predictable while maintaining a clear layout on smaller screens.",
    future:
      "Add automated tests, stronger empty and error states, and a backend-powered checkout flow.",
    images: [
      {
        src: "/screenshots/electro-app-screen.png",
        alt: "Electro e-commerce product listing page",
      },
      {
        src: "/screenshots/electro-phones.png",
        alt: "Electro e-commerce phones category",
      },
      {
        src: "/screenshots/electro-product-details.png",
        alt: "Electro product details page",
      },
      {
        src: "/screenshots/electro-product-details2.png",
        alt: "Electro product details with purchasing options",
      },
      {
        src: "/screenshots/electro-cart.png",
        alt: "Electro shopping cart",
      },
      {
        src: "/screenshots/electro-checkout.png",
        alt: "Electro checkout page",
      },
    ],
    technologies: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    categories: ["React", "Tailwind", "Frontend"],
    features: [
      "Product search",
      "Smart filters",
      "Cart management",
      "Responsive checkout",
    ],
    liveUrl: "https://electro-one.vercel.app/",
    githubUrl: "https://github.com/AHM2010/electro",
  },
  {
    title: "Dahab Desserts",
    description:
      "A polished, mobile-first digital menu that makes categories easy to browse and ordering easy to start.",
    overview:
      "A single-page restaurant menu created for customers to browse dessert categories and move quickly toward ordering.",
    problem:
      "Long digital menus become tiring to navigate when every item appears in one continuous list.",
    solution:
      "Category filtering, a responsive grid, and a prominent delivery action reduce the steps between browsing and ordering.",
    learned:
      "I practiced translating a real client need into a focused interface and improving layout behavior across devices.",
    challenges:
      "Balancing decorative restaurant branding with readable menu content and touch-friendly controls.",
    future:
      "Add structured menu data, availability states, and a lightweight content-management workflow.",
    images: [
      {
        src: "/screenshots/dahab-menu-hero.png",
        alt: "Dahab Desserts menu landing section",
      },
      {
        src: "/screenshots/dahab-menu-categories1.png",
        alt: "Dahab Desserts menu categories",
      },
      {
        src: "/screenshots/dahab-menu-categories2.png",
        alt: "Dahab Desserts product category listing",
      },
      {
        src: "/screenshots/dahab-menu-search.png",
        alt: "Dahab Desserts menu search results",
      },
    ],
    technologies: ["HTML", "CSS Grid", "JavaScript"],
    categories: ["Frontend"],
    features: ["Category filtering", "Responsive menu", "Delivery CTA"],
    liveUrl: "https://ahm2010.github.io/Dahab-Desserts/",
    githubUrl: "https://github.com/AHM2010/Dahab-Desserts",
  },
  {
    title: "Task List",
    description:
      "A focused daily task manager with a simple interaction model and local progress persistence.",
    overview:
      "A small browser-based tool for adding, completing, and removing everyday tasks.",
    problem:
      "A useful task list needs to remain fast and understandable while preserving progress after a refresh.",
    solution:
      "A compact interface and browser storage keep the workflow immediate without requiring an account or backend.",
    learned:
      "I gained practical experience with DOM events, data persistence, and keeping UI state synchronized with stored data.",
    challenges:
      "Handling task updates consistently after create, complete, and delete actions.",
    future:
      "Add task editing, filters, due dates, keyboard shortcuts, and automated behavior tests.",
    images: [
      {
        src: "/screenshots/to-do-list-app1.png",
        alt: "Task List application with active tasks",
      },
      {
        src: "/screenshots/to-do-list-app2.png",
        alt: "Task List application showing completed tasks",
      },
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Local Storage"],
    categories: ["Frontend"],
    features: ["Local persistence", "Task states", "Responsive layout"],
    liveUrl: "https://ahm2010.github.io/TO-DO-list-web-app/",
    githubUrl: "https://github.com/AHM2010/TO-DO-list-web-app",
  },
  {
    title: "Advice Me",
    description:
      "A lightweight React experience that serves useful prompts through a clean and playful interface.",
    overview:
      "A focused React application that requests and presents random advice through a minimal interface.",
    problem:
      "Even a simple API-based experience needs clear loading behavior and an obvious way to request new content.",
    solution:
      "The app keeps a single primary action and gives the returned advice visual priority.",
    learned:
      "This project helped me practice React state, asynchronous requests, and user feedback around remote data.",
    challenges:
      "Keeping the interface responsive while accounting for the delay and uncertainty of an external API.",
    future:
      "Add retry feedback, saved advice, sharing options, and automated accessibility checks.",
    images: [
      {
        src: "/screenshots/advice-me-loading.png",
        alt: "Advice Me application loading new advice",
      },
      {
        src: "/screenshots/advice-me-advice.png",
        alt: "Advice Me application displaying generated advice",
      },
    ],
    technologies: ["React", "JavaScript", "REST API"],
    categories: ["React", "Frontend"],
    features: ["API integration", "Loading feedback", "Accessible controls"],
    liveUrl: "https://ahm2010.github.io/advice-me/",
    githubUrl: "https://github.com/AHM2010/advice-me",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Building structured, typed user interfaces.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    title: "UI & Experience",
    description: "Designing interfaces that work across devices.",
    skills: [
      "Framer Motion",
      "Responsive Design",
      "Accessibility",
      "Design Systems",
    ],
  },
  {
    title: "Tools",
    description: "A practical workflow from idea to deployment.",
    skills: ["Git", "GitHub", "Vercel", "VS Code", "npm", "Vite"],
  },
];

export const timeline = [
  {
    year: "2024",
    title: "Started focused web development study",
    description:
      "Built foundations in semantic HTML, CSS, JavaScript, Git, and GitHub through small browser projects.",
  },
  {
    year: "2025",
    title: "Shipped a first client project",
    description:
      "Designed and launched the Dahab Desserts menu, applying responsive design to a real business need.",
  },
  {
    year: "2025",
    title: "Moved into React",
    description:
      "Built Advice Me and Electro to practice component architecture, API usage, state, and utility-first styling.",
  },
  {
    year: "Now",
    title: "Deepening modern front-end skills",
    description:
      "Learning Next.js, TypeScript, accessibility, performance, and reusable UI systems through portfolio and dashboard work.",
  },
] as const;

export const socialLinks = {
  github: "https://github.com/AHM2010",
  linkedin: "https://www.linkedin.com/in/ahmed-ashraf-491132353/",
  facebook: "https://www.facebook.com/ahmed.bar.334491/",
};
