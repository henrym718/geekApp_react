import { CircleX } from "lucide-react";
export default function Career() {
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
          class="h-9 rounded-lg border-2 border-black border-opacity-10 w-full pr-10"
        />
        <button class="absolute right-2 top-1/2 transform -translate-y-1/2   px-3 py-1 rounded-lg h-7">
          <CircleX />
        </button>
      </div>
    </div>
  );
}
