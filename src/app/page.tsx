import { Header } from '@/components/Header'
import React from 'react'
import HeroSection from "@/components/Sections/Hero";
import dynamic from 'next/dynamic'
import { ProcessCards } from '@/components/ProcessCards';
import {StaggerTestimonials} from "@/components/stagger-testimonials";
import UseCases from "@/components/Use Cases";
import CTASection from "@/components/cta-section";
import FooterSection from "@/components/footer";

// Use dynamic import with no SSR for the BentoDemo
const BentoDemo = dynamic(() => import('@/components/bento-demo'), { ssr: true })

export default function Page() {
  return (
    <div>
      <Header />
      <HeroSection />
      <BentoDemo />
                <ProcessCards />
        <StaggerTestimonials />
        <UseCases />
        <CTASection />
        <FooterSection />


    </div>
  )
}
