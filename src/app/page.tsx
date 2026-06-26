import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Agents } from '@/components/landing/Agents';
import { Marketplaces } from '@/components/landing/Marketplaces';
import { Workflow } from '@/components/landing/Workflow';
import { WhyUs } from '@/components/landing/WhyUs';
import { Pricing } from '@/components/landing/Pricing';
import { CTA } from '@/components/landing/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Agents />
      <Marketplaces />
      <Workflow />
      <WhyUs />
      <Pricing />
      <CTA />
    </>
  );
}
