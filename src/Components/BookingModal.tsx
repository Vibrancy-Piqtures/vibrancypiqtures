'use client';

import Modal from '@/Components/ui/modal';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book a Session">
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">Book a Session</h2>
        <p className="text-zinc-600 mb-6">
          Fill out the form and we&apos;ll get back to you within 24 hours.
        </p>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            // Replace with actual booking logic (API call, email, etc.)
            alert('Booking submitted! We will contact you shortly.');
            onClose();
          }}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-zinc-700 mb-1">
              Preferred Date
            </label>
            <input
              type="date"
              id="date"
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </Modal>
  );
}
