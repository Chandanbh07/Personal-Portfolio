export const profile = {
  name: "Chandanagouda Hiregoudra",
  initials: "CH",
  role: "Full Stack Developer",
  location: "Bangalore, India",
  email: "chandanhiregoudra@gmail.com",
  phone: "+91 7019308755",
  github: "https://github.com/Chandanbh07",
  linkedin: "https://www.linkedin.com/in/chandanagouda-hiregoudra-130a9a2b3/",
  tagline:
    "Building modern, responsive, and scalable web applications that deliver seamless user experiences.",
};

export const about = {
  eyebrow: "About Me",
  heading: "Passionate about building great things",
  paragraphs: [
    "Hi, I'm Chandanagouda — a passionate Full Stack Developer based in India. I enjoy building modern, responsive, and scalable web applications that deliver seamless user experiences.",
    "My primary tech stack includes React, Next.js, TypeScript, Node.js, Express.js, and MongoDB. I focus on writing clean, maintainable code while emphasizing performance, accessibility, and intuitive UI design.",
    "I'm constantly learning new technologies, exploring modern development practices, and building projects that strengthen my skills. I'm currently seeking opportunities where I can contribute, grow as a software engineer, and solve real-world problems through technology.",
  ],
  stats: [
    { value: "10+", label: "Projects Built" },
    { value: "200+", label: "GitHub Commits" },
    { value: "15+", label: "Technologies Learned" },
    { value: "100%", label: "Passion for Learning" },
  ],
};

export const skillGroups = [
  {
    label: "Languages",
    items: ["C/C++", "Java", "Python"],
  },
  {
    label: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "React Native"],
  },
  {
    label: "Backend & Data",
    items: ["Node.js", "Express", "MongoDB", "SQL"],
  },
  {
    label: "ML & Cloud",
    items: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
      "AWS / Cloud",
    ],
  },
  {
    label: "Core CS",
    items: [
      "DSA",
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "SDLC",
    ],
  },
  {
    label: "Tools",
    items: ["Git", "Postman", "VS Code", "Figma", "Expo"],
  },
];

export const experience = {
  title: "Full-Stack & ML Development — Academic Projects",
  org: "KLE Technological University",
  location: "Hubli, India",
  period: "Nov 2022 — Present",
  description:
    "Developed academic and self-driven projects spanning full-stack web development, mobile applications, and machine learning, while following SDLC principles and Agile-style workflows in team-based settings.",
  points: [
    "Built and shipped full-stack, mobile, and ML projects end to end — from planning through deployment.",
    "Collaborated in team-based projects following SDLC principles and Agile-style workflows.",
    "Used Git for version control, debugging, and iterative feature development across multiple project cycles.",
  ],
  stack: ["React", "Node.js", "Express", "MongoDB", "Python", "Git"],
};

export interface Project {
  title: string;
  category: string;
  accent: "blue" | "violet" | "green";
  description: string;
  stack: string[];
  github: string;
  liveDemo?: string;
}

export const projects: Project[] = [
  {
    title: "Sentiment Analysis of Indian Political Tweets",
    category: "Machine Learning",
    accent: "green",
    description:
      "An NLP pipeline that classifies political sentiment in tweets, comparing TF-IDF with LSTM and RNN models to find the most reliable approach — reaching 83% accuracy.",
    stack: ["Python", "NLP", "LSTM", "RNN", "TF-IDF"],
    github: "https://github.com/Chandanbh07/Sentiment-Analysis-of-Indian-IPT-main",
  },
  {
    title: "Cine Stream",
    category: "Mobile",
    accent: "violet",
    description:
      "A cross-platform mobile movie-streaming app with modular UI components, smooth navigation, and a responsive layout tuned for both Android and iOS.",
    stack: ["React Native", "Expo", "JavaScript"],
    github: "https://github.com/Chandanbh07/Cinestream",
  },
  {
    title: "Learning Management System",
    category: "Full Stack",
    accent: "blue",
    description:
      "A full-stack LMS built on the MERN stack with secure authentication, role-based access control, course management, and progress tracking.",
    stack: ["React", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/Chandanbh07/LMS",
  },
];

export const certifications = [
  {
    title: "MongoDB for SQL Professionals",
    issuer: "MongoDB",
    href: "https://drive.google.com/file/d/1aIHdsNHkPaiUd2gDAyekD8bnNn8Lp4hA/view?usp=drive_link",
  },
  {
    title: "Agile Methodology, CI & Delivery (DevOps)",
    issuer: "Infosys Springboard",
    href: "https://drive.google.com/file/d/1XNhWPRzKg9TZHOrKNLiqGgocQPv4WfA3/view?usp=drive_link",
  },
  {
    title: "Oracle Cloud Infrastructure Generative AI Professional",
    issuer: "Oracle · 2025",
    href: "https://drive.google.com/drive/folders/1PL06OlbCo3Cq_IVubnrg0tp_6WWaGl5y",
  },
];

export const publication = {
  title:
    "Sentiment Analysis of Indian Political Tweets: A Comparative Study with LSTM and RNN Model",
  venue: "3rd International Conference on Futuristic Technologies, Pune — 2025",
  href: "https://drive.google.com/file/d/1W6TB0G3jdhrOkqtSBzG3QmtvRs_bZ40F/view?usp=drive_link",
};
