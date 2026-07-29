import { Header } from '@/components/Header'
import React from 'react'
import HeroSection from "@/components/Sections/Hero"
import AboutSection from "@/components/Sections/About"
import { ProcessCards } from '@/components/ProcessCards'
import { StaggerTestimonials } from "@/components/stagger-testimonials"
import UseCases from "@/components/Use Cases"
import CTASection from "@/components/cta-section"
import FooterSection from "@/components/footer"
import FeaturedProjectsFromSanity from '@/components/FeaturedProjectsFromSanity'
import BookingSection from '@/components/BookingSection'

export default function Page() {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <UseCases />
      <div className="min-h-screen z-10 overflow-hidden">
        <FeaturedProjectsFromSanity />
      </div>
      <ProcessCards />
      <StaggerTestimonials />
      <BookingSection />
      <CTASection />
      <FooterSection />
    </div>
  )
}
