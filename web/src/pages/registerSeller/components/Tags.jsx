import { useEffect, useState, useRef } from "react";
import useDataForm from "../store/dataForm";
import { CircleX, X } from "lucide-react";

export default function Tags({ selected, max }) {
  const [tags, setTags] = useState([]);
  const [indexSelectedOption, setIndexSelectedOption] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [isVisisbleOptions, setIsVisisbleOptions] = useState(false);
  const [leakedSkills, setLeakedSkills] = useState([]);
  const containerRef = useRef(null);
  const optionsRef = useRef(null);

  const { skills, updateSkills } = useDataForm((state) => state);

  // const removeTags = (indexToRemove) => {
  //   const values = tags.filter((_, index) => index !== indexToRemove);
  //   setTags(values);
  //   selected(values);
  // };

  // const addTags = (event) => {
  //   if (event.key === "Enter" && event.target.value.trim() !== "") {
  //     if (max && tags.length >= max) {
  //       return;
  //     }
  //     const tag = event.target.value.toLowerCase();
  //     setTags([...tags, tag]);
  //     selected([...tags, tag]);
  //     event.target.value = "";
  //   }
  // };

  const handleOnchangeInput = (text) => {
    setTextInput(text);
    setIsVisisbleOptions(text.trim().length ? true : false);
    setLeakedSkills(skills.filter((skill) => skill.toLowerCase().includes(text.toLowerCase())));
    setIndexSelectedOption(null);
  };

  const handleOnKeyDownInput = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIndexSelectedOption((index) => (index === null ? 0 : index + 1));
      if (indexSelectedOption === leakedSkills.length) {
        setIndexSelectedOption(0);
      }
    }

    if (event.key == "ArrowUp") {
      event.preventDefault();
      setIndexSelectedOption((index) => (index === null ? 0 : index - 1));
      if (indexSelectedOption === -1) {
        setIndexSelectedOption(leakedSkills.length - 1);
      }
    }

    if (event.key === "Enter") {
      if (indexSelectedOption !== null) {
        setTags((prev) => [...prev, leakedSkills[indexSelectedOption]]);
        updateSkills(leakedSkills[indexSelectedOption]);
        setTextInput("");
        setIsVisisbleOptions(false);
        setIndexSelectedOption(null);
      }
    }

    if (event.key === "Escape") {
      setIsVisisbleOptions(false);
    }
  };

  const onClickOptionSelected = (e, index) => {
    e.preventDefault();
    setTags((prev) => [...prev, leakedSkills[index]]);
    updateSkills(leakedSkills[index]);
    setIsVisisbleOptions(false);
    setTextInput("");
  };

  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setTextInput("");
      setIsVisisbleOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col" ref={containerRef}>
      <div className="flex flex-col items-start flex-wrap min-h-15 px-2 border border-gray-300 rounded-xl focus-within:border-black focus-within:border-opacity-50 focus-within:border-2">
        <ListTags tags={tags} />
        <Input
          onchange={handleOnchangeInput}
          onKeyDown={handleOnKeyDownInput}
          value={textInput}
          setValue={setTextInput}
        />
      </div>
      {isVisisbleOptions && leakedSkills.length ? (
        <Options
          options={leakedSkills}
          indexSelected={indexSelectedOption}
          optionsRef={optionsRef}
          setIndexSelected={setIndexSelectedOption}
          onClick={onClickOptionSelected}
        />
      ) : null}
    </div>
  );
}

const ListTags = ({ tags = [] }) => {
  return (
    <ul className="flex flex-wrap pt-2">
      {tags.map((tag, index) => (
        <li
          key={index}
          className="flex items-center justify-between h-6 border-2 border-slate-800 rounded-xl list-none m-1"
        >
          <p className=" text-color3 pl-2">{tag}</p>
          <i
            className="cursor-pointer mr-1"
            //onClick={() => removeTags(index)}
          >
            <X className="h-4" />
          </i>
        </li>
      ))}
    </ul>
  );
};

const Input = ({ onchange, onKeyDown, value, setValue }) => {
  const [isfocusInput, setIsfocusInput] = useState(false);

  const clearInput = (e) => {
    e.preventDefault();
    setValue("");
  };

  return (
    <div className="w-full relative">
      <input
        type="text"
        onKeyDown={onKeyDown}
        onChange={(e) => onchange(e.target.value)}
        value={value}
        onFocus={() => setIsfocusInput(true)}
        onBlur={() => setIsfocusInput(false)}
        className="w-full rounded-xl focus-within:border-black focus-within:border-2 h-8 text-sm focus:outline-none pl-2"
      />
      {isfocusInput && value ? (
        <button
          onMouseDown={clearInput}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
        >
          <CircleX />
        </button>
      ) : null}{" "}
    </div>
  );
};

const Options = ({ options, setIndexSelected, indexSelected, optionsRef, onClick }) => {
  const activeOptionRef = useRef(null);

  useEffect(() => {
    if (activeOptionRef.current) {
      activeOptionRef.current.scrollIntoView({
        behavior: "smooth", // opcional: hace que el scroll sea suave
        block: "nearest", // ajusta para que el elemento sea visible, el valor puede ser 'start', 'center', 'end' o 'nearest'
      });
    }
  }, [indexSelected]);

  return (
    <ul
      ref={optionsRef}
      className="mt-1 mx-2 w-2/5 border-[1px] rounded-lg text-black list-none shadow-sm overflow-y-auto max-h-[200px]"
    >
      {options.map((opt, index) => (
        <li
          ref={index === indexSelected ? activeOptionRef : null}
          className={` ${index === indexSelected && "bg-gray-100"} my-2 cursor-pointer`}
          key={index}
          onMouseEnter={() => setIndexSelected(index)}
          onMouseLeave={() => setIndexSelected(null)}
          onMouseDown={(e) => onClick(e, index)}
        >
          {opt}
        </li>
      ))}
    </ul>
  );
};
