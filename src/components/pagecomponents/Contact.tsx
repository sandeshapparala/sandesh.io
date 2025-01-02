"use client";

import { useState } from "react";

export default function ContactSection() {
    const [selectedService, setSelectedService] = useState("Web Development");
    const [selectedBudget, setSelectedBudget] = useState("10K-20K");

    return (
        <>
            <section
                id="contact"
                className="
            mx-auto
            mt-16
            max-w-6xl
            grid
            grid-cols-1
            gap-8
            px-6
            py-12
            text-white
            md:grid-cols-2
            md:px-8
            md:py-16
            rounded-md
            shadow-md
          "
            >
                {/* Left Column: Contact Details */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold md:text-4xl">
                        Have an idea? <br />
                        Let’s do it together
                    </h2>
                    <p className="text-zinc-400">
                        Get in touch today and let's turn your idea into a remarkable success story!
                    </p>
                    <div className="space-y-4">
                        <p className="flex items-center gap-2 text-zinc-400">
                            📍 <span>Andhra Pradesh, India</span>
                        </p>
                        <p className="flex items-center gap-2 text-zinc-400">
                            🗓️ <span>Schedule a meeting at your convenience</span>
                        </p>
                        <p className="flex items-center gap-2 text-zinc-400">
                            📞 <span>+91 8331 8331 32</span>

                        </p>
                        <p className="flex items-center gap-2 text-zinc-400">
                            ✉️ <span>start@sandesh.io</span>
                        </p>
                    </div>
                </div>

                {/* Right Column: Form */}
                <form
                    action="https://send.pageclip.co/ai29y9tvI1tiBnYrTtLmKIO5IUUjRv52/SandeshPortfolio"
                    className="pageclip-form space-y-6"
                    method="post"
                >
                    {/* Service Buttons */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">Service</label>
                        <div className="flex gap-4">
                            {["Web Development", "AI Solutions", "Branding", "Other"].map((service) => (
                                <button
                                    type="button"
                                    key={service}
                                    className={`
                      rounded-full
                      border
                      px-4
                      py-2
                      text-sm
                      max-md:text-xs
                      ${
                                        selectedService === service
                                            ? "border-white text-white"
                                            : "border-zinc-600 text-zinc-400"
                                    }
                    `}
                                    onClick={() => setSelectedService(service)}
                                >
                                    {service}
                                </button>
                            ))}
                            <input
                                type="hidden"
                                name="service"
                                value={selectedService}
                            />
                        </div>
                    </div>

                    {/* Budget Buttons */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">Budget in INR</label>
                        <div className="flex flex-wrap gap-4">
                            {["10K-20K", "20K-50K", "50K-100K", "100K+", "Other"].map((budget) => (
                                <button
                                    type="button"
                                    key={budget}
                                    className={`
                      rounded-full
                      border
                      px-4
                      py-2
                      text-sm
                      ${
                                        selectedBudget === budget
                                            ? "border-white text-white"
                                            : "border-zinc-600 text-zinc-400"
                                    }
                    `}
                                    onClick={() => setSelectedBudget(budget)}
                                >
                                    {budget}
                                </button>
                            ))}
                            <input
                                type="hidden"
                                name="budget"
                                value={selectedBudget}
                            />
                        </div>
                    </div>

                    {/* Name and Email */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block text-sm text-zinc-400">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="
                    mt-1
                    w-full
                    border-b
                    border-zinc-600
                    bg-transparent
                    px-2
                    py-1
                    text-sm
                    text-white
                    focus:border-white
                    focus:outline-none
                  "
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm text-zinc-400">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="
                    mt-1
                    w-full
                    border-b
                    border-zinc-600
                    bg-transparent
                    px-2
                    py-1
                    text-sm
                    text-white
                    focus:border-white
                    focus:outline-none
                  "
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm text-zinc-400">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            required
                            className="
                  mt-1
                  w-full
                  border-b
                  border-zinc-600
                  bg-transparent
                  px-2
                  py-1
                  text-sm
                  text-white
                  focus:border-white
                  focus:outline-none
                "
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="text-right">
                        <button
                            type="submit"
                            className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white
                  px-6
                  py-2
                  text-sm
                  font-semibold
                  text-white
                  hover:bg-white
                  hover:text-black
                  focus:outline-none
                  focus:ring-2
                  focus:ring-white
                "
                        >
                            <span>Book a Meeting →</span>
                        </button>
                    </div>
                </form>
            </section>

            {/* Pageclip Script */}
            <script
                src="https://s.pageclip.co/v1/pageclip.js"
                charSet="utf-8"
            ></script>
        </>
    );
}
