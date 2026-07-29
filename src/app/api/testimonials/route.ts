import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const name = formData.get('name') as string
    const feedback = formData.get('feedback') as string
    const rating = parseInt(formData.get('rating') as string)
    const position = formData.get('position') as string
    const company = formData.get('company') as string
    const email = formData.get('email') as string
    const projectWorkedOn = formData.get('projectWorkedOn') as string
    const photo = formData.get('photo') as File

    // Validate required fields
    if (!name || !feedback || !rating || !position || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    let photoAsset = null

    // Upload photo to Sanity if provided
    if (photo && photo.size > 0) {
      try {
        const buffer = await photo.arrayBuffer()
        const uploadResponse = await client.assets.upload('image', Buffer.from(buffer), {
          filename: photo.name,
        })
        photoAsset = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadResponse._id,
          },
          alt: `${name}'s profile photo`
        }
      } catch (uploadError) {
        console.error('Photo upload error:', uploadError)
        return NextResponse.json(
          { error: 'Failed to upload photo' },
          { status: 500 }
        )
      }
    }

    // Create testimonial document
    const testimonial = await client.create({
      _type: 'testimonial',
      name,
      feedback,
      rating,
      position,
      company,
      email: email || undefined,
      projectWorkedOn: projectWorkedOn || undefined,
      photo: photoAsset,
      approved: false, // Requires manual approval
      featured: false,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json(
      { 
        message: 'Testimonial submitted successfully!',
        id: testimonial._id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Testimonial submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit testimonial' },
      { status: 500 }
    )
  }
}