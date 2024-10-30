export default function index() {
  return (
    <div className="h-full ml-[50px]">
      <div className="flex flex-col h-full pb-8 overflow-y-auto">
        <p className="pb-5 text-base font-semibold"> 6/7</p>
        <h2 className="text-[35px] text-color3 font-medium pb-3 leading-tight w-3/6">
          Genial, ahora escribe una biografia para contarle al mundo sobre ti{" "}
        </h2>
        <p className="text-base font-normal pb-10 w-3/6">
          Ayuda a la gente a conocerte de un vistazo. Cuentales cuales son tus fortalezas, procura ser claro,
          usanddo párrafo o viñetas. Siempre podrás editar más tarde.
        </p>
        <div className="flex flex-col gap-5">
          <textarea
            className="w-3/6 px-2 py-2 border border-black border-opacity-15"
            name="aboutme"
            rows={6}
          />
          <p>hola</p>
        </div>
      </div>
    </div>
  );
}
