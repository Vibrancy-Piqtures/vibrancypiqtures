import React from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineClock } from 'react-icons/hi';
import { FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useState } from 'react';
import ContactModal from './GetInTouch';
import './Footer.css';

const Footer = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const contactInfo = [
    { icon: <HiOutlineMail className="contact-icon" />, text: 'info@vibrancypiqtures.com' },
    { icon: <HiOutlinePhone className="contact-icon" />, text: '+256 746 711-668' },
    { icon: <HiOutlinePhone className="contact-icon" />, text: '+256 767 810-246' },
    { icon: <HiOutlineClock className="contact-icon" />, text: 'Mon-Fri: 9AM - 6PM' },
    { icon: <HiOutlineClock className="contact-icon" />, text: 'Sat: 10AM - 4PM' }
  ];

  const locationInfo = [
    { icon: <FiMapPin className="contact-icon" />, text: 'Kyanja Ring Road' },
    { text: 'Prime Building, Suite 203' },
    { text: 'Kampala, Uganda' }
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, label: 'Facebook', url: 'https://www.facebook.com/share/1MJW5NJJFg/', className: 'facebook' },
    { icon: <FaInstagram />, label: 'Instagram', url: 'https://www.instagram.com/vibrancy_piqtures', className: 'instagram' },
    { icon: <FaYoutube />, label: 'YouTube', url: 'https://www.youtube.com/@VIBRANCYPIQTURES', className: 'youtube' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        {/* CTA Section */}
        <section className="footer-cta" aria-labelledby="cta-heading">
          <h3 id="cta-heading">Ready to capture your special moments?</h3>
          <p>Book a session with us today and let's create magic together</p>
          <button className="cta-button" onClick={openModal}>Get in Touch</button>
          <ContactModal isOpen={isModalOpen} onClose={closeModal} />
        </section>

        <div className="footer-content">
          {/* Brand Section */}
          <section className="footer-brand" aria-labelledby="brand-heading">
            <h3 id="brand-heading" className="footer-logo">Vibrancy Piqtures</h3>
            <p className="footer-tagline">Turning Your Special Moments Into Timeless Pieces Of Art.</p>
            <p className="footer-services">
              Photography | Videography | Creative Direction | Editing | Retouching
            </p>
            
            <div className="footer-newsletter" aria-labelledby="newsletter-heading">
              <h4 id="newsletter-heading">Join Our Newsletter</h4>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  aria-label="Email address for newsletter"
                  required 
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </section>

          {/* Info Section */}
          <div className="footer-info">
            {/* Contact Section */}
            <section className="footer-contact" aria-labelledby="contact-heading">
              <h4 id="contact-heading">Contact</h4>
              {contactInfo.map((item, index) => (
                <p key={index}>
                  {item.icon && item.icon}
                  {item.text}
                </p>
              ))}
            </section>

            {/* Location Section */}
            <section className="footer-location" aria-labelledby="location-heading">
              <h4 id="location-heading">Location</h4>
              {locationInfo.map((item, index) => (
                <p key={index}>
                  {item.icon && item.icon}
                  {item.text}
                </p>
              ))}
            </section>
            
            {/* Social Media Section */}
            <section className="footer-socials" aria-labelledby="social-heading">
              <h4 id="social-heading">Follow Us</h4>
              <p>Stay connected for updates</p>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.label}
                    className={`social-icon ${social.className}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-legal">
          <p>© {currentYear} Vibrancy Piqtures. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

