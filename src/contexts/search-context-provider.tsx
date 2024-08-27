"use client";
import { createContext, useState } from "react";

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type TSearchContext = {
  searchQuery: string;
  handleSearchQueryChange: (newValue: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  //state
  const [searchQuery, setSearchQuery] = useState<string>("");
  //derived state

  //handlers
  const handleSearchQueryChange = (newValue: string) => {
    setSearchQuery(newValue);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleSearchQueryChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
