import Tags from "./Tags";
export default function SkillOptions() {
  const HandleSelectedTags = (options) => {
    console.log(options);
  };

  return (
    <div className="h-full w-4/6 ml-[50px]">
      <div className=" flex h-full overflow-y-auto">
        {/** Formulario */}
        <div className="flex flex-col w-1/2">
          <p className="pb-5 text-base font-semibold"> 2/5</p>
          <h2 className="text-[40px] text-color3 font-semibold pb-3">
            Excelente, Ahora cuentanos sobre tus habilidades
          </h2>
          <p className="text-base font-normal pb-10">
            Tus habilidades muestran a los clientes que puedes ofrecer y nos ayudan a aelegir que
            trabajos recomendarte. Agregue o elimine nuestra sugerencias, o comience a escribir para
            elegir mas.
          </p>
          <p className="pb-2">Tus habilidades</p>
          <Tags selected={HandleSelectedTags} max={5} />
        </div>

        {/** Imagen de experiencia */}
        <div></div>
      </div>
    </div>
  );
}
