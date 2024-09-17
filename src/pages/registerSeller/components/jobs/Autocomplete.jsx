import React, { useRef, useState } from "react";
import countries from "../../utils/countries";
import { CircleX } from "lucide-react";
import { useEffect } from "react";

export default function Autocomplete() {
  const [countriesSearch, setCountriesSearch] = useState(countries);
  const [textInput, setTextInput] = useState("");
  const [isVisibleOpt, setIsVisibleOpt] = useState(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState(null);

  const inputRef = useRef();
  const activeOptionRef = useRef();

  const handleOnChange = (e) => {
    const value = e.target.value;
    setTextInput(value);
    setCountriesSearch(
      countries.filter((countrie) => countrie.toLowerCase().includes(value?.toLowerCase()))
    );
    setIsVisibleOpt(true);
  };

  const handleOnMouseDown = (e) => {
    e.preventDefault();
    setTextInput("");
    setCountriesSearch(countries);
    setIsVisibleOpt(true);
    setActiveOptionIndex(null);
    inputRef.current.focus();
  };

  const handleOnClickOpt = (e, countryopt) => {
    e.preventDefault();
    setTextInput(countryopt);
    setCountriesSearch(
      countries.filter((country) => country.toLowerCase().includes(countryopt.toLowerCase()))
    );
    setIsVisibleOpt(false);
    setActiveOptionIndex(null);
  };

  const handleOnKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setActiveOptionIndex((prevIndex) =>
        prevIndex === null || prevIndex === countriesSearch.length - 1 ? 0 : prevIndex + 1
      );
    } else if (event.key === "ArrowUp") {
      setActiveOptionIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0 ? countriesSearch.length - 1 : prevIndex - 1
      );
    } else if (event.key === "Enter" && activeOptionIndex !== null) {
      setIsVisibleOpt(false);
      setActiveOptionIndex(null);
      setTextInput(countriesSearch[activeOptionIndex]);
      setCountriesSearch(
        countries.filter((country) =>
          country.toLowerCase().includes(countriesSearch[activeOptionIndex].toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    if (activeOptionRef.current) {
      activeOptionRef.current.scrollIntoView({
        behevior: "smooth",
        block: "nearest",
      });
    }
  }, [activeOptionIndex]);

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
          <div className="absolute top-10 rounded-md shadow-lg max-h-56 w-full border overflow-y-auto py-2 z-10 bg-white">
            <ul className="leading-8">
              {countriesSearch.map((country, index) => (
                <li
                  className={`
                    ${
                      index === activeOptionIndex ? "bg-black bg-opacity-5" : ""
                    }                     
                    cursor-pointer px-2`}
                  onMouseDown={(e) => handleOnClickOpt(e, country)}
                  key={index}
                  onMouseEnter={() => setActiveOptionIndex(index)}
                  onMouseLeave={() => setActiveOptionIndex(null)}
                  ref={activeOptionIndex === index ? activeOptionRef : null}
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
