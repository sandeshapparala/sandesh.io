"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TestimonialFormState {
  name: string;
  feedback: string;
  rating: number;
  position: string;
  company: string;
  email: string;
  projectWorkedOn: string;
  photo: File | null;
}

const TestimonialForm = () => {
  const [formData, setFormData] = useState<TestimonialFormState>({
    name: '',
    feedback: '',
    rating: 5,
    position: '',
    company: '',
    email: '',
    projectWorkedOn: '',
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Photo size must be less than 5MB');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        photo: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('feedback', formData.feedback);
      formDataToSend.append('rating', formData.rating.toString());
      formDataToSend.append('position', formData.position);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('projectWorkedOn', formData.projectWorkedOn);
      
      if (formData.photo) {
        formDataToSend.append('photo', formData.photo);
      }

      const response = await fetch('/api/testimonials', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Thank you! Your testimonial has been submitted and is pending approval.');
        
        // Reset form
        setFormData({
          name: '',
          feedback: '',
          rating: 5,
          position: '',
          company: '',
          email: '',
          projectWorkedOn: '',
          photo: null,
        });
        setPhotoPreview(null);
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.error || 'Failed to submit testimonial');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Network error. Please try again.');
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(star)}
            className={`text-2xl transition-colors ${
              star <= formData.rating
                ? 'text-yellow-400 hover:text-yellow-500'
                : 'text-gray-300 hover:text-yellow-300'
            }`}
          >
            ⭐
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Share Your Experience
          </CardTitle>
          <CardDescription className="text-lg">
            Your feedback helps others understand the value of our work together.
            All testimonials are reviewed before publishing.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <span className="text-green-600 text-xl mr-2">✅</span>
                <p className="text-green-800">{statusMessage}</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <span className="text-red-600 text-xl mr-2">❌</span>
                <p className="text-red-800">{statusMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email (Optional)
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="position" className="text-sm font-medium">
                  Position/Job Title *
                </Label>
                <Input
                  id="position"
                  name="position"
                  type="text"
                  required
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="CEO, Marketing Manager, etc."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="company" className="text-sm font-medium">
                  Company *
                </Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="projectWorkedOn" className="text-sm font-medium">
                Project Worked On (Optional)
              </Label>
              <Input
                id="projectWorkedOn"
                name="projectWorkedOn"
                type="text"
                value={formData.projectWorkedOn}
                onChange={handleInputChange}
                placeholder="Website redesign, AI chatbot, etc."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="rating" className="text-sm font-medium">
                Rating * ({formData.rating}/5)
              </Label>
              <div className="mt-2">
                {renderStars()}
              </div>
            </div>

            <div>
              <Label htmlFor="feedback" className="text-sm font-medium">
                Your Feedback *
              </Label>
              <Textarea
                id="feedback"
                name="feedback"
                required
                value={formData.feedback}
                onChange={handleInputChange}
                placeholder="Share your experience working with us. What challenges did we solve? What results did you achieve?"
                rows={5}
                maxLength={1000}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.feedback.length}/1000 characters
              </p>
            </div>

            <div>
              <Label htmlFor="photo" className="text-sm font-medium">
                Profile Photo (Optional)
              </Label>
              <Input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Max file size: 5MB. Recommended: Square format, 400x400px or larger.
              </p>
              
              {photoPreview && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                    <Image
                      src={photoPreview}
                      alt="Photo preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Testimonial'
                )}
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>
              <Badge variant="outline" className="mb-2">Privacy Notice</Badge>
            </p>
            <p>
              Your information will only be used for displaying your testimonial and contacting you if needed.
              We will never share your details with third parties.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialForm;