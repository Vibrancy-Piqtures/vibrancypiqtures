import React, { useState } from 'react';
import './ContactUs.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We\'ll contact you soon.');
      setFormData({ name: '', email: '', date: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-wrapper">
      <section className="contact-container">
        <div className="contact-header">
          <h1 className="vibrancy-heading">Let's Connect</h1>
          <p className="tagline">Ready to capture your special day?</p>
        </div>

        <div className="contact-content">
          <form onSubmit={handleSubmit} className="contact-form" autoComplete="on">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                aria-required="true"
              />
            </div>

            {/* <div className="form-group">
              <label htmlFor="date">Event Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                aria-label="Event date"
              />
            </div> */}

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                autoComplete="off"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Your message..."
                aria-required="true"
                style={{ resize: 'vertical', minHeight: '250px' }}
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="contact-info">
            <h2 className="visually-hidden">Contact Information</h2>
            <h3>Other Ways to Reach Us</h3>
            <p><strong>Email:</strong> info@vibrancypiqtures.com</p>
            <p><strong>Location:</strong></p>
            <address>
              Kyanja Ring Road<br />
              Prime Building<br />
              Kampala, Uganda
            </address>
            
            {/* Map Container
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.722461124924!2d32.59613312849002!3d0.3971722352698169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db1250108b7af%3A0xadfbcafb4a41bb68!2sPRINCE!5e0!3m2!1sen!2sug!4v1747247698955!5m2!1sen!2sug" 
                width="600" 
                height="450" 
                style={{ border: 0 }}
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map of Vibrancy Pictures Location"
              ></iframe>
            </div> */}

            <div className="business-hours">
              <h3>Business Hours</h3>
              <p>Monday-Saturday: 9am-8pm</p>
              <p>Sundays: By appointment only</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;