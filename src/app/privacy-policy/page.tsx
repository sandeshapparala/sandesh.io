// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Sandesh Apparala',
  description: 'Privacy Policy for Sandesh Apparala\'s web development and design services. Learn how we collect, use, and protect your personal information.',
  robots: 'index, follow',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
            <p className="text-gray-400 text-lg">
              Last updated: {new Date().toLocaleDateString('en-IN')}
            </p>
            <Link 
              href="/terms" 
              className="inline-block text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to Terms & Conditions
            </Link>
          </div>

          {/* Privacy Policy Content */}
          <section className="space-y-6">
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                This Privacy Policy describes how Sandesh Apparala ("we", "our", or "us") collects, uses, 
                and protects your personal information when you use our web development and design services.
              </p>

              <h2 className="text-2xl font-semibold text-white mt-8">Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Personal identification information (name, email, phone number)</li>
                <li>Business information (company name, website, industry)</li>
                <li>Project requirements and specifications</li>
                <li>Communication records and correspondence</li>
                <li>Payment and billing information</li>
                <li>Website usage data and analytics</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-8">How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Provide and deliver our services</li>
                <li>Communicate with you about your projects</li>
                <li>Process payments and billing</li>
                <li>Improve our services and website</li>
                <li>Send project updates and newsletters (with consent)</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-8">Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy or as required by law. We may 
                share information with:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Service providers who assist in our business operations</li>
                <li>Payment processors for billing purposes</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-8">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. Our security measures include:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Encryption of sensitive data</li>
                <li>Secure data storage and backup systems</li>
                <li>Limited access to personal information</li>
                <li>Regular security assessments and updates</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-8">Cookies and Tracking</h2>
              <p>
                Our website may use cookies and similar tracking technologies to enhance user experience 
                and analyze website performance. Types of cookies we use:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to understand website usage</li>
                <li>Performance cookies to improve site speed</li>
                <li>Marketing cookies (with consent) for personalized content</li>
              </ul>
              <p>You can control cookie settings through your browser preferences.</p>

              <h2 className="text-2xl font-semibold text-white mt-8">Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes 
                for which it was collected or as required by law. Project-related data is typically 
                retained for 3-5 years for support and legal purposes.
              </p>

              <h2 className="text-2xl font-semibold text-white mt-8">Your Rights</h2>
              <p>Under Indian privacy laws and our commitment to transparency, you have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for data processing</li>
                <li>Object to processing of your data</li>
                <li>Data portability (receive your data in a structured format)</li>
                <li>File complaints with relevant authorities</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-8">Third-Party Services</h2>
              <p>
                We may use third-party services to enhance our offerings. These services have their 
                own privacy policies:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Google Analytics for website analytics</li>
                <li>Payment gateways for transaction processing</li>
                <li>Cloud storage services for file management</li>
                <li>Email services for communication</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-8">Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under 18 years of age. We do not 
                knowingly collect personal information from children under 18.
              </p>

              <h2 className="text-2xl font-semibold text-white mt-8">International Data Transfers</h2>
              <p>
                Your information may be processed and stored in servers located outside India. 
                We ensure appropriate safeguards are in place to protect your data during such transfers.
              </p>

              <h2 className="text-2xl font-semibold text-white mt-8">Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the "last updated" date.
              </p>

              <h2 className="text-2xl font-semibold text-white mt-8">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or wish to exercise your rights, 
                please contact us at:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p><strong>Email:</strong> hello@sandesh.io</p>
                <p><strong>Website:</strong> https://sandesh.io</p>
                <p><strong>Business:</strong> Sandesh Apparala - Web Development & Design Services</p>
                <p><strong>Location:</strong> India</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center text-gray-400 text-sm border-t border-gray-700 pt-6">
            <p>
              This Privacy Policy is governed by Indian law and is subject to change. 
              Continued use of our services constitutes acceptance of any updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}