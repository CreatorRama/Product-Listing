import ItemCard from '@/components/ItemCard';
import Link from 'next/link';
import { Suspense } from 'react';

async function getItems() {
  try {
    // Use absolute URL in production, relative in development
    const baseUrl = process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SITE_URL
      : 'http://localhost:3000';
    
    const res = await fetch(`${baseUrl}/api/items`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch items: ${res.status} ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    throw new Error('Unable to connect to the server. Please try again later.');
  }
}

export default async function ViewItemsPage() {
  let items = [];
  let error = null;

  try {
    items = await getItems();
  } catch (err) {
    error = err.message;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">View Items</h1>
        </div>
        
        {error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
              <p className="font-medium">Error loading items</p>
              <p className="text-sm mt-1">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded text-sm transition"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No items found. Add some items to get started.</p>
            <Link 
              href="/add-item"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
            >
              Add New Item
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Suspense fallback={
              <div className="flex justify-center col-span-full py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            }>
              {items.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}