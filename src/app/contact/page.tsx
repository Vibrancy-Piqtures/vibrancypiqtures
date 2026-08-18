'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We\'ll contact you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bg-primary min-h-screen w-full transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 lg:pt-32 lg:pb-24 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl w-full mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-(--color-text-light) mb-6 transition-colors duration-300">
            Let&apos;s Connect
          </h1>
          <p className="text-xl md:text-2xl font-medium text-(--color-primary) mb-6 transition-colors duration-300">
            Ready to capture your special day?
          </p>
          <div className="h-1 w-20 bg-(--color-primary) mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="w-full max-w-5xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            
            {/* Form Section */}
            <div className="bg-(--color-header-bg) border border-(--color-search-dropdown-border) rounded-2xl p-8 md:p-10 shadow-sm transition-colors duration-300">
              <h2 className="text-2xl font-bold text-(--color-text-light) mb-6 transition-colors duration-300">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6" autoComplete="on">
                <div className="flex flex-col">
                  <label htmlFor="name" className="font-semibold text-sm text-(--color-text-light) mb-2 uppercase tracking-wide transition-colors duration-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="px-5 py-4  border border-(--color-search-dropdown-border) rounded-xl text-(--color-text-light) focus:outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-all duration-300 placeholder-opacity-50"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="font-semibold text-sm text-(--color-text-light) mb-2 uppercase tracking-wide transition-colors duration-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="px-5 py-4  border border-(--color-search-dropdown-border) rounded-xl text-(--color-text-light) focus:outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-all duration-300 placeholder-opacity-50"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="message" className="font-semibold text-sm text-(--color-text-light) mb-2 uppercase tracking-wide transition-colors duration-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    autoComplete="off"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your event..."
                    className="px-5 py-4  border border-(--color-search-dropdown-border) rounded-xl text-footer-secondary focus:outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-all duration-300 resize-y min-h-37.5 placeholder-opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-(--color-primary) text-(--color-cta-text) px-8 py-4 rounded-xl font-bold text-lg hover:bg-(--color-footer-accent-hover) transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information Section */}
            <div className="flex flex-col gap-8">
              <div className="bg-(--color-header-bg) border border-(--color-search-dropdown-border) p-8 md:p-10 rounded-2xl shadow-sm transition-colors duration-300 h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-(--color-text-light) mb-8 transition-colors duration-300">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full  border border-(--color-search-dropdown-border) flex items-center justify-center shrink-0 text-(--color-primary)">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-footer-secondary uppercase tracking-wide">Email Us</h4>
                      <a href="mailto:info@vibrancypiqtures.com" className="text-lg font-medium text-(--color-text-light) hover:text-(--color-primary) transition-colors duration-300">
                        info@vibrancypiqtures.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full border border-(--color-search-dropdown-border) flex items-center justify-center shrink-0 text-(--color-primary)">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-footer-secondary uppercase tracking-wide">Visit Us</h4>
                      <address className="not-italic text-lg font-medium text-(--color-text-light) mt-1 transition-colors duration-300">
                        Kyanja Ring Road<br />
                        Prime Building<br />
                        Kampala, Uganda
                      </address>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-(--color-search-dropdown-border)">
                  <h3 className="text-xl font-bold text-(--color-text-light) mb-6 transition-colors duration-300">
                    Business Hours
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-footer-secondary">
                      <span className="font-medium">Monday - Saturday</span>
                      <span className="text-(--color-text-light) font-semibold">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center text-footer-secondary">
                      <span className="font-medium">Sunday</span>
                      <span className="text-(--color-primary) font-semibold">By Appointment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full bg-(--color-header-bg) border border-(--color-search-dropdown-border) rounded-2xl overflow-hidden shadow-sm transition-colors duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-full h-80 md:h-100">
              <iframe
                src="https://maps.google.com/maps?q=Prime%20Building,%20Kyanja%20Ring%20Road,%20Kampala&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vibrancy Piqtures Location"
                className="w-full h-full grayscale-20 contrast-[1.1] opacity-90 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
