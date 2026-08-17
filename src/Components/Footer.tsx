'use client';

import { useState } from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineClock } from 'react-icons/hi';
import { FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import ContactModal from './ContactModal';
import Reveal from './Reveal';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const contactInfo = [
    { icon: <HiOutlineMail className="text-lg w-5 shrink-0" />, text: 'info@vibrancypiqtures.com' },
    { icon: <HiOutlinePhone className="text-lg w-5 shrink-0" />, text: '+256 746 711-668' },
    { icon: <HiOutlinePhone className="text-lg w-5 shrink-0" />, text: '+256 767 810-246' },
    { icon: <HiOutlineClock className="text-lg w-5 shrink-0" />, text: 'Mon-Fri: 9AM - 6PM' },
    { icon: <HiOutlineClock className="text-lg w-5 shrink-0" />, text: 'Sat: 10AM - 4PM' },
  ];

  const locationInfo = [
    { icon: <FiMapPin className="text-lg w-5 shrink-0" />, text: 'Kyanja Ring Road' },
    { text: 'Prime Building, Suite 203' },
    { text: 'Kampala, Uganda' },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, label: 'Facebook', url: '...', className: 'bg-[#3b5998]' },
    { icon: <FaXTwitter />, label: 'X', url: '...', className: 'bg-black' },
    { icon: <FaInstagram />, label: 'Instagram', url: '...', className: 'bg-gradient-to-br from-[#405de6] via-[#833ab4] to-[#fd1d1d]' },
    { icon: <FaYoutube />, label: 'YouTube', url: '...', className: 'bg-[#ff0000]' },
  ];

  return (
    <footer className="bg-footer-bg dark:bg-footer-bg-dark text-footer-text dark:text-footer-text-dark font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 flex flex-col gap-12">
        {/* CTA Section */}
        <Reveal direction="up">
          <section className="bg-cta-bg text-cta-text p-6 md:p-8 lg:p-10 rounded-lg text-center mb-5">
            <h3 className="text-2xl md:text-3xl font-medium mb-4">Ready to capture your special moments?</h3>
            <p className="text-base md:text-lg opacity-90 mb-6">
              Book a session with us today and let's create magic together
            </p>
            <button
              onClick={openModal}
              className="bg-transparent text-cta-text border-2 border-cta-text px-6 py-3 rounded-full font-semibold hover:bg-cta-text hover:text-cta-bg transition-all"
            >
              Get in Touch
            </button>
            <ContactModal isOpen={isModalOpen} onClose={closeModal} />
          </section>
        </Reveal>

        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Newsletter */}
          <Reveal as="section" direction="up" delay={0.05}>
            <h3 className="text-[1.8rem] font-bold text-footer-heading dark:text-footer-heading-dark mb-4">
              Vibrancy Piqtures
            </h3>
            <p className="text-xl font-medium text-footer-heading dark:text-footer-heading-dark leading-relaxed mb-4">
              Turning Your Special Moments Into Timeless Pieces Of Art.
            </p>
            <p className="text-sm text-footer-secondary dark:text-footer-secondary-dark leading-relaxed mb-5">
              Photography | Videography | Creative Direction | Editing | Retouching
            </p>
            <div className="mt-6">
              <h4 className="text-lg font-medium text-footer-heading dark:text-footer-heading-dark mb-4">
                Join Our Newsletter
              </h4>
              <form className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-2.5 border border-footer-border dark:border-footer-border-dark rounded bg-footer-bg dark:bg-footer-bg-dark text-footer-text dark:text-footer-text-dark focus:outline-none focus:ring-2 focus:ring-footer-accent"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-footer-accent text-white rounded cursor-pointer hover:bg-footer-accent-hover transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </Reveal>

          {/* Contact */}
          <Reveal as="section" direction="up" delay={0.1}>
            <h4 className="text-lg font-semibold text-footer-heading dark:text-footer-heading-dark mb-5 pb-2.5 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-footer-heading dark:after:bg-footer-heading-dark">
              Contact
            </h4>
            {contactInfo.map((item, idx) => (
              <p
                key={idx}
                className="flex items-center gap-2 text-sm text-footer-secondary dark:text-footer-secondary-dark mb-3"
              >
                {item.icon}
                {item.text}
              </p>
            ))}
          </Reveal>

          {/* Location */}
          <Reveal as="section" direction="up" delay={0.15}>
            <h4 className="text-lg font-semibold text-footer-heading dark:text-footer-heading-dark mb-5 pb-2.5 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-footer-heading dark:after:bg-footer-heading-dark">
              Location
            </h4>
            {locationInfo.map((item, idx) => (
              <p
                key={idx}
                className="flex items-center gap-2 text-sm text-footer-secondary dark:text-footer-secondary-dark mb-3"
              >
                {item.icon}
                {item.text}
              </p>
            ))}
          </Reveal>

          {/* Social */}
          <Reveal as="section" direction="up" delay={0.2}>
            <h4 className="text-lg font-semibold text-footer-heading dark:text-footer-heading-dark mb-5 pb-2.5 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-footer-heading dark:after:bg-footer-heading-dark">
              Follow Us
            </h4>
            <p className="text-sm text-footer-secondary dark:text-footer-secondary-dark mb-4">
              Stay connected for updates
            </p>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-base transition-transform hover:-translate-y-1 hover:shadow-md ${social.className}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center mt-8 pt-5 border-t border-footer-border dark:border-footer-border-dark text-sm text-footer-secondary dark:text-footer-secondary-dark">
        <p suppressHydrationWarning>
          © {new Date().getFullYear()} Vibrancy Piqtures. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
