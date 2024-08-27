"use client";

import { useSearchContext } from "@/lib/hooks";
import { use } from "react";

export default function SearchForm() {
  const { searchQuery, handleSearchQueryChange } = useSearchContext();
  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50"
        type="search"
        placeholder="Search pets"
        onChange={
          (event) => handleSearchQueryChange(event.target.value)
        }
        value={searchQuery}
      />
    </form>
  );
}
