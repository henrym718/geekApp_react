import { useState } from "react";
import request from "../utils/request";

export default function CategoryOptions() {
  const [subCategories, setSubCategories] = useState([]);
  const [selectSubcategories, setSelectSubcategories] = useState([]);

  const handleOnClickCategory = (id) => {
    setSubCategories([
      { id: "1231", name: "categoria 1" },
      { id: "455", name: "categoria 2" },
      { id: "454", name: "categoria 3" },
      { id: "99", name: "categoria 4" },
      { id: "88", name: "categoria 5" },
    ]);
  };

  const handleOnChangeSubCategory = (id, isChecked) => {
    isChecked
      ? setSelectSubcategories((prev) => [...prev, id])
      : setSelectSubcategories((prev) => prev.filter((value) => value !== id));
  };
  console.log(selectSubcategories);

  return (
    <div>
      <span>1/5</span>
      <h2>Genial, entonces, ¿Qué tipo de trabajos ofrecerás a tus clientes?</h2>
      <p>No te preocupes, puedes cambiar estas opciones más adelante.</p>
      <span>---------</span>
      <div className="flex">
        <div className="flex flex-col">
          <p>Selecciona 1 categoría</p>
          {Object.entries(request).map(([key, { title, id }]) => (
            <h2 key={key} onClick={() => handleOnClickCategory(id)} className="cursor-pointer">
              {title}
            </h2>
          ))}
        </div>
        <div className="flex flex-col">
          <p>Selecciona 1 subcategoría</p>
          {subCategories.map(({ id, name }) => (
            <CheckItem key={id} id={id} name={name} onChange={handleOnChangeSubCategory} />
          ))}
        </div>
      </div>
    </div>
  );
}

const CheckItem = ({ id, name, onChange }) => {
  const handleChange = (event) => {
    onChange(id, event.target.checked);
  };

  return (
    <label className="flex items-center space-x-2">
      <input onChange={handleChange} type="checkbox" className="h-5 w-5" />
      <p>{name}</p>
    </label>
  );
};
