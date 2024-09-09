import ProgressBar from "./components/Progressbar";
import Categories from "./components/Categories";
import Skills from "./components/Skills";
import Carrer from "./components/Career";
import useFormsStore from "./store/forms";
import useDataForm from "./store/dataForm";

export default function index() {
  const { form, setForm, addStep, decreaseStep, currentStep } = useFormsStore((state) => state);
  const { selectedSubcategories, tags, career } = useDataForm((state) => state);

  const handleNextForm = () => {
    if (form === "CATEGORY") {
      addStep();
      setForm("SKILL");
    }
    if (form === "SKILL") {
      addStep();
      setForm("CARRER");
    }
  };

  const handleBackForm = () => {
    if (form === "SKILL") {
      setForm("CATEGORY");
      decreaseStep();
    }
    if (form === "CARRER") {
      setForm("SKILL");
      decreaseStep();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className=" h-8 mb-20"> header</div>
      <div className=" flex flex-grow justify-center overflow-hidden">
        {form == "CATEGORY" && <Categories handleNextForm={handleNextForm} />}
        {form == "SKILL" && <Skills />}
        {form === "CARRER" && <Carrer />}
      </div>
      <div className="space-y-5 pb-4">
        <ProgressBar steps={5} currentStep={currentStep} />
        {form == "CATEGORY" && (
          <ButtonCategories
            handleNextForm={handleNextForm}
            selectedSubcategories={selectedSubcategories}
          />
        )}
        {form == "SKILL" && (
          <ButtomSkills
            handleNextForm={handleNextForm}
            handleBackForm={handleBackForm}
            tags={tags}
          />
        )}
        {form == "CARRER" && (
          <ButtomCarrer
            handleNextForm={handleNextForm}
            handleBackForm={handleBackForm}
            career={career}
          />
        )}
      </div>
    </div>
  );
}

const ButtonCategories = ({ handleNextForm, selectedSubcategories }) => {
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

const ButtomSkills = ({ handleNextForm, handleBackForm, tags }) => {
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
          disabled={tags.length ? false : true}
          onClick={handleNextForm}
        >
          A continuación agrega tus habilidades
        </button>
      </div>
    </div>
  );
};

const ButtomCarrer = ({ handleNextForm, handleBackForm, career }) => {
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
          disabled={career.length > 4 ? false : true}
          //onClick={handleNextForm}
        >
          A continuación agrega tus habilidades
        </button>
      </div>
    </div>
  );
};
