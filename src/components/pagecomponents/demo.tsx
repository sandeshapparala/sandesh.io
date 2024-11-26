// components/AboutSection.js
import React from 'react';

const AboutSection = () => {
    return (
        <section className="flex flex-col md:flex-row items-start justify-between py-16 px-6 md:px-16 bg-black text-white">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <p className="text-gray-400 italic">This is me.</p>
                <h1 className="text-4xl font-bold mt-4">Hi, I'm Sandesh.</h1>
                <button className="mt-6 px-6 py-3 rounded-full bg-white text-black font-semibold flex items-center hover:bg-gray-200 transition duration-300">
                    <span className="mr-2">Get in Touch</span>
                    <span>&#8599;</span>
                </button>
            </div>
            <div className="w-full md:w-2/3">
                <p className="mt-4 md:mt-0 text-lg leading-relaxed">
                    I'm a passionate full-stack developer and AI specialist dedicated to transforming
                    ideas into innovative digital solutions. I specialize in creating seamless and
                    impactful user experiences through the integration of AI and modern web technologies.
                </p>
                <p className="mt-4 text-lg leading-relaxed">
                    From initial discovery and design to development and deployment, I’m involved in
                    every step of the process. My focus is on delivering high-quality, scalable results
                    that empower startups, tech firms, and SMBs to embrace digital transformation.
                </p>
            </div>
        </section>
    );
};

export default AboutSection;
