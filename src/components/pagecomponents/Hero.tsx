
import React from 'react'

const Hero = () => {
    return (
        <div className={"flex flex-col min-h-screen md:min-h-screen pt-20 md:pt-40 relative overflow-hidden"}>
            <div className="absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none">
                <div
                    style={{
                        transform: 'translateY(-350px) rotate(-45deg)',
                        width: '560px',
                        height: '1380px',
                        background: 'radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 0%, 85%, .08) 0%, hsla(0, 0%, 55%, .02) 50%, hsla(0, 0%, 45%, 0) 80%)'
                    }}
                    className="absolute top-0 left-0">
                </div>
                <div
                    style={{
                        transform: 'rotate(-45deg) translate(5%, -50%)',
                        transformOrigin: 'top left',
                        width: '240px',
                        height: '1380px',
                        background: 'radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 85%, .06) 0%, hsla(0, 0%, 45%, .02) 80%, transparent 100%)'
                    }}
                    className="absolute top-0 left-0">
                </div>
                <div
                    style={{
                        position: 'absolute',
                        borderRadius: '20px',
                        transform: 'rotate(-45deg) translate(-180%, -70%)',
                        transformOrigin: 'top left',
                        top: 0,
                        left: 0,
                        width: '240px',
                        height: '1380px',
                        background: 'radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 85%, .04) 0%, hsla(0, 0%, 45%, .02) 80%, transparent 100%)'
                    }}
                    className="absolute top-0 left-0">
                </div>
            </div>

            <div className="flex items-center gap-8 justify-center relative z-10">


                <button
                    className="inline-flex h-7 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000000,45%,#1e2631,55%,#000000)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors cursor-auto">
                    Sandesh Apparala
                </button>


            </div>


            <div className={"max-w-7xl mx-auto px-4 flex flex-col items-center justify-center"}>
                <h1 className={"tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white text-4xl md:text-4xl lg:text-8xl font-semibold max-w-6xl mx-auto text-center mt-6 relative z-10 py-6"}>Transforming
                    Ideas into Impactful Applications</h1>
                <h2 className={"my-4 font-normal text-center mt-2 md:mt-6 text-base md:text-xl text-muted dark:text-muted-dark max-w-3xl mx-auto relative z-10"}>As
                    a full-stack developer with an eye for innovation, I create digital products that connect with
                    audiences.</h2>
            </div>
            <div className="flex items-center gap-8 justify-center my-10 relative z-10">
                <button
                    className="group hover:-translate-y-0.5 active:scale-[0.98] bg-secondary relative z-10 hover:bg-secondary/90 border border-secondary text-white text-sm md:text-sm transition font-medium duration-200 rounded-md px-4 py-2 justify-center shadow-[0px_-1px_0px_0px_#FFFFFF60_inset,_0px_1px_0px_0px_#FFFFFF60_inset] flex space-x-2 items-center group !text-lg">
                    <span>See my Work</span>
                </button>
                <button
                    className="group hover:-translate-y-0.5 active:scale-[0.98] bg-secondary relative z-10 hover:bg-secondary/90 border border-secondary text-white text-sm md:text-sm transition font-medium duration-200 rounded-md px-4 py-2 justify-center shadow-[0px_-1px_0px_0px_#FFFFFF60_inset,_0px_1px_0px_0px_#FFFFFF60_inset] flex space-x-2 items-center group !text-lg">
                    <span>Book a Call</span>
                </button>
            </div>
            



        </div>
    )
}
export default Hero
