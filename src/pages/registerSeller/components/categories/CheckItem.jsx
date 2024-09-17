export default function CheckItem({ id, name, onChange, isActive, isChecked }) {
  const handleChange = (event) => onChange(id, event.target.checked);

  return (
    <label className="flex items-center space-x-2">
      <input
        onChange={handleChange}
        type="checkbox"
        checked={isChecked}
        disabled={isActive}
        className="h-6 w-6"
      />
      <p className="text-base text-color1 font-medium tracking-wide py-2">{name}</p>
    </label>
  );
}
