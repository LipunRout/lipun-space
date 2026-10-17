export type PreviewKind = 'hero' | 'dashboard' | 'editorial' | 'school' | 'ai';

export interface Project {
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  url: string;
  cta: string;
  tags: string[];
  accent: string; // hex
  kind: PreviewKind;
  /** Path under /public, e.g. "/projects/doodledriver.jpg". Leave undefined to show the branded placeholder. */
  image?: string;
  /** Your honest contribution. Leave empty to hide the line. */
  role?: string;
  /** Verified stack only. Leave empty to hide. */
  stack?: string[];
}

export const projects: Project[] = [
  {
    slug: 'doodledriver',
    number: '01',
    title: 'DoodleDriver',
    category: 'Mobility Technology · Driving Education Platform',
    summary:
      'A digital platform that helps learners discover driving schools, compare programmes, find suitable trainers, and manage their driving-learning journey.',
    url: 'https://doodledriver.ai/',
    cta: 'Explore DoodleDriver',
    tags: ['Web Application', 'Booking Experience', 'Mobility Tech'],
    accent: '#00E5FF',
    kind: 'hero',
    role: '',
    stack: [],
  },
  {
    slug: 'societyconnect',
    number: '02',
    title: 'SocietyConnect.ai',
    category: 'AI · Smart Community Management',
    summary:
      'A platform for modern residential communities, bringing society operations, maintenance workflows, visitor management, notifications, security and community engagement into one structured interface.',
    url: 'https://societyconnect.ai/',
    cta: 'Explore SocietyConnect',
    tags: ['AI & Automation', 'Admin Dashboard', 'Community Platform'],
    accent: '#3478FF',
    kind: 'dashboard',
    role: '',
    stack: [],
  },
  {
    slug: 'web-journal',
    number: '03',
    title: 'Web Journal',
    category: 'Content Platform · Full-Stack Web Development',
    summary:
      'A modern blogging platform for articles across frontend, backend, cloud, AI and developer tools, with a publishing dashboard where authors sign in with Google to write and manage posts.',
    url: 'https://web-journal-jade.vercel.app/',
    cta: 'Read Web Journal',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Google OAuth'],
    accent: '#A855F7',
    kind: 'editorial',
    role: '',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Google OAuth'],
  },
  {
    slug: 'kalinga-kids',
    number: '04',
    title: 'Kalinga Kids',
    category: 'Education · Digital Experience',
    summary:
      'The digital presence of an early-childhood education institution, communicating its learning programmes, facilities, educational values and admissions information to parents.',
    url: 'https://kalingakidss.com/',
    cta: 'Explore Kalinga Kids',
    tags: ['Education', 'Web Design', 'Responsive Experience'],
    accent: '#FFB020',
    kind: 'school',
    role: '',
    stack: [],
  },
  {
    slug: 'routepilot',
    number: '05',
    title: 'RoutePilot',
    category: 'Artificial Intelligence · Career Technology',
    summary:
      'An AI-powered career navigation platform that turns a goal into a personalised roadmap with structured learning phases, curated resources and progress tracking.',
    url: 'https://route-pilot.vercel.app/',
    cta: 'Explore RoutePilot',
    tags: ['AI Integration', 'Career Technology', 'Web Application'],
    accent: '#FF244F',
    kind: 'ai',
    role: '',
    stack: ['React', 'Node.js', 'Supabase', 'Groq AI'],
  },
];
