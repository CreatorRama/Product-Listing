// app/view-items/[id]/page.tsx
import ItemModal from '@/components/ItemModal';
import { getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { convertDocToPlainObject } from '@/lib/mongoUtils';

async function getItem(id: string) {
  const db = await getDb();
  const doc = await db.collection('items').findOne({ _id: new ObjectId(id) });
  
  // Convert MongoDB document to plain object (including _id conversion)
  return convertDocToPlainObject(doc);
}

export default async function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = await getItem(params.id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Item not found</p>
      </div>
    );
  }

  return <ItemModal item={item} />;
}