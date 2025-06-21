import ItemCard from '@/components/ItemCard';
import Link from 'next/link';
import { Suspense } from 'react';
import { getDb } from '@/lib/db';
import { convertDocToPlainObject } from '@/lib/mongoUtils';

// Add dynamic export to prevent static generation
export const dynamic = 'force-dynamic';

async function getItems() {
  try {
    // Fetch directly from database instead of API route to avoid dynamic server usage
    const db = await getDb();
    const docs = await db.collection('items').find({}).toArray();
    return docs.map(convertDocToPlainObject);
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
}

// Create a client component for the error state with retry button
function ErrorDisplay({ error }: { error: string }) {
  return (
    <div className="text-center py-12">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
        <p className="font-medium">Error loading items</p>
        <p className="text-sm mt-1">{error}</p>
        <Link 
          href="/view-items"
          className="mt-3 inline-block px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded text-sm transition"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}

export default async function ViewItemsPage() {
  let items = [];
  let error = null;

  try {
    items = await getItems();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred';
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">View Items</h1>
        </div>
        
        {error ? (
          <ErrorDisplay error={error} />
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