import React from 'react'

const About = () => {
    return (

        <div
            className={"flex pt-20 md:pt-20 pb-20 relative overflow-hidden max-w-5xl mx-auto"}>

            <div className="w-full md:w-2/5 mb-6 md:mb-0 flex flex-col ">
                <h1 className="text-4xl font-bold mt-4">Hi, I'm Sandesh.</h1>
                <div className="flex items-center gap-8 justify-center my-10 relative z-10 mx-auto ">
                    <button
                        className="group hover:-translate-y-0.5 active:scale-[0.98] bg-secondary relative z-10 hover:bg-secondary/90 border border-secondary text-white text-sm md:text-sm transition font-medium duration-200 rounded-md px-4 py-2 justify-center shadow-[0px_-1px_0px_0px_#FFFFFF60_inset,_0px_1px_0px_0px_#FFFFFF60_inset] flex space-x-2 items-center group !text-lg">
                        <span>See my Work</span>
                    </button>
                </div>
            </div>

            <div className="w-full md:w-3/5">
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


        </div>


    )
}
export default About

