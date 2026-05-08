export type Role = {
  title: string;
  company: string;
  type?: string;
  start: string;
  end: string;
  duration: string;
  location?: string;
  blurb: string;
  stack?: string[];
};

export const experience: Role[] = [
  {
    title: "Software Engineer",
    company: "Boston Bioprocess",
    type: "Full-time",
    start: "Jan 2026",
    end: "Present",
    duration: "5 mos",
    location: "Illinois, US · Remote",
    blurb:
      "Building internal tooling and data systems for bioprocess workflows. FastAPI, SQLAlchemy, React, AWS, Postgres.",
    stack: ["FastAPI", "SQLAlchemy", "React", "AWS", "Postgres"],
  },
  {
    title: "Founding Product Engineer",
    company: "Whitecarrot.io",
    type: "Full-time",
    start: "Jan 2024",
    end: "Jan 2026",
    duration: "2 yrs 1 mo",
    location: "Dubai, UAE · Remote",
    blurb:
      "Architected and shipped a GenAI CV-screening system with LLMs, LangGraph, and LangChain — automated initial screening for 100% of applications and saved recruiters 10–15 hours a week. Owned integrations across AWS / GCP / Azure, plus the email / scheduling / webhook layer.",
    stack: ["NestJS", "AWS", "GCP", "Azure", "LangGraph", "LangChain", "Postgres", "Redis", "Elasticsearch"],
  },
  {
    title: "Product Engineer",
    company: "Whitecarrot.io",
    type: "Full-time",
    start: "Jul 2023",
    end: "Dec 2023",
    duration: "6 mos",
    location: "Remote",
    blurb:
      "Spearheaded core system reliability — resolved 15+ critical production issues and ATS webhook failures, restored 100% reliability for candidate invitation emails and stage tracking.",
    stack: ["Full-stack", "NestJS", "Postgres"],
  },
  {
    title: "Product Engineering Intern",
    company: "Whitecarrot.io",
    type: "Internship",
    start: "Jan 2023",
    end: "Jun 2023",
    duration: "6 mos",
    location: "Remote",
    blurb:
      "Engineered a custom email-templating system for the hiring journey, enabling 100% of hiring teams to fully personalize 3 core email types per stage (Invite, Reminder, Rejection).",
    stack: ["PostgreSQL", "Node.js", "NestJS"],
  },
  {
    title: "Online Tutor",
    company: "Course Hero",
    type: "Part-time",
    start: "May 2021",
    end: "Jun 2023",
    duration: "2 yrs 2 mos",
    blurb: "Tutoring CS and programming fundamentals.",
    stack: ["Computer Science", "Programming"],
  },
  {
    title: "Technical Manager",
    company: "For The People (NGO)",
    type: "Part-time",
    start: "Aug 2020",
    end: "Aug 2023",
    duration: "3 yrs 1 mo",
    location: "Hybrid",
    blurb: "Built and maintained the org's full-stack web presence.",
    stack: ["Full-Stack Development"],
  },
];

export const education = [
  {
    school: "RGUKT Basar",
    degree: "B.Tech, Computer Science",
    years: "2019–2023",
    grade: "8.67 GPA",
  },
  {
    school: "RGUKT Basar",
    degree: "Pre-University · Mathematics, Physics, Chemistry",
    years: "2017–2019",
    grade: "9.6 GPA",
  },
  {
    school: "Jawahar Navodaya Vidyalaya (JNV)",
    degree: "Class 10 — Secondary School",
    years: "—",
    grade: "completed",
  },
];

export const honors = [
  {
    title: "Winner — Smart India Hackathon 2022",
    issuer: "Ministry of Education / AICTE",
    date: "Aug 2022",
  },
  {
    title: "Finalist — PSI Blockathon (IIDC Network)",
    issuer: "Project Company",
    date: "Sep 2022",
  },
  {
    title: "IEEE Publication — Proof-of-Stake Consensus",
    issuer: "SoftCOM 2023",
    date: "Oct 2022",
  },
];
