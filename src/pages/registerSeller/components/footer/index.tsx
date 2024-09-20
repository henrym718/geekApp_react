import { useEffect, useState } from "react";
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
  const { selectedSubcategories, tags, career } = useDataForm((state) => state);
  const { setForm, addStep, decreaseStep, currentStep } = useFormsStore((state) => state);

  const isDisableNextButton = (): boolean => {
    switch (form) {
      case "CATEGORY":
        return selectedSubcategories.length === 0;
      case "SKILL":
        return tags.length === 0;
      case "CAREER":
        return career.length <= 3;
      default:
        return false;
    }
  };

  const handleOnClickNextButton = () => {
    const formFlow: Record<string, string> = {
      CATEGORY: "SKILL",
      SKILL: "CAREER",
      CAREER: "EXPERIENCE",
      EXPERIENCE: "EDUCATION",
    };
    const nextForm = formFlow[form];
    if (nextForm) {
      setForm(nextForm);
      addStep();
    }
  };

  const handleOnClickBackButton = () => {
    const backFlow: Record<string, string> = {
      SKILL: "CATEGORY",
      CAREER: "SKILL",
      EXPERIENCE: "CAREER",
    };
    const backForm = backFlow[form];
    if (backForm) {
      setForm(backForm);
      decreaseStep();
    }
  };

  const getNextButtonLabel = () => {
    const nameForm: Record<string, string> = {
      CATEGORY: "A continuación agrega tus habilidades",
      SKILL: "A continuación agrega tu profesión",
      CAREER: "A continuación agrega tu experiencia",
      EXPERIENCE: "A continuación agrega tus estudios",
    };
    return nameForm[form] || "";
  };

  return (
    <div className="w-ful">
      <div className="pb-4">
        <ProgressBar steps={steps} currentStep={currentStep} />
      </div>
      <div
        className={`flex pb-3 items-center mx-8 ${
          form === "CATEGORY" ? "justify-end" : "justify-between"
        }`}
      >
        {form !== "CATEGORY" ? (
          <Button
            className="h-12 !rounded-xl text-lg"
            onClick={handleOnClickBackButton}
            variant="white"
          >
            Volver
          </Button>
        ) : null}
        <Button
          className="h-12 !rounded-xl text-lg"
          onClick={handleOnClickNextButton}
          variant="green"
          disabled={isDisableNextButton()}
        >
          {getNextButtonLabel()}
        </Button>
      </div>
    </div>
  );
}
