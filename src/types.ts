export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl?: string;
  category: 'Frontend' | 'Full-stack' | 'AI & Data' | 'Tools' | 'Machine Learning';
  details: string[];
  imagePrompt?: string; // Prompt for asset representation (can be mock visual mockup)
  images?: string[];   // Scrapbook-style screenshot photos for the project page
}

export interface SkillCategory {
  name: string;
  skills: { name: string; proficiency: number; description: string }[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
