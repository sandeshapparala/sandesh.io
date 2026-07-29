import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, email, company, service, budget, timeline, message } = body

        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
        }

        const doc = {
            _type: 'booking',
            name: name.trim(),
            email: email.trim().toLowerCase(),
            company: company?.trim() || '',
            service: service || 'unsure',
            budget: budget || 'discuss',
            timeline: timeline || 'exploring',
            message: message.trim(),
            status: 'new',
            submittedAt: new Date().toISOString(),
        }

        await writeClient.create(doc)

        return NextResponse.json({ success: true }, { status: 201 })
    } catch (err) {
        console.error('[booking] error:', err)
        return NextResponse.json({ error: 'Failed to submit. Please email hello@sandesh.io directly.' }, { status: 500 })
    }
}
