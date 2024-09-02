export default function ProgressBar({ steps, currentStep }) {
  const percent = (currentStep / steps) * 100;

  return (
    <div className="flex flex-col">
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className={`h-full bg-black rounded-full w-[${percent}%] transition-all duration-500`}
        ></div>
      </div>
    </div>
  );
}
