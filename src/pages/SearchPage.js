import React, { useState } from 'react';
import AnimalList from '../components/AnimalList';
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const SearchPage = () => {
  const location = useLocation()
  const [animals, setAnimals] = useState(location.state?.animals || false);
    return (
      <div>
        <SearchBar setAnimals={setAnimals} />
        { animals && <AnimalList animals={animals} />}
      </div>
    )
  }
  export default SearchPage