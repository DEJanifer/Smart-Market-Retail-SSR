import React, { useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import Contact from '../components/Contact';

const ContactPage: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.fade-in').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <PageLayout
      title="Contact Smart Market Retail - Free Vending Consultation | Carroll & Baltimore County MD"
      description="Contact Smart Market Retail for a free consultation on Smart Stores and Micro Markets. Serving Carroll & Baltimore County Maryland with zero-cost vending solutions, installation, and maintenance. Call (410) 220-5652."
      keywords="contact smart market retail, free vending consultation, vending services Maryland, smart vending installation, micro market consultation, Carroll County, Baltimore County, (410) 220-5652"
    >
      <div className="fade-in pt-20">
        <Contact />
      </div>
    </PageLayout>
  );
};

export default ContactPage;