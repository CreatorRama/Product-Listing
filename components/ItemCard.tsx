'use client'

import Image from 'next/image';
import Link from 'next/link';

interface Item {
  _id: string;
  name?: string;
  type?: string;
  coverImage?: string;
}


export default function ItemCard({ item }:{item:Item}) {
  return (
    <Link href={`/view-items/${item._id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
        <div className="relative h-48 w-full">
          {item.coverImage ? (
            <Image
              src={item.coverImage}
              alt={item.name || 'Item image'}
              fill
              className="object-cover"
              loader={({ src, width, quality }) => {
                return `${src}?w=${width}&q=${quality || 75}`;
              }}
            />
          ) : (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {item.name || 'Untitled Item'}
          </h3>
          <p className="text-sm text-gray-500">{item.type || 'No type specified'}</p>
        </div>
      </div>
    </Link>
  );
}