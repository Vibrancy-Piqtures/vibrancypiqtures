'use client';

import { useState } from 'react';

const teamMembers = [
  {
    name: 'Marq',
    role: 'Photographer, Editor, Creative Director & Co-Founder',
    bio: 'Specializes in capturing candid moments and telling your unique love story.',
    image: 'assets/Feature/Team/Mark.jpg',
  },
  {
    name: 'Swade Jaymes',
    role: 'Photographer, Editor, Client Management & Co-Founder',
    bio: 'In charge of making sure you receive your images on time and are satisfied with our service delivery.',
    image: 'assets/Feature/Team/Jaymes.jpg',
  },
  {
    name: 'Monalisa',
    role: 'Editor & Client Management',
    bio: 'Helps manage client relationships and ensures the final edited images meet your expectations.',
    image: 'assets/Feature/Team/Monalisa.jpg',
  },
  {
    name: 'Jordan',
    role: 'Grip & Lighting Specialist',
    bio: 'Makes sure the images are well lit and look vibrant.',
    image: 'assets/Feature/Team/Jordan.jpg',
  },
  {
    name: 'Ashraf',
    role: 'Videographer & Editor',
    bio: 'Makes the detail video that will allow you relive your special day.',
    image: 'assets/Feature/Team/Ashraf.jpg',
  },
];

const faqs = [
  { id: 1, question: 'How far in advance should we book your services?', answer: 'We recommend booking at least 3-6 months in advance.' },
  { id: 2, question: 'What is included in your wedding photography packages?', answer: 'Our packages include full-day coverage, high-resolution edited images, and an online gallery.' },
  { id: 3, question: 'How long until we receive our photos?', answer: 'Our standard delivery time is 2-3 weeks for weddings.' },
  { id: 4, question: 'Do you travel for destination weddings?', answer: 'Yes! We travel for weddings worldwide.' },
  { id: 5, question: 'How many of your photography team do I expect on my wedding?', answer: 'We typically have a team of 2 photographers and 2 videographers.' },
  { id: 6, question: 'Do you retouch the images?', answer: 'Yes, we retouch all images to ensure they look their best.' },
];

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-bg-primary min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 lg:pt-32 lg:pb-24 flex flex-col items-center">
        
        {/* Intro Section */}
        <section className="text-center max-w-3xl w-full mb-20 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-(--color-text-light) mb-6 transition-colors duration-300">
            Vibrancy Piqtures
          </h1>
          <p className="text-xl md:text-2xl font-medium text-footer-secondary mb-6 transition-colors duration-300">
            Photography and videography services company in Kyanja, Kampala - Uganda.
          </p>
          <p className="text-base md:text-lg text-footer-secondary leading-relaxed transition-colors duration-300">
            Founded in 2023, we&apos;re a passionate team dedicated to capturing your moments with artistry and authenticity. We blend technical precision with genuine emotion to create timeless pieces that portray our subjects` unique essence.
          </p>
        </section>

        {/* Team Section */}
        <section className="w-full mb-24 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-(--color-text-light) transition-colors duration-300">
              Meet Our Team
            </h2>
            <div className="h-1 w-20 bg-(--color-primary) mx-auto mt-4 rounded-sm"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 px-4 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-8 bg-(--color-header-bg) border border-(--color-search-dropdown-border) rounded-md shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group w-full sm:w-[calc(50%-2rem)] lg:w-80"
              >
                <div className="w-36 h-36 mb-6 rounded-md overflow-hidden border-4 border-bg-primary shadow-md transition-colors duration-300 shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold text-(--color-text-light) transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-footer-secondary mt-2 uppercase tracking-wide">
                  {member.role}
                </p>
                <p className="text-sm text-footer-secondary mt-4 leading-relaxed grow">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full max-w-3xl pt-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-(--color-text-light) transition-colors duration-300">
              Frequently Asked Questions
            </h2>
            <div className="h-1 w-20 bg-(--color-primary) mx-auto mt-4 rounded-sm"></div>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={faq.id}
                  className={`border border-(--color-search-dropdown-border) rounded-md overflow-hidden transition-all duration-300 ${
                    isActive ? 'bg-(--color-header-bg) shadow-md' : 'bg-transparent'
                  }`}
                >
                  <button
                    className="w-full flex justify-between items-center text-left px-6 py-5 cursor-pointer focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className={`font-semibold text-lg transition-colors duration-300 ${
                      isActive ? 'text-(--color-primary)' : 'text-(--color-text-light)'
                    }`}>
                      {faq.question}
                    </span>
                    <span className="shrink-0 ml-4 flex items-center justify-center w-8 h-8 rounded-md bg-(--color-search-bg) text-(--color-primary) transition-transform duration-300">
                      {isActive ? (
                        <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                  </button>
                  
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      isActive ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-footer-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        
      </div>
    </div>
  );
}