import ItemModal from '@/components/ItemModal';
import { getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { convertDocToPlainObject } from '@/lib/mongoUtils';

async function getItem(id: string) {
  const db = await getDb();
  const doc = await db.collection('items').findOne({ _id: new ObjectId(id) });
  
  if (!doc) return null;
  return convertDocToPlainObject(doc);
}

export default async function ItemDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params promise to get the actual parameters
  const { id } = await params;
  const item = await getItem(id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Item not found</p>
      </div>
    );
  }

  return <ItemModal item={item} />;
}