import { Project, SkillCategory } from '../types';
import imgAether from '../assets/project_aether.png';
import imgAether2 from '../assets/project_aether_2.png';
import imgMeridian from '../assets/hotel1.jpg';
import imgMeridian2 from '../assets/hotel2.jpg';
import imgNeurostream from '../assets/project_neurostream.png';
import imgVortex from '../assets/project_vortex.png';

export const aboutMeData = {
  name: 'Dilitha Sandamal',
  title: 'Full-Stack Software Engineer & Data Analyst',
  location: 'Gampaha, Sri Lanka',
  bio: 'I am a third-year <strong>Data Science undergraduate</strong> at SLIIT with a strong interest in data analytics, machine learning, AI, and business intelligence. I enjoy turning raw data into meaningful insights and building data-driven solutions that support better decision-making. I am eager to gain industry experience through an internship and continue improving my technical and analytical skills.',
  detailedStory: [
    'My journey in technology began with a curiosity for building complete digital solutions, from user-friendly interfaces to reliable backend systems. I believe good software should not only work correctly, but also feel smooth, practical, and valuable to the people who use it.',
    'Currently, I am a third-year Information Technology undergraduate with a strong passion for building complete digital solutions. I work as a full-stack developer with skills in Java, JavaScript, TypeScript, React, mobile app development, databases, and modern web technologies.',
    'I enjoy building clean, scalable, and intelligent digital solutions by combining software engineering with data-driven thinking to solve real-world problems.'
  ],
  philosophies: [
    {
      title: 'Full-Stack Problem Solving',
      desc: 'I build complete digital solutions by connecting clean interfaces, strong backend logic, and reliable databases.'
    },
    {
      title: 'Engineering Truthfulness',
      desc: 'No unnecessary complex structures; build clean, self-rehabilitating code bases with robust type definitions.'
    },
    {
      title: 'Solve Real Problems',
      desc: 'Every project I build should create value, improve workflows, and provide a better experience for users.'
    }
  ]
};

export const projectsData: Project[] = [
  {
    id: 'aether',
    title: 'Tomato Leaf Disease Analysis System',
    subtitle: 'Machine Learning & Image Classification Model',
    description: 'A machine learning-based plant disease detection system designed to analyze tomato leaf images and identify possible diseases accurately, helping farmers and agricultural users take faster preventive actions.',
    techStack: ['CSS', 'Springboot', 'Python', 'TensorFlow', 'Java'],
    liveUrl: 'https://github.com/dilithasandamal/aether-canvas',
    githubUrl: 'https://github.com/dilithasandamal/aether-canvas',
    category: 'Machine Learning',
    images: [imgAether, imgAether2],
    details: [
      'Detect and identify diseases on tomato plants using image classification.',
      'Trained the model with processed leaf image data.',
      'Built a simple prediction workflow that allows users to upload a leaf image and receive disease analysis results.'
    ]
  },
  {
    id: 'meridian',
    title: 'Hotel Management System App',
    subtitle: 'React Native Mobile Application',
    description: 'A mobile-based hotel management application designed to manage hotel rooms, services, bookings, and customer-related operations through a simple and user-friendly interface.',
    techStack: ['React Native', 'TypeScript', 'JavaScript', 'MongoDB', 'Database'],
    liveUrl: 'https://github.com/dilithasandamal/meridian-books',
    githubUrl: 'https://github.com/dilithasandamal/meridian-books',
    category: 'Full-stack',
    images: [imgMeridian, imgMeridian2],
    details: [
      'Managed hotel rooms, services, and booking details through a mobile application.',
      'Built a clean and responsive mobile interface using React Native and TypeScript.',
      'Implemented database operations to store and retrieve hotel information and bookings'
    ]
  },
  {
    id: 'neurostream',
    title: 'NeuroStream Node',
    subtitle: 'Streaming Intelligent Companion Dashboard',
    description: 'A custom streaming dashboard integrating Gemini AI for real-time document outlines, context-aware prompt parsing, and semantic markdown conversions.',
    techStack: ['React', 'Google Gemini SDK', 'Express', 'Server-Sent Events', 'Markdown'],
    liveUrl: 'https://github.com/dilithasandamal/neurostream-node',
    githubUrl: 'https://github.com/dilithasandamal/neurostream-node',
    category: 'AI & Data',
    images: [imgNeurostream],
    details: [
      'Implemented a server-sent events stream proxy to output token-by-token text generation directly onto the client interface without latency bottlenecks.',
      'Designed structured prompts that enable the AI to generate compliant semantic maps, parsed directly on the frontend as interactive state elements.',
      'Optimized memory profiles by lazy-instantiating the AI sessions and caching static context states locally.'
    ]
  },
  {
    id: 'vortex',
    title: 'Vortex CLI & Bundle',
    subtitle: 'Zero-Dependency Asset Packer',
    description: 'A modern, ultra-lightweight asset bundler utility written in Node.js, compiling nested workspaces into single bundles in milliseconds.',
    techStack: ['TypeScript', 'Node.js', 'Chokidar', 'Esbuild Engine', 'CLI Tooling'],
    liveUrl: 'https://github.com/dilithasandamal/vortex-bundle',
    githubUrl: 'https://github.com/dilithasandamal/vortex-bundle',
    category: 'Tools',
    images: [imgVortex],
    details: [
      'Achieved build times averaging less than 40ms by bypassing heavyweight AST transformation loops when handling plain ES Module files.',
      'Engineered a highly stable file-watcher script that debounces filesystem updates, preventing double-compilation spikes on rapid edits.',
      'Designed a colorful terminal interface summarizing bundle metrics, tree-shaking efficacy, and gzipped visual indicators.'
    ]
  }
];

export const skillsData: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', proficiency: 85, description: 'Single-page structures, advanced hook cycles, context patterns, lazy bundle tuning.' },
      { name: 'JavaScript', proficiency: 82, description: 'ES6+ features, async/await, closures, DOM manipulation, and modern JS patterns.' },
      { name: 'TypeScript', proficiency: 80, description: 'Type modeling, generics, utility decorators, interface safety contracts.' },
      { name: 'HTML & CSS', proficiency: 90, description: 'Semantic markup, responsive layouts, flexbox/grid, accessibility best practices.' }
    ]
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Java & Spring Boot', proficiency: 92, description: 'Enterprise-grade REST APIs, Spring MVC, dependency injection, and service layers.' },
      { name: 'Node.js & Express', proficiency: 85, description: 'RESTful API proxies, custom middleware pipelines, structured logs, cookie gates.' },
      { name: 'REST APIs', proficiency: 84, description: 'API design, endpoint modeling, authentication flows, and versioning strategies.' }
    ]
  },
  {
    name: 'Data & AI',
    skills: [
      { name: 'MySQL & MongoDB', proficiency: 85, description: 'Relational & document models, connection pooling, indexed search protocols.' },
      { name: 'Python', proficiency: 79, description: 'Data analysis, scripting, automation, and ML model training workflows.' },
      { name: 'Power BI', proficiency: 75, description: 'Interactive dashboards, data visualizations, DAX formulas, and report publishing.' },
      { name: 'Machine Learning', proficiency: 80, description: 'Model training, image classification, TensorFlow, and data-driven predictions.' }
    ]
  }
];
