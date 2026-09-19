export type Testimonial = {
  id: string;
  headline: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
  imageAlt: string;
};

// Add only client-approved words, attribution, and a photo approved for publication.
// Never turn the template copy into a quote or add unverified results.
export const testimonials: Testimonial[] = [];

// Keep hidden until the owner supplies approved client testimonials.
export const showTestimonialTemplate = false;
