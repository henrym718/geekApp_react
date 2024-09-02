import React from "react";
import CategoryOptions from "./components/CategoryOptions";
import useFormsStore from "./store/forms";
import SkillOptions from "./components/SkillOptions";
import ProgressBar from "./components/Progressbar";
import useDataForm from "./store/dataForm";

export default function index() {
  const { form, setForm, addStep, decreaseStep, currentStep } = useFormsStore((state) => state);
  const { selectedSubcategories } = useDataForm((state) => state);

  const handleNextForm = () => {
    if (form == "CATEGORY") {
      setForm("SKILL");
      addStep();
    }
  };

  const handleBackForm = () => {
    if (form == "SKILL") {
      setForm("CATEGORY");
      decreaseStep();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className=" h-8  mb-20"> header</div>
      <div className=" flex-grow overflow-hidden">
        {form == "CATEGORY" && <CategoryOptions handleNextForm={handleNextForm} />}
        {form == "SKILL" && <SkillOptions />}
      </div>
      <div className="space-y-5 pb-4">
        <ProgressBar steps={5} currentStep={currentStep} />
        {form == "CATEGORY" && (
          <ButtonCategoryOptions
            handleNextForm={handleNextForm}
            selectedSubcategories={selectedSubcategories}
          />
        )}
        {form == "SKILL" && <ButtomSkillOptions handleBackForm={handleBackForm} />}
      </div>
    </div>
  );
}

const ButtonCategoryOptions = ({ handleNextForm, selectedSubcategories }) => {
  return (
    <div className=" flex flex-col justify-center space-y-8">
      <div className="flex justify-end mx-8">
        <button
          className="h-12 bg-green-700 text-white rounded-xl px-6 text-lg  font-medium disabled:cursor-default disabled:bg-gray-100 disabled:text-gray-400"
          disabled={selectedSubcategories.length ? false : true}
          onClick={handleNextForm}
        >
          A continuación agrega tus habilidades
        </button>
      </div>
    </div>
  );
};

const ButtomSkillOptions = ({ handleBackForm }) => {
  return (
    <div className=" flex flex-col justify-center space-y-8">
      <div className="flex justify-between mx-8">
        <button
          className="h-12  text-color3 rounded-xl border border-color3 px-6 text-lg  font-medium disabled:cursor-default disabled:bg-gray-100 disabled:text-gray-400"
          onClick={handleBackForm}
        >
          Volver
        </button>
        <button
          className="h-12 bg-green-700 text-white rounded-xl px-6 text-lg  font-medium disabled:cursor-default disabled:bg-gray-100 disabled:text-gray-400"
          //disabled={selectedSubcategories.length ? false : true}
          //onClick={handleNextForm}
        >
          A continuación agrega tus habilidades
        </button>
      </div>
    </div>
  );
};
