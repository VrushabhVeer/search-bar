import { useCallback, useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./Component/SearchBar";
import countries from "./utils/countries";

function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const queryHandler = useCallback((val) => {
    console.log("The query is", val);
    setQuery(val);
  }, []);

  useEffect(() => {
    if (query === "") {
      setSuggestions([]);
    } else {
      let newCountriesSuggestions = countries
        .filter((item) => {
          return item.country.toLowerCase().indexOf(query) !== -1
            ? true
            : false;
        })
        .map((item) => item.country);
      setSuggestions(newCountriesSuggestions);
    }
  }, [query]);

  
  return (
    <div className="App">
      <h2>Search Bar PSC</h2>
      <h4>The Search query is "{query}"</h4>
      <SearchBar inputQueryHandler={queryHandler} suggestions={suggestions} />
    </div>
  );
}

export default App;