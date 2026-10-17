export const site = {
  name: 'Lipun Rout',
  title: 'Lipun Rout | Software Developer, Full-Stack & AI',
  description:
    'Lipun Rout is a Software Developer and full-stack builder creating web applications and AI-powered digital products, from the first idea to the final implementation.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lipunrout.vercel.app',
  email: 'lipunrout001@gmail.com',
  role: 'Software Developer',
  employer: 'Ohhpro',
  socials: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/LipunRout' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/lipun-rout-a564b6285/' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/i.lipun_/' },
  ],
} as const;

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#work', label: 'Work' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
] as const;
