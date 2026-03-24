import React from 'react';
import './WhatsAppButton.css';
import WhatsAppButtonIcon from '../assets/IndexImages/WhatsAppButton-Icon.png';

const WhatsAppButton = () => {
  const phoneNumber = '+256767810246';
  const message = 'Hello! I came across your photography website...';

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <img 
        src={WhatsAppButtonIcon} 
        alt="WhatsApp" 
        width="50" 
        height="50"
      />
    </a>
  );
};

export default WhatsAppButton;


