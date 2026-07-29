import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'testimonial',
    title: 'Testimonials',
    type: 'document',
    fields: [
        defineField({ name: 'author', title: 'Author Name', type: 'string' }),
        defineField({ name: 'role', title: 'Role & Company', type: 'string' }),
        defineField({ name: 'quote', title: 'Testimonial Quote', type: 'text', rows: 4 }),
        defineField({ name: 'avatar', title: 'Avatar Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
        defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    ],
    preview: {
        select: { title: 'author', subtitle: 'role' },
    },
})
