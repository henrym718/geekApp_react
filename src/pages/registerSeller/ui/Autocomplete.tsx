import React, { useRef, useState } from "react";
import countries from "../utils/countries";
import { CircleX } from "lucide-react";
import { useEffect } from "react";

interface Props {
  onSelect: (value: string) => void;
  data: Array<string>;
  placeholder: string;
}

interface State {
  contries: Array<string>;
  textInput: string;
  activeOptionIndex: number | null;
  isVisibleOpt: boolean;
}

export default function Autocomplete({ onSelect, data, placeholder }: Props) {
  const [dataSearch, setDataSearch] = useState<State["contries"]>(data);
  const [textInput, setTextInput] = useState<State["textInput"]>("");
  const [activeOptionIndex, setActiveOptionIndex] = useState<State["activeOptionIndex"]>(null);
  const [isVisibleOpt, setIsVisibleOpt] = useState<State["isVisibleOpt"]>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const activeOptionRef = useRef<HTMLLIElement>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextInput(value);
    setDataSearch(data.filter((dt) => dt.toLowerCase().includes(value?.toLowerCase())));
    setIsVisibleOpt(true);
  };

  const handleOnMouseDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setTextInput("");
    setDataSearch(data);
    setIsVisibleOpt(true);
    setActiveOptionIndex(null);
    inputRef.current?.focus();
    onSelect("");
  };

  const handleOnClickOpt = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>,
    value: string
  ) => {
    e.preventDefault();
    setTextInput(value);
    setDataSearch(data.filter((dt) => dt.toLowerCase().includes(value.toLowerCase())));
    setIsVisibleOpt(false);
    setActiveOptionIndex(null);
    onSelect(value); // devuelvo la opt selecionada
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveOptionIndex((prevIndex) =>
        prevIndex === null || prevIndex === dataSearch.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      setActiveOptionIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0 ? dataSearch.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter" && activeOptionIndex !== null) {
      handleOnClickOpt(e, dataSearch[activeOptionIndex]);
    }
  };

  useEffect(() => {
    if (activeOptionRef.current) {
      activeOptionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeOptionIndex]);

  return (
    <div>
      <div className="relative w-full h-9 border border-black border-opacity-15 rounded-lg">
        <input
          ref={inputRef}
          onChange={handleOnChange}
          onClick={() => setIsVisibleOpt(true)}
          onBlur={() => setIsVisibleOpt(false)}
          value={textInput}
          className="h-full w-full rounded-lg pl-2"
          type="text"
          placeholder={placeholder}
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
        {isVisibleOpt && dataSearch.length ? (
          <div className="absolute top-10 rounded-md shadow-lg max-h-52 w-full border overflow-y-auto py-2 z-10 bg-white">
            <ul className="leading-8">
              {dataSearch.map((value, index) => (
                <li
                  className={`
                    ${index === activeOptionIndex ? "bg-black bg-opacity-5" : ""}                     
                    cursor-pointer px-2`}
                  onMouseDown={(e) => handleOnClickOpt(e, value)}
                  key={index}
                  onMouseEnter={() => setActiveOptionIndex(index)}
                  onMouseLeave={() => setActiveOptionIndex(null)}
                  ref={activeOptionIndex === index ? activeOptionRef : null}
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
