import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { ChevronDown } from "lucide-react";

function ButtonList({ values, name }) {
  const [data, setData] = useState(values);
  const [isVisibleOpt, setIsVisibleOpt] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [activeOptionIndex, setActiveOptionIndex] = useState(null);

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const handleOnChange = (e) => {
    let input = e.target.value;
    setData(values.filter((value) => value.toLowerCase().includes(input.toLowerCase())));
  };

  const handleOnClickItem = (item) => {
    setSelectedItem(item);
    setIsVisibleOpt(false);
    setData(values);
  };

  const handleOnClickButton = () => {
    setIsVisibleOpt((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsVisibleOpt(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisibleOpt]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col relative w-full h-full">
      <div
        onClick={handleOnClickButton}
        className="flex active:scale-90 transition-transform duration-200 ease-out"
      >
        <button className="w-full h-9 border rounded-lg text-start pl-4 text-sm ">
          {selectedItem || name}
        </button>
        <ChevronDown
          className="absolute top-1/2 right-4 -translate-y-1/2 text-black"
          strokeWidth={1}
          size={25}
        />
      </div>
      {isVisibleOpt ? (
        <div className="flex flex-col space-y-2 bg-white border z-20 shadow-md  transition-all duration-300 ease-out mt-1 ">
          <div className="flex relative border rounded-3xl h-7 mx-3 overflow-hidden mt-3">
            <input
              className="pl-8 w-full h-full rounded-3xl text-sm"
              type="text"
              onChange={handleOnChange}
              ref={inputRef}
            />
            <Search
              className="absolute top-1/2 left-2 -translate-y-1/2 text-black"
              strokeWidth={1}
              size={20}
            />
          </div>
          <ul className="relative max-h-64 pb-2 overflow-y-auto">
            {data.length ? (
              data.map((value, index) => (
                <li
                  className={`pl-5 text-sm leading-8 cursor-pointer
                    ${value === activeOptionIndex ? "bg-black bg-opacity-5" : ""}
                    `}
                  onClick={() => handleOnClickItem(value)}
                  onMouseEnter={() => setActiveOptionIndex(value)}
                  onMouseLeave={() => setActiveOptionIndex(null)}
                  key={index}
                >
                  {value}
                </li>
              ))
            ) : (
              <li className=" text-center text-sm py-2">No hay resultados</li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default ButtonList;
