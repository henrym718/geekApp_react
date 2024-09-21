import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Check } from "lucide-react";

function ButtonList({ values, name, disabled, onSelected }) {
  const [data, setData] = useState(values);
  const [isVisibleOpt, setIsVisibleOpt] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [activeOptionIndex, setActiveOptionIndex] = useState(null);

  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const activeOptrRef = useRef(null);

  const handleOnChange = (e) => {
    let input = e.target.value;
    setData(values.filter((value) => value.toLowerCase().includes(input.toLowerCase())));
    setActiveOptionIndex(null);
  };

  const handleOnClickItem = (index) => {
    setSelectedItem(data[index]);
    setIsVisibleOpt(false);
    setData(values);
    setActiveOptionIndex(null);
    onSelected(data[index]);
  };

  const handleOnClickButton = () => {
    setIsVisibleOpt((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsVisibleOpt(false);
    }
  };

  const handleOnKeyDown = (event) => {
    const key = event.key;
    if (key == "ArrowDown") {
      setActiveOptionIndex((prevIndex) =>
        prevIndex === null || prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    } else if (key === "ArrowUp") {
      event.preventDefault();
      setActiveOptionIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0 ? data.length - 1 : prevIndex - 1
      );
    } else if (key === "Enter" && activeOptionIndex != null) {
      handleOnClickItem(activeOptionIndex);
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
  }, [handleClickOutside]);

  useEffect(() => {
    if (activeOptrRef.current) {
      activeOptrRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeOptionIndex]);

  useEffect(() => {
    setData(values);
    setSelectedItem("");
    onSelected("");
  }, [values, disabled]);

  return (
    <div ref={containerRef} className="flex flex-col relative w-full h-full">
      <div
        onClick={handleOnClickButton}
        className="flex active:scale-90 transition-transform duration-200 ease-out"
      >
        <button
          disabled={disabled}
          className="w-full h-9 border rounded-lg text-start pl-4 text-sm disabled:bg-black disabled:bg-opacity-10"
        >
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
              onKeyDown={handleOnKeyDown}
            />
            <Search
              className="absolute top-1/2 left-2 -translate-y-1/2 text-black"
              strokeWidth={1}
              size={20}
            />
          </div>
          <ul className="relative max-h-56 pb-2 overflow-y-auto">
            {data.length ? (
              data.map((value, index) => (
                <li
                  className={`pl-5 text-sm leading-8 cursor-pointer
                    ${index === activeOptionIndex ? "bg-black bg-opacity-5" : ""}
                    `}
                  onClick={() => handleOnClickItem(index)}
                  onMouseEnter={() => setActiveOptionIndex(index)}
                  onMouseLeave={() => setActiveOptionIndex(null)}
                  key={index}
                  ref={activeOptionIndex === index ? activeOptrRef : null}
                >
                  <div className="flex items-center gap-1">
                    <i className={`${selectedItem === value ? "visible" : "invisible"}`}>
                      <Check size={15} strokeWidth={2} />
                    </i>

                    {value}
                  </div>
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
