import Avatar from "./avatar";

export default function index() {
  return (
    <div className="h-full ml-[50px] overflow-y-auto">
      <div className="flex flex-col h-full pb-8 overflow-y-auto">
        <p className="pb-5 text-base font-semibold"> 5/5</p>
        <h2 className="text-[35px] text-color3 font-medium pb-3 leading-tight w-3/6">
          Algunos últimos detalles, luego puedes verificar y publicar tu perfil
        </h2>
        <p className="text-base font-normal pb-10 w-3/6">
          Una foto profesional te ayuda a generar confianza con tus clientes. Para mantener las cosas simples
          necesitamos tus datos para optomizar las propuestas de trabajo que podemos mostrarte.
        </p>
        <div className="flex items-center gap-5">
          <div>
            <Avatar />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
