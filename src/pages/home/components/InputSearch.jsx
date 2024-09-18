import { useState } from "react";
import { AutoComplete, Input } from "antd";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import homeService from "../services/homeService.js";

export default function InputSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState();

  const { data } = useQuery(["tags", query], () => homeService.getOptionesSearch(query), {
    enabled: !!query,
  });
  const onChange = (value) => setQuery(value);

  const onKeyUp = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      navigate(`/products?search=${query}`);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <AutoComplete
        className="w-[500px]"
        options={data || []}
        onChange={onChange}
        onKeyUp={onKeyUp}
      >
        <Input.Search size="large" placeholder="input here" enterButton />
      </AutoComplete>
    </div>
  );
}
