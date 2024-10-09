"use client";

import { useState } from "react";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = ()=>{
        console.log(searchQuery);
        setSearchQuery("");
    }

  return (
    <div className="flex items-center border border-gray-300 rounded-lg p-2">
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow p-2 border-none outline-none"
        value={searchQuery}
        onChange={(e)=>setSearchQuery(e.target.value)}
        onKeyDown={(e)=>e.key=='Enter' && handleSearch()}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-400 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
