import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import Expertise from '@/components/Expertise';
import SelectedWorks from '@/components/SelectedWorks';
import Journey from '@/components/Journey';
import TechLab from '@/components/TechLab';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import PageMotion from '@/components/PageMotion';
import CursorGlow from '@/components/CursorGlow';
import { site } from '@/lib/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  worksFor: { '@type': 'Organization', name: site.employer },
  url: site.url,
  sameAs: site.socials.map((s) => s.href),
};

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <PageMotion />
      <CursorGlow />
      <Nav />
      <main id="main">
        <Hero />
        <Intro />
        <Expertise />
        <SelectedWorks />
        <Journey />
        <TechLab />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
