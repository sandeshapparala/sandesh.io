"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

// Testimonials Data
const testimonials = [
    {
        imageSrc: "/images/person.png",
        alt: "Person One",
        quote:
            "Working with this team was a game-changer for our startup. They delivered a top-notch web app on time!",
        name: "Jane Doe",
        position: "Co-Founder, StartupXYZ",
    },
    {
        imageSrc: "/images/person.png",
        alt: "Person Two",
        quote:
            "The AI-powered solutions truly elevated our productivity. We couldn’t be happier with the results!",
        name: "John Smith",
        position: "Operations Manager, TechFlow",
    },
    {
        imageSrc: "/images/person.png",
        alt: "Person Three",
        quote:
            "Their creative insights for our brand identity and social media presence have been invaluable.",
        name: "Emily Brown",
        position: "Marketing Lead, Creativa",
    },
    {
        imageSrc: "/images/person.png",
        alt: "Person Four",
        quote:
            "Their creative approach and timely delivery exceeded all our expectations!",
        name: "Michael Carter",
        position: "CEO, InnovateNow",
    },
];

export default function TestimonialsSection() {
    return (
        <section
            className="
        mx-auto
        mt-16
        max-w-6xl
        px-6
        py-12
        text-white
        md:px-8
        md:py-16
      "
            id={"testimonials"}
        >
            {/* Section Heading */}
            <div className="text-center">
                <h2 className="text-3xl font-bold md:text-4xl">Testimonials</h2>
                <p className="mx-auto mt-2 max-w-2xl text-base text-zinc-400 md:text-lg">
                    Hear from our happy clients who’ve experienced the impact of our
                    solutions firsthand.
                </p>
            </div>

            {/* Swiper Container */}
            <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={2} // Show two cards at a time
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="mt-10"
                breakpoints={{
                    0: {
                        slidesPerView: 1, // Show 1 card on smaller screens
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 2, // Show 2 cards on larger screens
                        spaceBetween: 20,
                    },
                }}
            >
                {/* Map through the testimonials array */}
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <TestimonialCard
                            imageSrc={testimonial.imageSrc}
                            alt={testimonial.alt}
                            quote={testimonial.quote}
                            name={testimonial.name}
                            position={testimonial.position}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// TestimonialCard Component
// ─────────────────────────────────────────────────────────────────────────────
function TestimonialCard({
                             imageSrc,
                             alt,
                             quote,
                             name,
                             position,
                         }: {
    imageSrc: string;
    alt: string;
    quote: string;
    name: string;
    position: string;
}) {
    return (
        <div
            className="
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        bg-zinc-900
        p-6
        text-center
        shadow
        shadow-zinc-800
        transition-transform
        duration-300
        hover:scale-[1.05]
        hover:bg-zinc-800
        hover:shadow-lg
        hover:shadow-yellow-500/50
      "
        >
            <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full">
                <Image
                    src={imageSrc}
                    alt={alt}
                    fill
                    className="object-cover object-center"
                    sizes="64px"
                />
            </div>
            <p className="mb-4 text-sm text-zinc-300 md:text-base">“{quote}”</p>
            <h4 className="font-semibold text-white">{name}</h4>
            <span className="text-xs text-zinc-400 md:text-sm">{position}</span>
        </div>
    );
}
