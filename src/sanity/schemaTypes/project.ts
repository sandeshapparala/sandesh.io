import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    // 1. Core Identity (Mandatory)
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'Project name, e.g. Kōva AI',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Auto-generated from title, used in project URLs',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Toggle to mark a project for homepage highlights',
      initialValue: false,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short tagline/summary (e.g., Next.js + AI Marketing Site)',
      validation: Rule => Rule.required().max(150)
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      description: 'Preview image for project cards and lists',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),

    // 2. Content & Story (Optional)
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      description: 'Short description of the problem the client faced',
      rows: 3,
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'array',
      description: 'Detailed solution explanation with rich formatting',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: Rule => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  }
                ]
              }
            ]
          }
        }
      ]
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'text',
      description: 'Key result or impact (e.g., Boosted signups by 30%)',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'array',
      description: 'Detailed case study body with rich text and images',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: Rule => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for the image'
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Alternative text for accessibility'
            }
          ]
        }
      ]
    }),

    // 3. Technical
    defineField({
      name: 'stack',
      title: 'Technology Stack',
      type: 'array',
      description: 'Technologies used (e.g., Next.js, LangChain, OpenAI)',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables',
      type: 'array',
      description: 'What you provided (e.g., Website, AI Chatbot, CMS Integration)',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),

    // 4. Context & Credibility (Optional)
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      description: 'Name of client (can anonymize if NDA)'
    }),
    defineField({
      name: 'clientType',
      title: 'Client Type',
      type: 'string',
      description: 'Type of client organization',
      options: {
        list: [
          { title: 'Startup', value: 'startup' },
          { title: 'Enterprise', value: 'enterprise' },
          { title: 'NGO', value: 'ngo' },
          { title: 'Freelancer', value: 'freelancer' },
          { title: 'Small Business', value: 'small-business' },
          { title: 'Agency', value: 'agency' },
          { title: 'Personal Project', value: 'personal' }
        ]
      }
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      description: "Client's domain/industry",
      options: {
        list: [
          { title: 'AI/SaaS', value: 'ai-saas' },
          { title: 'Real Estate', value: 'real-estate' },
          { title: 'Education', value: 'education' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Finance', value: 'finance' },
          { title: 'E-commerce', value: 'ecommerce' },
          { title: 'Technology', value: 'technology' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Non-profit', value: 'nonprofit' },
          { title: 'Entertainment', value: 'entertainment' },
          { title: 'Manufacturing', value: 'manufacturing' },
          { title: 'Consulting', value: 'consulting' },
          { title: 'Other', value: 'other' }
        ]
      }
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      description: 'Current state of the project',
      options: {
        list: [
          { title: 'Completed', value: 'completed' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Ongoing Retainer', value: 'ongoing-retainer' },
          { title: 'Archived', value: 'archived' }
        ],
        layout: 'radio'
      },
      initialValue: 'completed',
      validation: Rule => Rule.required()
    }),

    // 5. Timeline (Optional)
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      description: 'When the project started'
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'When the project ended (leave blank if ongoing)'
    }),

    // 6. Links (Optional)
    defineField({
      name: 'projectUrl',
      title: 'Live Project URL',
      type: 'url',
      description: 'Link to the live project (if public)',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'githubRepo',
      title: 'GitHub Repository',
      type: 'url',
      description: 'Code repository link (optional showcase)',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    }),

    // 7. Classification (Optional)
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Flexible labels for filtering and search',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When the project case study was published',
      initialValue: () => new Date().toISOString()
    })
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'thumbnail',
      status: 'status'
    },
    prepare(selection) {
      const { title, subtitle, media, status } = selection
      return {
        title,
        subtitle: `${subtitle} • ${status || 'No status'}`,
        media
      }
    }
  },

  orderings: [
    {
      title: 'Published Date (newest first)',
      name: 'publishedAtDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Published Date (oldest first)',
      name: 'publishedAtAsc',
      by: [
        { field: 'publishedAt', direction: 'asc' }
      ]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
})