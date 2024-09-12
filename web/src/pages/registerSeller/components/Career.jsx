import { useState } from "react";
import useDataForm from "../store/dataForm";
import { CircleX } from "lucide-react";

export default function Career() {
  const { setCareer, cleanCareer, career } = useDataForm((state) => state);

  console.log(career);
  const handleOnChange = (e) => {
    setCareer(e.target.value);
  };

  const handleOnMouseDown = (e) => {
    e.preventDefault();
    setCareer(e.target.value);
    cleanCareer();
  };

  return (
    <div className=" h-full w-4/6 ml-[50px]">
      <div className="flex flex-col w-1/2">
        <p className="pb-5 text-base font-semibold"> 3/5</p>
        <h2 className="text-[35px] text-color3 font-medium pb-3 leading-tight">
          Lo tengo, Ahora, agrega un titulo para decirle a todos lo que haces
        </h2>
        <p className="text-base font-normal pb-10">
          Es lo primero que ven los clientes, asi que haz que cuente. Destaca describiendo tu
          experiencia en tus propias palabras.
        </p>
        <p className="pb-2">Tu rol profesional</p>
      </div>
      <div class="relative w-3/5">
        <input
          type="text"
          className="h-9 rounded-lg border-2 border-black border-opacity-10 w-full pr-10 pl-2"
          value={career}
          onChange={handleOnChange}
        />
        {career.trim().length ? (
          <button
            onMouseDown={handleOnMouseDown}
            className="absolute right-2 top-[45%] transform -translate-y-1/2 px-3 py-1 rounded-lg h-7"
          >
            <CircleX />
          </button>
        ) : null}
      </div>
    </div>
  );
}
