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
  heading: "Building modern web & blockchain applications",
  paragraphs: [
    "Hi, I'm Chandanagouda, a passionate Full Stack Developer from India with a strong interest in building scalable web applications, blockchain products, and modern user experiences.",
    "I primarily work with React, TypeScript, Node.js, Express.js, PostgreSQL, Prisma, MongoDB, and Tailwind CSS. I enjoy designing clean architectures, developing REST APIs, and creating responsive interfaces that prioritize performance and usability.",
    "I'm constantly exploring emerging technologies such as Web3, AI, and cloud computing through hands-on projects. I'm currently seeking Software Engineer opportunities where I can contribute, learn, and solve real-world engineering challenges.",
  ],
  stats: [
    { value: "10+", label: "Projects Built" },
    { value: "500+", label: "GitHub Commits" },
    { value: "20+", label: "Technologies Used" },
    { value: "4", label: "Research Publication" },
  ],
};

export const skillGroups = [
  {
    label: "Languages",
    items: [
      "C++",
      "Java",
      "Python",
      "JavaScript",
      "TypeScript"
    ],
  },
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "React Native"
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "WebSockets"
    ],
  },
  {
    label: "Databases",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "Supabase",
      "SQL"
    ],
  },
  {
    label: "Blockchain",
    items: [
      "Ethereum",
      "Solidity",
      "Hardhat",
      "Web3"
    ],
  },
  {
    label: "Tools",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Postman",
      "Vercel",
      "VS Code"
    ],
  },
];

export const experiences = [
  {
    title: "AI Research Intern",
    org: "University of Borås",
    location: "Borås, Sweden (Remote)",
    period: "Feb 2026 — May 2026",
    description:
      "Conducted research on ontology-guided deep learning for hierarchical fashion attribute recognition. Designed and implemented the OG-HMC framework by combining graph neural networks, attention mechanisms, and computer vision to improve semantic consistency in multi-label classification.",
    points: [
      "Developed the OG-HMC (Ontology-Guided Hierarchical Multi-Label Classification) framework for hierarchical fashion attribute recognition.",
      "Implemented Graph Attention Networks (GAT) and Label-Guided Spatial Attention (LGSA) to model semantic label relationships and improve attribute localization.",
      "Integrated ResNet-50 with hierarchical prediction heads and a Composite Hierarchical Loss to enforce parent-child consistency.",
      "Evaluated the framework on Fashionpedia and Fashion Product Images datasets, achieving Micro-F1 scores of 0.6634 and 0.8816 while eliminating attribute-level hierarchy violations.",
      "Performed benchmarking, ablation studies, and comparative analysis against CNN, graph-based, and transformer-based architectures."
    ],
    stack: [
      "Python",
      "PyTorch",
      "PyTorch Geometric",
      "Computer Vision",
      "Deep Learning",
      "Machine Learning",
      "Graph Neural Networks",
      "Graph Attention Networks",
      "ResNet-50",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "Git",
      "GitHub"
    ],
  },

  {
    title: "Full Stack Developer",
    org: "Academic & Personal Projects",
    location: "India",
    period: "2022 — Present",
    description:
      "Designed and developed production-style web applications ranging from MERN platforms to blockchain-powered prediction markets, applying modern software engineering practices across frontend, backend, databases, authentication, and deployment.",
    points: [
      "Built responsive full-stack applications using React, Next.js, TypeScript, Node.js, Express.js, PostgreSQL, MongoDB, Prisma, and Supabase.",
      "Developed PolyCast, a decentralized prediction market platform featuring authentication, real-time WebSocket updates, blockchain integration, and order management.",
      "Designed scalable REST APIs, database schemas, authentication systems, and reusable UI components following clean architecture principles.",
      "Integrated PostgreSQL, MongoDB, Prisma ORM, Supabase, Docker, and Vercel for efficient development, deployment, and cloud hosting.",
      "Collaborated using Git and GitHub while following modern development workflows, debugging, testing, and performance optimization practices."
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "Supabase",
      "WebSockets",
      "Docker",
      "Git",
      "GitHub",
      "Vercel"
    ],
  },
];

// export const experience = {
//   title: "Full Stack Developer",
//   org: "Academic & Personal Projects",
//   location: "India",
//   period: "2022 — Present",
//   description:
//     "Designed and developed production-style web applications ranging from MERN platforms to blockchain-powered prediction markets, while applying software engineering best practices throughout the development lifecycle.",
//   points: [
//     "Built responsive full-stack applications using React, TypeScript, Node.js, Express.js, PostgreSQL, MongoDB, and Prisma.",
//     "Developed a decentralized prediction market platform with authentication, real-time market updates, and blockchain integration.",
//     "Designed REST APIs, database schemas, authentication systems, and reusable UI components.",
//     "Used Git, GitHub, Docker, and Vercel for version control, deployment, and collaboration.",
//   ],
//   stack: [
//     "React",
//     "TypeScript",
//     "Node.js",
//     "Express",
//     "PostgreSQL",
//     "Prisma",
//     "MongoDB",
//     "Docker",
//   ],
// };



export interface Project {
  title: string;
  category: string;
  accent: "blue" | "violet" | "green";
  description: string;
  stack: string[];
  github: string;
  liveDemo?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "PolyCast",
    category: "Blockchain • Full Stack",
    accent: "violet",
    description:
      "A decentralized prediction market platform inspired by Polymarket where users can trade YES/NO outcomes on real-world events. Built with React, Node.js, PostgreSQL, Prisma, Supabase authentication, WebSockets, and blockchain integration for live market updates.",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Supabase",
      "WebSockets",
      "Blockchain",
      "Tailwind CSS"
    ],
    github: "https://github.com/Chandanbh07/PolyCast",
    liveDemo: "https://poly-cast-frontend.vercel.app/",
    image: "/polycast.png",
  },

  {
    title: "Learning Management System",
    category: "Full Stack",
    accent: "blue",
    description:
      "A MERN-based Learning Management System featuring authentication, role-based access control, course management, and progress tracking with a responsive user interface.",
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT"
    ],
    github: "https://github.com/Chandanbh07/LMS",
    
  },

  {
    title: "Sentiment Analysis of Indian Political Tweets",
    category: "Machine Learning",
    accent: "green",
    description:
      "Research project comparing LSTM and RNN models with TF-IDF and Word2Vec embeddings for political tweet sentiment classification, achieving up to 83% accuracy.",
    stack: [
      "Python",
      "TensorFlow",
      "LSTM",
      "RNN",
      "NLP"
    ],
    github: "https://github.com/Chandanbh07/Sentiment-Analysis-of-Indian-IPT-main",
    
  },

  {
    title: "Cine Stream",
    category: "Mobile App",
    accent: "violet",
    description:
      "A cross-platform React Native movie streaming application featuring responsive UI, reusable components, and smooth navigation for Android and iOS.",
    stack: [
      "React Native",
      "Expo",
      "JavaScript"
    ],
    github: "https://github.com/Chandanbh07/Cinestream",
    
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
