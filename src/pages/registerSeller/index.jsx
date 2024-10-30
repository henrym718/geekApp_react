import Categories from "./components/categories";
import Skills from "./components/skills";
import Career from "./components/careers";
import Experience from "./components/experience";
import Education from "./components/education";
import Aboutme from "./components/aboutme";
import Profile from "./components/profile";
import Footer from "./components/footer";
import useFormsStore from "./store/forms";

export default function index() {
  const { form } = useFormsStore((state) => state);

  return (
    <div className="flex flex-col h-screen">
      <div className=" h-8 mb-20"> header</div>
      <div className=" flex flex-grow justify-center overflow-hidden">
        {form == "CATEGORY" && <Categories />}
        {form == "SKILL" && <Skills />}
        {form === "CAREER" && <Career />}
        {form === "EXPERIENCE" && <Experience />}
        {form === "EDUCATION" && <Education />}
        {form === "ABOUTME" && <Aboutme />}
        {form === "PROFILE" && <Profile />}
      </div>
      <div className="pb-1">
        <Footer form={form} steps={7} />
      </div>
    </div>
  );
}
