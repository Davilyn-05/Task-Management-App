export default function Navbar({ onSearch, searchTerm = "" }) {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="mx-auto px-2.5 py-1.5">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h1 className="text-base font-bold">Task Management App</h1>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-2.5 pr-8 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-900 placeholder-gray-500 text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => onSearch("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
