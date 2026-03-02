// src/data/resume-data.ts
export const personalInfo = {
  name: "Usman Saqlain",
  title: "Usman's Technical Profile",
  subtitle: "Senior Full-Stack Developer & AI Solutions Engineer",
  tagline:
    "12+ years building enterprise web applications with PHP, Drupal, Python & modern JavaScript frameworks. Skilled in cloud infrastructure, DevOps, SecOps, CI/CD, automation and AI toolchains & development.",
  location: "Chicago Metropolitan Area, IL",
  email: "usaqlain01@gmail.com",
  phone: "630-802-7363",
  linkedin: "linkedin.com/in/usmansaqlain",
  github: "github.com/usaqlain01",
  website: "usmanport.com",
  clearance: "US Security Clearance: Active",
};

export const skills = [
  { name: "Drupal CMS", level: 11, unit: "years" },
  { name: "PHP / SQL", level: 13, unit: "years" },
  { name: "HTML / CSS / JS", level: 15, unit: "years" },
  { name: "AWS / Cloud Infrastructure", level: 5, unit: "years" },
  { name: "DevOps / CI/CD Pipelining", level: 6, unit: "years" },
  { name: "Docker / Containerization / Virtualization", level: 7, unit: "years" },
  { name: "jQuery / Angular", level: 9, unit: "years" },
  { name: "React / Next.js", level: 3, unit: "years" },
  { name: "Tailwind / Bootstrap / SASS", level: 5, unit: "years" },
  { name: "GraphQL & Web3 APIs", level: 3, unit: "years" },
  { name: "Prompt Engineering & Proficient LLM Utilization", level: 2, unit: "years" },
  { name: "Code Generation & AI Assisted Development", level: 2, unit: "years" },
  { name: "Task Chaining & Autonomous Agentic Loops", level: 1, unit: "years" },
  { name: "MCP / RAG", level: 0.5, unit: "years" },
  { name: "LangChain / LangGraph / AIOps", level: 0.5, unit: "years" },
];

export const skillDistribution = [
  { name: "Drupal Full-Stack", value: 43, color: "#10b981" },
  { name: "Full-Stack Applications & APIs", value: 21, color: "#f59e0b" },
  { name: "AI Toolchains & Solutions", value: 23, color: "#8b5cf6" },
  { name: "Cloud Infrastructure", value: 13, color: "#3b82f6" },
];

