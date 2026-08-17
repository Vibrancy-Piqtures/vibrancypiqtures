'use client';

import { useState } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import Modal from '@/Components/ui/modal';
import Input from '@/Components/ui/Input';
import Textarea from '@/Components/ui/Textarea';
import Button from '@/Components/ui/Button';
import Select from '@/Components/ui/Select';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  customService: string;
  message: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sanitizePhone = (value: string) => {
  return value.replace(/[^\d+\-\s()]/g, '');
};

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    customService: '',
    message: '',
  });

  const services = [
    { value: 'photography', label: 'Photography' },
    { value: 'videography', label: 'Videography' },
    { value: 'both', label: 'Both' },
    { value: 'other', label: 'Other (please specify)' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, phone: sanitizePhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', {
      ...formData,
      service: formData.service === 'other' ? formData.customService : formData.service,
    });
    onClose();
    setStep(1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      customService: '',
      message: '',
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-semibold text-(--color-footer-heading) text-left mb-2">
              Tell Us About You
            </h2>

            <Input
              label="Name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name / alias"
              required
            />

            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Phone Number"
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              inputMode="numeric"
              pattern="[0-9+\-\s()]*"
              title="Please enter a valid phone number"
            />

            <div className="flex justify-end mt-4">
              <Button
                type="button"
                onClick={nextStep}
                disabled={!formData.name || !formData.email}
                fullWidth
              >
                Next
              </Button>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="text-2xl font-semibold text-(--color-footer-heading) text-left mb-2">
              Your Project Details
            </h2>

            <Select
              label="Service Interested In"
              options={services}
              value={formData.service}
              onChange={(e) => handleServiceChange(e.target.value)}
              placeholder="Select a service"
            />
            {formData.service === 'other' && (
              <Input
                label="Specify Service"
                id="customService"
                name="customService"
                value={formData.customService}
                onChange={handleChange}
                placeholder="Enter your specific service"
                required={formData.service === 'other'}
                className="mt-2"
              />
            )}

            <Textarea
              label="Your Message"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your project"
            />

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
              <Button
                type="button"
                onClick={prevStep}
                variant="secondary"
                className="sm:order-2 hover:bg-footer-accent-hover hover:text-white transition-colors"
              >
                <HiOutlineArrowLeft size={18} />
                Back
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={
                  !formData.service ||
                  (formData.service === 'other' && !formData.customService)
                }
                className="flex-1 sm:order-1"
              >
                Send Message
              </Button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 overflow-y-auto">
        {renderStep()}
      </form>
    </Modal>
  );
};

export default ContactModal;