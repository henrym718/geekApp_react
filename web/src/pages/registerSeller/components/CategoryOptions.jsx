import registerSellerService from "./../services/registerSellerService";
import request from "../utils/request";
import useDataForm from "../store/dataForm";

export default function CategoryOptions({ handleChangeForm }) {
  const {
    subCategories,
    setListCategories,
    selectedSubcategories,
    setSelectedSubcategory,
    updateSelectedSubcategory,
    clearSelectedSubCategories,
    setSelectedCategory,
    selectedCategory,
  } = useDataForm((state) => state);

  const handleForm = () => {
    handleChangeForm();
  };

  const handleOnClickCategory = async (id) => {
    const data = await registerSellerService.getAllSubcategories(id);
    setSelectedCategory(id);
    setListCategories(data);
    clearSelectedSubCategories();
  };

  const handleOnChangeSubCategory = (id, isChecked) => {
    isChecked
      ? setSelectedSubcategory(id)
      : updateSelectedSubcategory(
          selectedSubcategories.filter((subCategory) => subCategory !== id)
        );
  };

  return (
    <div className="flex flex-col h-full pb-5 justify-between">
      <div className="flex flex-col h-3/4 w-3/4 overflow-y-auto mx-16">
        <div className="border-b-2 border-gray-300 w-11/12 pb-4">
          <p className="pb-5 text-base font-semibold"> 1/5</p>
          <h2 className="text-[40px] text-color3 font-semibold pb-3">
            Genial, entonces que tipo de trabajo vas a ofrecer <br />
            <h2 className="-mt-4">a tus clientes?</h2>
          </h2>
          <p>
            No te preocupes, puedes crear diferente perfiles para otras habilidades, este será el
            principal.
          </p>
        </div>
        <div className="flex pt-5">
          <div className="flex flex-col">
            <p className="pb-4 text-sm text-color4">Selecciona 1 categoría</p>
            {Object.entries(request).map(([key, { title, id }]) => (
              <h2
                key={key}
                onClick={() => handleOnClickCategory(id)}
                className={`cursor-pointer text-base text-color1 font-medium tracking-wider py-2 ${
                  selectedCategory === id ? "text-green-600" : "text-color1"
                }`}
              >
                {title}
              </h2>
            ))}
          </div>
          <div className="border-r-2 ml-20 mr-10 border-gray-300"></div>
          <div className="flex flex-col">
            {selectedCategory && (
              <p className="pb-4 text-sm text-color4">Ahora, selecciona de 1 a 3 especialidades</p>
            )}
            {subCategories.map(({ _id, name }) => (
              <CheckItem
                key={_id}
                id={_id}
                name={name}
                onChange={handleOnChangeSubCategory}
                isActive={
                  (selectedSubcategories.length === 3) & !selectedSubcategories.includes(_id)
                    ? true
                    : false
                }
                isChecked={selectedSubcategories.includes(_id) ? true : false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const CheckItem = ({ id, name, onChange, isActive, isChecked }) => {
  const handleChange = (event) => onChange(id, event.target.checked);

  return (
    <label className="flex items-center space-x-2">
      <input
        onChange={handleChange}
        type="checkbox"
        checked={isChecked}
        disabled={isActive}
        className="h-6 w-6"
      />
      <p className="text-base text-color1 font-medium tracking-wide py-2">{name}</p>
    </label>
  );
};
