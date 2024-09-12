import React, { useRef, useState } from "react";
import countries from "../pages/registerSeller/utils/countries";
import { CircleX } from "lucide-react";

export default function Autocomplete() {
  const [textInput, setTextInput] = useState("");
  const [isVisibleOpt, setIsVisibleOpt] = useState(false);
  const [countriesSearch, setCountriesSearch] = useState(countries);
  const [hoveredOptionIndex, setHoveredOptionIndex] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const inputRef = useRef();

  const handleOnChange = (e) => {
    setTextInput(e.target.value);
    setCountriesSearch(
      countries.filter((countrie) =>
        countrie.toLowerCase().includes(e?.target?.value?.toLowerCase())
      )
    );
  };

  const handleOnMouseDown = (e) => {
    e.preventDefault();
    setTextInput("");
    setCountriesSearch(countries);
    setIsVisibleOpt(true);
    setHoveredOptionIndex(null);
    setSelectedOptionIndex(null);
    inputRef.current.focus();
  };

  const handleOnClickOpt = (e, countryopt) => {
    e.preventDefault();
    setTextInput(countryopt);
    setCountriesSearch(
      countries.filter((country) => country.toLowerCase().includes(countryopt.toLowerCase()))
    );
    setIsVisibleOpt(false);
    setHoveredOptionIndex(null);
    setSelectedOptionIndex(null);
  };

  const handleOnKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setSelectedOptionIndex((prevIndex) => (prevIndex === null ? 0 : prevIndex + 1));
    } else if (event.key === "ArrowUp") {
      setSelectedOptionIndex((prevIndex) => (prevIndex === null ? 0 : prevIndex - 1));
    }
  };

  return (
    <div>
      <div className="relative  w-full h-9 border border-black border-opacity-15 rounded-lg">
        <input
          ref={inputRef}
          onChange={handleOnChange}
          onClick={() => setIsVisibleOpt(true)}
          onBlur={() => setIsVisibleOpt(false)}
          value={textInput}
          className="h-full w-full rounded-lg pl-2"
          type="text"
          placeholder="Ex: Ecuador"
          onKeyDown={handleOnKeyDown}
        />
        {textInput.trim().length ? (
          <button
            onMouseDown={handleOnMouseDown}
            className="absolute right-0 top-[45%] transform -translate-y-1/2 px-3 py-1 rounded-lg h-7"
          >
            <CircleX />
          </button>
        ) : null}
        {isVisibleOpt && countriesSearch.length ? (
          <div className="absolute top-10 rounded-md shadow-lg max-h-56 w-full border overflow-y-auto py-2 ">
            <ul className="leading-8">
              {countriesSearch.map((country, index) => (
                <li
                  className={`
                    ${index === hoveredOptionIndex ? "bg-black bg-opacity-5" : null} 
                    ${index === selectedOptionIndex ? "bg-black bg-opacity-5" : null} 
                    cursor-pointer px-2`}
                  onMouseDown={(e) => handleOnClickOpt(e, country)}
                  key={index}
                  onMouseEnter={() => setHoveredOptionIndex(index)}
                  onMouseLeave={() => setHoveredOptionIndex(null)}
                >
                  {country}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