export interface Experience {
  id: string;
  company: string;
  shortName: string;
  role: string;
  location: string;
  period: string;
  type?: string;
  summary: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    id: "genesys-works",
    company: "Genesys Works",
    shortName: "Genesys Works",
    role: "Drupal, React & AI Applications Lead",
    location: "Remote - Houston, TX",
    period: "Nov 2025 - Present",
    summary:
      "Building Drupal Alumni Portal and Next.js Partner Portal with AI-powered tooling and cross-platform integrations.",
    highlights: [
      "Converted Figma wireframes into a functional Alumni Portal modeled after LinkedIn's UX patterns",
      "Built interactive dashboards and control structures in Next.js using AI-assisted rapid development",
      "Implemented Azure Functions as an API gateway connecting application portals to Salesforce",
      "Integrated RAG-based chatbots and MCP server connections across applications and services",
      "Configured Moodle LMS integrations with custom Drupal entities serving as its presentation layer",
      "Developed custom Drupal modules and connectors for task management, to-do tracking and relationships",
      "Applied AI tooling across the SDLC to bridge SME gaps, automate QA and accelerate delivery",
      "Architected data flow pipelines between portals, Salesforce and third-party API gateways",
    ],
  },
  {
    id: "concept-plus",
    company: "Concept Plus LLC",
    shortName: "Concept Plus",
    role: "Senior Drupal Developer",
    location: "Remote - Fairfax, VA",
    period: "Dec 2024 - Oct 2025",
    type: "Federal Contractor: HHS",
    summary:
      "Developed, deployed, maintained and migrated web applications for the U.S. Department of Health & Human Services.",
    highlights: [
      "Developed new features, proposed novel solutions and integrated reliable APIs and services",
      "Deployed code and configurations to AWS Cloud and maintained robust cloud infrastructure",
      "Streamlined frontend using USWDS and reusable Paragraphs components",
      "Built connector modules and custom plugins for the USA Jobs Portal API",
      "Enhanced unified portal search with Apache Solr and optimized caching via Redis",
      "Wrote Ansible automation scripts for content backup and CI/CD delivery pipelines",
      "Implemented AMS SSO authentication and maintained federal security policies",
      "Established remote dev environments utilizing WSL, DDEV and Docker-based containerd sandboxes",
    ],
  },
  {
    id: "masternoders",
    company: "MasterNoders Inc.",
    shortName: "MasterNoders",
    role: "Co-Founder & Technical Architect",
    location: "Chicago, IL",
    period: "Mar 2022 - Dec 2024",
    type: "Co-Founded Startup",
    summary:
      "Co-founded a Web3 platform for pooling and deploying blockchain nodes on AWS, building the full-stack architecture from the ground up.",
    highlights: [
      "Built Web 3.0 API gateway as a Drupal 9 service module for chain analysis and polling queues",
      "Integrated D3.js and Chart.js for advanced data visualization and real-time plotting",
      "Designed plugins to execute smart blockchain contracts from the GUI",
      "Wrote comprehensive PHPUnit test suites and performed regression testing",
      "Maintained federal accessibility, digital finance, and WCAG compliance",
      "Leveraged AI tools (Copilot, GPT) to accelerate service and API code generation",
    ],
  },
  {
    id: "hni",
    company: "HNI Corporation",
    shortName: "HNI Corp",
    role: "Senior Drupal Developer",
    location: "Glen Ellyn, IL - Muscatine, IA",
    period: "Aug 2019 - Mar 2022",
    summary:
      "Built complete e-commerce solutions, provisioned cloud infrastructure, and managed CI/CD pipelines for a Fortune 500 manufacturer.",
    highlights: [
      "Migrated legacy Drupal 6/7 and WordPress applications to containerized Drupal 8/9",
      "Installed ElasticSearch engine and indexed data for cross-site searchability",
      "Implemented Lando for simplified Docker containerization and automated builds",
      "Administered modules, themes, and vendors with optimized Composer constraints",
      "Researched and implemented open-source Web3 & PHP solutions as extensions",
    ],
  },
  {
    id: "walgreens",
    company: "Walgreens / Photon IT",
    shortName: "Walgreens",
    role: "Software Engineer",
    location: "Deerfield, IL",
    period: "Sep 2018 - Aug 2019",
    summary:
      "Led migration of an entire Oracle ecosystem to a modern PHP CMS, achieving millions in cost savings.",
    highlights: [
      "Migrated Oracle data structures into Drupal entities with modeled type relationships",
      "Decoupled the frontend using Angular SPA with a custom API gateway module",
      "Optimized databases, configured CDNs, and integrated Varnish Cache to reduce latency",
      "Identified bottlenecks through rigorous load testing and debugged them systematically",
      "Saved millions by replacing Oracle contracts with Drupal without performance loss",
    ],
  },
  {
    id: "builtin",
    company: "BuiltIn Inc.",
    shortName: "BuiltIn",
    role: "Developer",
    location: "Chicago, IL",
    period: "Jan 2018 - Jul 2018",
    summary:
      "Built listing applications on distributed cloud containers and integrated third-party APIs for a fast-growing tech startup.",
    highlights: [
      "Built a modern Drupal multisite with automated pipelines per metropolitan area",
      "Prototyped features and wrote crawlers to automate content listings",
      "Managed P2C server infrastructure migration and provisioned hybrid network",
      "Delivered rapid buildouts under tight deadlines with minimal resources",
    ],
  },
  {
    id: "caxy",
    company: "Caxy Interactive",
    shortName: "Caxy",
    role: "Web Developer",
    location: "Chicago, IL",
    period: "Apr 2015 - Jun 2017",
    summary:
      "Built and maintained diverse web and mobile applications using PHP MVCs, Drupal CMS, and JavaScript frameworks for major institutions.",
    highlights: [
      "Built full-stack solutions for Chicago Field Museum and Cornell University",
      "Contributed modules, patches, and volunteered as maintainer on drupal.org",
      "Wrote complete unit and functional testing suites for Drupal, Symfony, and Laravel",
      "Designed responsive, WCAG-compliant interfaces with optimized SEO",
      "Supported multiple projects simultaneously, enhancing workflow management skills",
    ],
  },
];

export const education = {
  degree: "B.Sc. in Computer Science",
  school: "Northeastern Illinois University",
  location: "Chicago, IL",
  year: "2011",
};

export const certifications = [
  {
    name: "Drupal 8 Foundations",
    issuer: "Acquia Cloud Platform",
    date: "May 2016",
  },
  {
    name: "Solutions Architect Associate",
    issuer: "Amazon Web Services",
    date: "Oct 2017",
  },
  {
    name: "Developer Associate",
    issuer: "Amazon Web Services",
    date: "Oct 2017",
  },
];

export const courses = [
  {
    name: "Claude Code: A Highly Agentic Coding Assistant",
    provider: "DeepLearning.AI",
    status: "Completed",
  },
  {
    name: "Build Apps with LangChain",
    provider: "DeepLearning.AI",
    status: "In Progress",
  },
  {
    name: "Multi AI Agent Systems with CrewAI",
    provider: "DeepLearning.AI",
    status: "In Progress",
  },
  {
    name: "Build AI Apps with MCP Servers",
    provider: "DeepLearning.AI",
    status: "Completed",
  },
];

export const githubStats = {
  contributions: 432,
  period: "Last 12 months",
};