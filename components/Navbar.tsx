import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                <h1 className="text-xl font-bold text-gray-800">AMRR TechSols</h1>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/view-items"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              View Items
            </Link>
            <Link
              href="/add-item"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Add Item
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}