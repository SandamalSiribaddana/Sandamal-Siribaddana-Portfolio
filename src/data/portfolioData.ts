import { Project, SkillCategory } from '../types';
import imgAether from '../assets/project_aether.png';
import imgAether2 from '../assets/project_aether_2.png';
import imgMeridian from '../assets/project_meridian.png';
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
    title: 'Meridian Books',
    subtitle: 'Decentralized Reading Logs & Review Nest',
    description: 'A full-stack collaborative platform for book discovery, semantic notes catalogs, and reader analytics, built with multi-device state synchronization.',
    techStack: ['Node.js', 'Express', 'React', 'MongoDB', 'JWT Auth'],
    liveUrl: 'https://github.com/dilithasandamal/meridian-books',
    githubUrl: 'https://github.com/dilithasandamal/meridian-books',
    category: 'Full-stack',
    images: [imgMeridian],
    details: [
      'Configured secure JWT token exchange and HTTP-only cookie architectures to ensure flawless cross-site authentication workflows.',
      'Engineered an aggregated reading speed analytics visualizer utilizing custom SVG charts with full scroll-interception.',
      'Created an offline queue system that retries synchronization when network drops, protecting metadata from silent loss.'
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
    name: 'Frontend Artistry',
    skills: [
      { name: 'React / Vite', proficiency: 95, description: 'Single-page structures, advanced hook cycles, context patterns, lazy bundle tuning.' },
      { name: 'TypeScript', proficiency: 90, description: 'Type modeling, generics, utility decorators, interface safety contracts.' },
      { name: 'Tailwind CSS', proficiency: 95, description: 'Bespoke design systems, utility compositions, responsive grids, dark/fluid layers.' },
      { name: 'Animations & Motion', proficiency: 90, description: 'Micro-interactions, spring layouts, coordinate systems, smooth transitions.' }
    ]
  },
  {
    name: 'Backend Architecture',
    skills: [
      { name: 'Node.js & Express', proficiency: 88, description: 'RESTful API proxies, custom middleware pipelines, structured logs, cookie gates.' },
      { name: 'DB Technologies', proficiency: 82, description: 'Relational & Document models, connection pooling, indexed search protocols.' },
      { name: 'Real-time APIs', proficiency: 85, description: 'Server-Sent Events flow, WebSockets integration, event-driven state syncing.' }
    ]
  },
  {
    name: 'Agentic Solutions & Systems',
    skills: [
      { name: 'Gemini Integrations', proficiency: 85, description: 'Structured prompt layouts, streaming text models, multimodal token parsing.' },
      { name: 'Developer Tooling', proficiency: 87, description: 'Esbuild compiling, custom Shell environments, Git pipelines, package configs.' }
    ]
  }
];
