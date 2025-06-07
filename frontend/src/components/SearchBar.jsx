import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Star } from "lucide-react";
import { useState } from "react";

export default function SearchBar({setSearch, onSearchClick}) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setSearch(e.target.value); 
    
    
  };

  // const dullAdd = (e) => {
  //    try{
  //     const response = fetch('http://localhost:8080/movies/post',
  //       {
  //         method: "POST"
  //       }
  //     )
  //    }
  //    catch{

  //    }
  // }

  return (
    <div
      className="flex items-center space-x-2 p-2 bg-white rounded-full shadow-md max-w-md mx-auto"
    >
      <input
      onChange={handleChange}
        type="text"
        placeholder="Search..."
        name="search"
        className="flex-grow px-4 py-2 rounded-full focus:outline-none bg-gray-100 text-sm text-stone-700"
      />
      <button
        onClick={onSearchClick}
        className="w-10 h-10 flex items-center justify-center bg-amber-400 hover:bg-amber-500 rounded-full text-white transition-colors duration-300"
      >

        <FontAwesomeIcon icon={faSearch} className="text-base" />
      </button>
    
    </div>
  );
}
