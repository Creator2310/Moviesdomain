// src/components/Filters.jsx (Updated to accept genreNames)
export default function Filters({ filters, setFilters, genreNames = [] }){
  
  // Generate a list of recent years (2025 down to 2020)
  const currentYear = new Date().getFullYear() + 1; // Start one year ahead for future releases
  const years = Array.from({ length: 6 }, (_, i) => (currentYear - i).toString());

  return (
    // 1. Add 'space-y-4' for better vertical spacing
    <div className="bg-white p-4 rounded-lg border space-y-4">
      <div> {/* 2. Wrap label/select in a div */}
        <label htmlFor="genre-select" className="block mb-2 text-sm font-medium">Genre</label>
        <select 
          id="genre-select"
          value={filters.genre} 
          onChange={e=>setFilters(f=>({...f, genre: e.target.value}))}
          // 3. Add focus ring styles for better accessibility
          className="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All</option>
          {/* Dynamically rendered genre options */}
          {genreNames.map(genre => (
             <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div> {/* 2. Wrap label/select in a div */}
        <label htmlFor="year-select" className="block mb-2 text-sm font-medium">Year</label>
        <select 
          id="year-select"
          value={filters.year} 
          onChange={e=>setFilters(f=>({...f, year: e.target.value}))}
          // 3. Add focus ring styles
          className="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All</option>
          {/* Dynamically rendered year options */}
          {years.map(year => (
             <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
}