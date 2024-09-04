import { useState } from "react";
import useDataForm from "../store/dataForm";
import { CloseOutlined } from "@ant-design/icons";

export default function Tags({ selected, max }) {
  const [tags, setTags] = useState([]);
  const [indexSelectedOption, setIndexSelectedOption] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [leakedSkills, setLeakedSkills] = useState([]);

  const { skills } = useDataForm((state) => state);

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
  console.log(tags);

  const handleOnchangeInput = (text) => {
    setTextInput(text);
    setLeakedSkills(skills.filter((skill) => skill.toLowerCase().includes(text.toLowerCase())));
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
      setTags((prev) => [...prev, leakedSkills[indexSelectedOption]]);
    }

    if (event.key === "Escape") {
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-start flex-wrap min-h-15 px-2 border border-gray-300 rounded focus-within:border-blue-500">
        <ListTags tags={tags} />
        <Input onchange={handleOnchangeInput} onKeyDown={handleOnKeyDownInput} />
      </div>
      {textInput ? <Options options={leakedSkills} indexSelected={indexSelectedOption} /> : null}
    </div>
  );
}

const ListTags = ({ tags = [] }) => {
  return (
    <ul className="flex flex-wrap p-0 m-2">
      {tags.map((tag, index) => (
        <li
          key={index}
          className="flex items-center justify-center w-auto h-5 p-2 text-white text-sm list-none rounded m-2 bg-blue-500"
        >
          <span className="tag-title">{tag}</span>
          <i
            className="tag-close-icon block w-4 h-4 line-h-4 text-center text-sm ml-2 text-blue-500 border rounded-full bg-white cursor-pointer"
            //onClick={() => removeTags(index)}
          >
            <CloseOutlined />
          </i>
        </li>
      ))}
    </ul>
  );
};

const Input = ({ onchange, onKeyDown }) => {
  return (
    <input
      type="text"
      onKeyDown={onKeyDown}
      onChange={(e) => onchange(e.target.value)}
      className=" w-full border-none h-10 text-sm focus:outline-none"
    />
  );
};

const Options = ({ options, indexSelected }) => {
  return (
    <ul className="top-16 mx-2 w-1/2 bg-[#fcfcfd] rounded-xl text-black  list-none shadow-sm">
      {options.map((opt, index) => (
        <li className={` ${index === indexSelected && "bg-[#e1e3e5]"}`} key={index}>
          {opt}
        </li>
      ))}
    </ul>
  );
};
