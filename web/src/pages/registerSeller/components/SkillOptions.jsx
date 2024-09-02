import useFormsStore from "../store/forms";

export default function SkillOptions() {
  const { setForm, decreaseStep } = useFormsStore((state) => state);

  const handleBackForm = () => {
    setForm("CATEGORY");
    decreaseStep();
  };

  return (
    <div>
      <div>hola</div>
    </div>
  );
}
