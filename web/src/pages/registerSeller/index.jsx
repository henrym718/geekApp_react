import React from "react";
import CategoryOptions from "./components/CategoryOptions";
import useFormsStore from "./store/forms";

export default function index() {
  const { form } = useFormsStore((state) => state);
  return (
    <div className="flex flex-col h-screen">
      <div className=" h-8  mb-20"> header</div>
      <div className=" flex-grow overflow-hidden">
        {form == "CATEGORY" && <CategoryOptions />}
        {form == "SKILL" && <h1>SKILL</h1>}
      </div>
    </div>
  );
}
