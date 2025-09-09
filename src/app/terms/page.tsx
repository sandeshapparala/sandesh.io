// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Sandesh Apparala',
  description: 'Terms and Conditions, Privacy Policy, Shipping Policy, and Refund Policy for Sandesh Apparala\'s web development and design services.',
  robots: 'index, follow',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Terms & Conditions</h1>
            <p className="text-gray-400 text-lg">
              Last updated: {new Date().toLocaleDateString('en-IN')}
            </p>
          </div>

          {/* Navigation */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a href="#terms-conditions" className="text-blue-400 hover:text-blue-300 transition-colors">
                1. Terms & Conditions
              </a>
              <a href="#privacy-policy" className="text-blue-400 hover:text-blue-300 transition-colors">
                2. Privacy Policy
              </a>
              <a href="#shipping-policy" className="text-blue-400 hover:text-blue-300 transition-colors">
                3. Shipping Policy
              </a>
              <a href="#refund-policy" className="text-blue-400 hover:text-blue-300 transition-colors">
                4. Refund Policy
              </a>
            </nav>
          </div>

          {/* Terms & Conditions Section */}
          <section id="terms-conditions" className="space-y-6">
            <h2 className="text-3xl font-bold text-white border-b border-gray-700 pb-2">
              1. Terms & Conditions
            </h2>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Welcome to Sandesh Apparala's web development and design services. These Terms and Conditions 
                ("Terms") govern your use of our services and website located at sandesh.io ("Service") 
                operated by Sandesh Apparala ("us", "we", or "our").
              </p>
              
              <h3 className="text-xl font-semibold text-white mt-6">1.1 Acceptance of Terms</h3>
              <p>
                By accessing and using our Service, you accept and agree to be bound by the terms and 
                provision of this agreement. If you do not agree to abide by the above, please do not 
                use this service.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6">1.2 Services Offered</h3>
              <p>
                We provide web development and design services including but not limited to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Custom website development</li>
                <li>Web application development</li>
                <li>UI/UX design services</li>
                <li>E-commerce solutions</li>
                <li>Website maintenance and support</li>
                <li>AI integration solutions</li>
                <li>Digital branding services</li>
                <li>Social media management</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6">1.3 Project Terms</h3>
              <p>
                All projects require a signed agreement and advance payment as specified in the project proposal. 
                Project timelines are estimates and may vary based on client feedback, scope changes, and 
                external dependencies.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6">1.4 Payment Terms</h3>
              <p>
                Payment terms are as follows:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>50% advance payment required to commence work</li>
                <li>Remaining 50% due upon project completion</li>
                <li>Payments are accepted via bank transfer, UPI, or other specified methods</li>
                <li>Late payments may incur additional charges</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6">1.5 Intellectual Property</h3>
              <p>
                Upon full payment, clients receive full ownership rights to the delivered work. However, 
                we retain the right to showcase the work in our portfolio and use it for promotional purposes. 
                Any pre-existing intellectual property remains our property.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6">1.6 Liability Limitation</h3>
              <p>
                Our liability is limited to the amount paid for the specific service. We are not liable for 
                any indirect, incidental, or consequential damages arising from the use of our services.
              </p>
            </div>
          </section>

          {/* Privacy Policy Section */}
          <section id="privacy-policy" className="space-y-6">
            <h2 className="text-3xl font-bold text-white border-b border-gray-700 pb-2">
              2. Privacy Policy
            </h2>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                This Privacy Policy describes how Sandesh Apparala ("we", "our", or "us") collects, uses, 
                and protects your personal information when you use our services.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6">2.1 Information We Collect</h3>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Personal identification information (name, email, phone number)</li>
                <li>Business information (company name, website, industry)</li>
                <li>Project requirements and specifications</li>
                <li>Communication records and correspondence</li>
                <li>Payment and billing information</li>
                <li>Website usage data and analytics</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6">2.2 How We Use Your Information</h3>
              <p>We use your information to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Provide and deliver our services</li>
                <li>Communicate with you about your projects</li>
                <li>Process payments and billing</li>
                <li>Improve our services and website</li>
                <li>Send project updates and newsletters (with consent)</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6">2.3 Information Sharing</h3>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy or as required by law.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6">2.4 Data Security</h3>
              <p>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6">2.5 Cookies and Tracking</h3>
              <p>
                Our website may use cookies and similar tracking technologies to enhance user experience 
                and analyze website performance. You can control cookie settings through your browser.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6">2.6 Your Rights</h3>
              <p>Under Indian privacy laws, you have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for data processing</li>
                <li>File complaints with relevant authorities</li>
              </ul>
            </div>
          </section>

          {/* Shipping Policy Section */}
          <section id="shipping-policy" className="space-y-6">
            <h2 className="text-3xl font-bold text-white border-b border-gray-700 pb-2">
              3. Shipping Policy
            </h2>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                As a digital service provider, our "shipping" refers to the delivery of digital products 
                and services. This policy outlines how we deliver our services to clients.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6">3.1 Digital Delivery</h3>
              <p>All our services are delivered digitally through:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Email delivery of files and assets</li>
                <li>Cloud storage links (Google Drive, Dropbox, etc.)</li>
                <li>Direct website deployment</li>
                <li>Client portal access</li>
                <li>Version control systems (GitHub, etc.)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6">3.2 Delivery Timelines</h3>
              <p>Project delivery timelines vary based on scope and complexity:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Simple websites: 5-10 business days</li>
                <li>Complex web applications: 2-8 weeks</li>
                <li>E-commerce platforms: 3-6 weeks</li>
                <li>Custom AI solutions: 4-12 weeks</li>
                <li>Design-only projects: 3-7 business days</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6">3.3 Delivery Requirements</h3>
              <p>For successful delivery, clients must provide:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Clear project requirements and specifications</li>
                <li>Access to necessary accounts and platforms</li>
                <li>Content, images, and other required materials</li>
                <li>Timely feedback during review phases</li>
                <li>Payment as per agreed terms</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6">3.4 Delivery Confirmation</h3>
              <p>
                Delivery is considered complete when the final files are transferred to the client 
                and confirmation is received. Clients have 7 days to report any delivery issues.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6">3.5 Physical Deliveries</h3>
              <p>
                In rare cases where physical items are involved (USB drives, printed materials), 
                shipping within India is handled through reliable courier services with tracking.
              </p>
            </div>
          </section>

          {/* Refund Policy Section */}
          <section id="refund-policy" className="space-y-6">
            <h2 className="text-3xl font-bold text-white border-b border-gray-700 pb-2">
              4. Refund Policy
            </h2>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We strive to provide high-quality services and ensure client satisfaction. This refund 
                policy outlines the terms and conditions for refunds on our services.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6">4.1 Refund Eligibility</h3>
              <p>Refunds may be considered in the following situations:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Failure to deliver services as per agreed specifications</li>
                <li>Project cancellation before work commencement</li>
                <li>Service defects that cannot be reasonably corrected</li>
                <li>Mutual agreement to terminate the project</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6">4.2 Non-Refundable Scenarios</h3>
              <p>Refunds are not available in the following cases:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Change of mind after project commencement</li>
                <li>Client-requested scope changes leading to additional costs</li>
                <li>Delays caused by client feedback or material provision</li>
                <li>Services already delivered and accepted</li>
                <li>Custom development work that has been completed</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6">4.3 Refund Process</h3>
              <p>To request a refund:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Contact us within 30 days of payment with a detailed explanation</li>
                <li>Provide all relevant documentation and communication records</li>
                <li>Allow up to 10 business days for refund processing</li>
                <li>Refunds will be processed through the original payment method</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6">4.4 Partial Refunds</h3>
              <p>
                In cases of project cancellation after work has commenced, partial refunds may be 
                calculated based on the work completed and resources invested.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6">4.5 Dispute Resolution</h3>
              <p>
                In case of disputes regarding refunds, we encourage open communication to reach 
                a mutually acceptable resolution. If needed, disputes will be resolved according 
                to Indian laws and jurisdiction.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6">4.6 Processing Time</h3>
              <p>
                Approved refunds will be processed within 7-10 business days. The time for the 
                refund to appear in your account depends on your payment provider.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
            <div className="space-y-2 text-gray-300">
              <p><strong>Business Name:</strong> Sandesh Apparala - Web Development & Design Services</p>
              <p><strong>Location:</strong> India</p>
              <p><strong>Email:</strong> hello@sandesh.io</p>
              <p><strong>Website:</strong> https://sandesh.io</p>
              <p className="text-sm text-gray-400 mt-4">
                For any questions regarding these terms, privacy concerns, shipping, or refund requests, 
                please contact us using the information above.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center text-gray-400 text-sm border-t border-gray-700 pt-6">
            <p>
              These terms are governed by Indian law and are subject to change. 
              Continued use of our services constitutes acceptance of any updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}