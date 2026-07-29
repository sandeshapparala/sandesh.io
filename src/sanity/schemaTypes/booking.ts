import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'booking',
    title: 'Booking Requests',
    type: 'document',
    fields: [
        defineField({ name: 'name', title: 'Full Name', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'company', title: 'Company / Project', type: 'string' }),
        defineField({
            name: 'service',
            title: 'Service',
            type: 'string',
            options: {
                list: [
                    { title: 'Web Development', value: 'web' },
                    { title: 'AI Integration', value: 'ai' },
                    { title: 'Tech Strategy', value: 'strategy' },
                    { title: 'Full-Stack Build', value: 'fullstack' },
                    { title: 'Not sure yet', value: 'unsure' },
                ],
            },
        }),
        defineField({
            name: 'budget',
            title: 'Budget Range',
            type: 'string',
            options: {
                list: [
                    { title: 'Under $5k', value: 'sub5k' },
                    { title: '$5k – $15k', value: '5k-15k' },
                    { title: '$15k – $30k', value: '15k-30k' },
                    { title: '$30k+', value: '30k+' },
                    { title: 'Prefer to discuss', value: 'discuss' },
                ],
            },
        }),
        defineField({
            name: 'timeline',
            title: 'Timeline',
            type: 'string',
            options: {
                list: [
                    { title: 'ASAP', value: 'asap' },
                    { title: '1–3 months', value: '1-3m' },
                    { title: '3–6 months', value: '3-6m' },
                    { title: 'Just exploring', value: 'exploring' },
                ],
            },
        }),
        defineField({ name: 'message', title: 'Message', type: 'text', rows: 4 }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            initialValue: 'new',
            options: {
                list: [
                    { title: 'New', value: 'new' },
                    { title: 'Contacted', value: 'contacted' },
                    { title: 'In Progress', value: 'in_progress' },
                    { title: 'Closed', value: 'closed' },
                ],
            },
        }),
        defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
    ],
    preview: {
        select: { title: 'name', subtitle: 'email', status: 'status' },
        prepare({ title, subtitle, status }) {
            return { title: title || 'Unknown', subtitle: `${subtitle} — ${status}` }
        },
    },
    orderings: [{ title: 'Newest first', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] }],
})
