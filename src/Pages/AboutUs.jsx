import React, { useState } from 'react'; 
import './AboutUs.css';

const teamModules = import.meta.glob('../assets/IndexImages/Team/*.{jpg,JPG,jpeg,JPEG}', { eager: true });

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const teamMembers = [
    {
      name: "Mark Paul Mugerwa",
      role: "Photographer, Editor, Creative Director and Co-Founder",
      bio: "Specializes in capturing candid moments and tell your unique love story.",
      filename: "Mark.jpg"
    },
    {
      name: "Swade James",
      role: "Photographer, Editor, Client Management and Co-Founder",
      bio: "In charge of making sure you receive your images on time and are satisfied with our sevice delivery.",
      filename: "Jaymes.jpg" 
    },
    {
      name: "Jordan",
      role: "Grip and Lighting Specialist",
      bio: "Makes sure the images are well lit and look vibrant.",
      filename: "Jordan.jpg"
    },
    {
      name: "Asher",
      role: "Videographer and Editor",
      bio: "Makes the detail video that will allow you relive your special day.",
      filename: "Asher.jpg"
    }
  ].map(member => {
    const imageKey = Object.keys(teamModules).find(key => 
      key.toLowerCase().includes(member.filename.toLowerCase())
    );
    
    return {
      ...member,
      image: imageKey ? teamModules[imageKey].default : null
    };
  });

  const faqs = [
    { id : 1, question: "How far in advance should we book your services?", answer: "We recommend booking at least 3-6 months in advance." },
    { id : 2, question: "What is included in your wedding photography packages?", answer: "Our packages include full-day coverage, high-resolution edited images, and an online gallery." },
    { id : 3, question: "How long until we receive our photos?", answer: "Our standard delivery time is 2-3 weeks for weddings." },
    { id : 4, question: "Do you travel for destination weddings?", answer: "Yes! We travel for weddings worldwide." },
    { id : 5, question: "How many of your photography team do i expect on my wedding?", answer: "We typically have a team of 2 photographers and 2 videographers." },
    { id : 6, question: "Do you retouch the images?", answer: "Yes, we retouch all images to ensure they look their best." }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="about-wrapper">
      <div className="about-container">
        <section className="about-intro">
          <h1>Vibrancy Piqtures</h1>
          <p className="tagline">We are a fully registered photography services company</p>
          <div className="about-text">
            <p>Founded in 2023, we're a passionate team dedicated to capturing your wedding day with artistry and authenticity.</p>
          </div>
        </section>

        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-image-container">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="member-image" />
                  ) : (
                    <div className="image-error">Image not found</div>
                  )}
                </div>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`} onClick={() => toggleFAQ(index)}>
                <div className="faq-question">
                  {faq.question}
                  <span>{activeIndex === index ? '−' : '+'}</span>
                </div>
                {activeIndex === index && <div className="faq-answer"><p>{faq.answer}</p></div>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;

