import React, { useState } from 'react';
import { HiOutlineX, HiOutlineArrowLeft } from 'react-icons/hi';
import CustomSelect from './CustomSelect';
import './GetInTouch.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    customService: '',
    message: ''
  });

  const services = [
    { value: 'photography', label: 'Photography' },
    { value: 'videography', label: 'Videography' },
    { value: 'both', label: 'Both' },
    { value: 'other', label: 'Other (please specify)' }
  ];

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', {
      ...formData,
      service: formData.service === 'other' ? formData.customService : formData.service
    });
    onClose();
    // Reset form after submission
    setStep(1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      customService: '',
      message: ''
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="modal-title">Tell Us About You</h2>
            
            <FormField label="Name" htmlFor="name">
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name / alias"
                required 
              />
            </FormField>
            
            <FormField label="Email" htmlFor="email">
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required 
              />
            </FormField>
            
            <FormField label="Phone Number" htmlFor="phone">
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </FormField>
            
            <div className="form-navigation">
              <button 
                type="button" 
                className="next-button"
                onClick={nextStep}
                disabled={!formData.name || !formData.email}
              >
                Next
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="modal-title">Your Project Details</h2>
            
            <FormField label="Service Interested In">
              <CustomSelect
                options={services}
                value={formData.service}
                onChange={handleServiceChange}
                placeholder="Select a service"
              />
              
              {formData.service === 'other' && (
                <div className="custom-service-input">
                  <label htmlFor="customService">Specify Service</label>
                  <input
                    type="text"
                    id="customService"
                    name="customService"
                    value={formData.customService}
                    onChange={handleChange}
                    placeholder="Enter your specific service"
                    required={formData.service === 'other'}
                  />
                </div>
              )}
            </FormField>
            
            <FormField label="Your Message" htmlFor="message">
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4" 
                placeholder="Tell us about your project"
              />
            </FormField>
            
            <div className="form-navigation">
              <button 
                type="button" 
                className="back-button"
                onClick={prevStep}
              >
                <HiOutlineArrowLeft size={18} /> Back
              </button>
              <button 
                type="button" 
                className="submit-button"
                onClick={handleSubmit}
                disabled={!formData.service || (formData.service === 'other' && !formData.customService)}
              >
                Send Message
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close" 
          onClick={onClose} 
          aria-label="Close contact form"
        >
          <HiOutlineX size={24} />
        </button>
        
        <form onSubmit={handleSubmit} className="contact-form">
          {renderStep()}
        </form>
      </div>
    </div>
  );
};

// Reusable FormField component
const FormField = ({ label, htmlFor, children }) => (
  <div className="form-group">
    <label htmlFor={htmlFor}>{label}</label>
    {children}
  </div>
);

export default ContactModal;


