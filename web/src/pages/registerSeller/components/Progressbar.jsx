export default function Progressbar({ steps, curentStep }) {
  return (
    <div className="flex flex-col ">
      <div className="w-full h-2 bg-gray-200">
        <div
          className={`h-full bg-black w-[${
            (curentStep / steps) * 100
          }%] transition-all duration-300`}
        ></div>
      </div>
    </div>
  );
}
