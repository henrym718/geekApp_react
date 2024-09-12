import React, { useRef, useState } from "react";
import countries from "../pages/registerSeller/utils/countries";
import { CircleX } from "lucide-react";

export default function Autocomplete() {
  const [textInput, setTextInput] = useState("");
  const [isVisibleOpt, setIsVisibleOpt] = useState(false);
  const [countriesSearch, setCountriesSearch] = useState(countries);
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
    inputRef.current.focus();
  };

  const handleOnClickOpt = (e, countryopt) => {
    e.preventDefault();
    setTextInput(countryopt);
    setCountriesSearch(
      countries.filter((country) => country.toLowerCase().includes(countryopt.toLowerCase()))
    );
    setIsVisibleOpt(false);
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
          <div className="absolute top-10 rounded-md shadow-lg max-h-56 w-full py-2 px-3 border overflow-y-auto ">
            <ul>
              {countriesSearch.map((country, index) => (
                <li
                  onMouseDown={(e) => handleOnClickOpt(e, country)}
                  className="cursor-pointer"
                  key={index}
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
