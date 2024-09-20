export default function ProgressBar({ steps, currentStep }) {
  const percent = (currentStep / steps) * 100;

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full">
      <div
        className={`h-full bg-black rounded-full transition-all duration-500`}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
