import React from 'react'
import Hero from "@/components/pagecomponents/Hero";
import About from "@/components/pagecomponents/About";
import PortfolioSection from "@/components/pagecomponents/Portfolio";
import ServicesSection from "@/components/pagecomponents/Services";
import TestimonialsSection  from "@/components/pagecomponents/Testimonials";
import ContactSection from "@/components/pagecomponents/Contact";
import {Footer} from "@/components/pagecomponents/Footer";

const Page = () => {
    return (
        <div>
            <Hero/>
            <About/>
            <PortfolioSection/>
            <ServicesSection/>
            <TestimonialsSection/>
            <ContactSection/>
            <Footer/>
        </div>
    )
}
export default Page
