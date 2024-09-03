import React from "react";
import { CloseOutlined } from "@ant-design/icons";

export default function Tags({ selected, max }) {
  const [tags, setTags] = React.useState([]);

  const removeTags = (indexToRemove) => {
    const values = tags.filter((_, index) => index !== indexToRemove);
    setTags(values);
    selected(values);
  };

  const addTags = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      if (max && tags.length >= max) {
        return;
      }
      const tag = event.target.value.toLowerCase();
      setTags([...tags, tag]);
      selected([...tags, tag]);
      event.target.value = "";
    }
  };

  return (
    <div className="flex flex-col items-start flex-wrap min-h-15 px-2 border border-gray-300 rounded focus-within:border-blue-500">
      <ul className="flex flex-wrap p-0 m-2">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="flex items-center justify-center w-auto h-5 p-2 text-white text-sm list-none rounded m-2 bg-blue-500"
          >
            <span className="tag-title">{tag}</span>
            <i
              className="tag-close-icon block w-4 h-4 line-h-4 text-center text-sm ml-2 text-blue-500 border rounded-full bg-white cursor-pointer"
              onClick={() => removeTags(index)}
            >
              <CloseOutlined />
            </i>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder={
          max
            ? tags.length === max
              ? `Alcanzo el maximo de tags`
              : "Presione Enter para agregar un tag"
            : "Presione Enter para agregar un tag"
        }
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
        className=" w-full border-none h-10 text-sm focus:outline-none"
      />
    </div>
  );
}
