import ProgressBar from "./Progressbar";
import { Button } from "../../../../ui";
import useFormsStore from "../../store/forms";
import useDataForm from "../../store/dataForm";

interface IndexProps {
  form: string;
  steps: number;
  nameFirstButton: string;
}

export default function index({ form, steps }: IndexProps) {
  // Obtener los datos de subcategorías seleccionadas, etiquetas y carrera desde el store
  const { selectedSubcategories, tags, career } = useDataForm((state) => state);
  const { setForm, addStep, decreaseStep, currentStep } = useFormsStore((state) => state);

  // Función para determinar si el botón "Siguiente" debe estar deshabilitado
  const isDisableNextButton = (): boolean => {
    switch (form) {
      case "CATEGORY":
        return selectedSubcategories.length === 0; // Deshabilitar si no hay subcategorías seleccionadas
      case "SKILL":
        return tags.length === 0; // Deshabilitar si no hay etiquetas
      case "CAREER":
        return career.length <= 3; // Deshabilitar si la carrera tiene menos de 4 caracteres
      default:
        return false;
    }
  };

  // Función para manejar el clic en el botón "Siguiente" y avanzar al siguiente formulario
  const handleOnClickNextButton = () => {
    const formFlow: Record<string, string> = {
      CATEGORY: "SKILL",
      SKILL: "CAREER",
      CAREER: "EXPERIENCE",
      EXPERIENCE: "EDUCATION",
    };
    const nextForm = formFlow[form];
    if (nextForm) {
      setForm(nextForm); // Avanza al siguiente paso en el flujo del formulario
      addStep(); // Aumenta el paso actual
    }
  };

  // Función que devuelve la etiqueta dinámica para el botón "Siguiente"
  const getNextButtonLabel = () => {
    const nameForm: Record<string, string> = {
      CATEGORY: "A continuación agrega tus habilidades",
      SKILL: "A continuación agrega tu profesión",
      CAREER: "A continuación agrega tu experiencia",
      EXPERIENCE: "A continuación agrega tus estudios",
      EDUCATION: "A continuación agrega un sobre ti ",
    };
    return nameForm[form] || ""; // Devuelve la etiqueta según el formulario actual
  };

  // Función para manejar el clic en el botón "Volver" y retroceder en el formulario
  const handleOnClickBackButton = () => {
    const backFlow: Record<string, string> = {
      SKILL: "CATEGORY",
      CAREER: "SKILL",
      EXPERIENCE: "CAREER",
      EDUCATION: "EXPERIENCE",
    };
    const backForm = backFlow[form];
    if (backForm) {
      setForm(backForm); // Regresa al formulario anterior
      decreaseStep(); // Disminuye el paso actual
    }
  };

  return (
    <div className="w-ful">
      <div className="pb-4">
        {/* Barra de progreso que indica el paso actual */}
        <ProgressBar steps={steps} currentStep={currentStep} />
      </div>
      <div
        className={`flex pb-3 items-center mx-8 ${
          form === "CATEGORY" ? "justify-end" : "justify-between"
        }`}
      >
        {/* Botón "Volver", se muestra solo si no está en el primer formulario */}
        {form !== "CATEGORY" ? (
          <Button
            className="h-12 !rounded-xl text-lg"
            onClick={handleOnClickBackButton}
            variant="white"
          >
            Volver
          </Button>
        ) : null}
        {/* Botón "Siguiente", deshabilitado si no se cumplen las condiciones */}
        <Button
          className="h-12 !rounded-xl text-lg"
          onClick={handleOnClickNextButton}
          variant="green"
          disabled={isDisableNextButton()}
        >
          {getNextButtonLabel()} {/* Etiqueta dinámica del botón */}
        </Button>
      </div>
    </div>
  );
}
