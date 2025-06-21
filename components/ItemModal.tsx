'use client';

import { useState } from 'react';
import ImageCarousel from './ImageCarousel';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Item {
  _id: string;
  name: string;
  type: string;
  description: string;
  coverImage: string;
  additionalImages: string[];
}

export default function ItemModal({ item }: { item: Item }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleEnquire = async () => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enquire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: item._id,
          userEmail: email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send enquiry');
      }
      
      toast.success('Enquiry sent successfully!');
      router.back();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
            <button
              onClick={() => router.back()}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <ImageCarousel images={[item.coverImage, ...item.additionalImages]} />
            </div>
            <div className="flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Type</h3>
                <p className="text-gray-600">{item.type}</p>
              </div>
              <div className="mb-4 flex-1 min-h-0">
                <h3 className="text-lg font-semibold text-gray-700">Description</h3>
                <div className="text-gray-600 overflow-y-auto max-h-[200px] pr-2">
                  <p className="whitespace-pre-wrap break-words">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Interested in this item?
                </h3>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  onClick={handleEnquire}
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Enquire'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}