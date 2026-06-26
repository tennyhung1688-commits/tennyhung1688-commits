import { Hero } from '@/components/landing/Hero';
import { Workflow } from '@/components/landing/Workflow';
import { Features } from '@/components/landing/Features';
import { Pricing } from '@/components/landing/Pricing';
import { CTA } from '@/components/landing/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Workflow />
      <Features />
      <Pricing />
      <CTA />
    </>
  );
}
