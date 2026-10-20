export interface Area {
  n: string;
  title: string;
  body: string;
  meta: string[];
}

export const areas: Area[] = [
  {
    n: '01',
    title: 'Full-Stack Engineering',
    body: 'Complete web applications with responsive interfaces, backend services, databases, authentication, APIs and integrated user workflows.',
    meta: ['React', 'Node.js', 'REST APIs', 'Auth'],
  },
  {
    n: '02',
    title: 'AI-Powered Applications',
    body: 'Language models and AI APIs woven into useful products: intelligent workflows, personalised experiences and application features.',
    meta: ['Groq AI', 'LLM APIs', 'Workflows'],
  },
  {
    n: '03',
    title: 'Product Development',
    body: 'Translating requirements into features, choosing sound technical approaches, integrating third-party services, debugging and improving existing products.',
    meta: ['Features', 'Integrations', 'Debugging'],
  },
  {
    n: '04',
    title: 'Freelance Solutions',
    body: 'Working with clients to understand their goals, clarify requirements, weigh constraints and turn ideas into working digital solutions.',
    meta: ['Requirements', 'Scoping', 'Delivery'],
  },
];