'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddItemPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: '',
    additionalImages: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, field) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddAdditionalImage = () => {
    setFormData(prev => ({
      ...prev,
      additionalImages: [...prev.additionalImages, '']
    }));
  };

  const handleRemoveAdditionalImage = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Item successfully added');
        router.push('/view-items');
      } else {
        throw new Error(data.error || 'Failed to add item');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Add New Item</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Item Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Item Type
              </label>
              <select
                id="type"
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a type</option>
                <option value="Shirt">Shirt</option>
                <option value="Pant">Pant</option>
                <option value="Shoes">Shoes</option>
                <option value="Sports Gear">Sports Gear</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                Cover Image URL
              </label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                required
                value={formData.coverImage}
                onChange={(e) => handleImageChange(e, 'coverImage')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Images
                </label>
                <button
                  type="button"
                  onClick={handleAddAdditionalImage}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Add Image
                </button>
              </div>
              {formData.additionalImages.map((image, index) => (
                <div key={index} className="mt-2 flex items-center">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => {
                      const newImages = [...formData.additionalImages];
                      newImages[index] = e.target.value;
                      setFormData(prev => ({ ...prev, additionalImages: newImages }));
                    }}
                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Image URL"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveAdditionalImage(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Adding...' : 'Add Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}