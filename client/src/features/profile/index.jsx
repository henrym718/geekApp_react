import { useState } from "react";
import { Steps } from "antd";
import OneStepForm from "./components/OneStepForm";
import TwoStepForm from "./components/TwoStepFrom";
import ThreeStepForm from "./components/ThreeStepForm";
import FourStepForm from "./components/fourStepForm";

export default function InputProfile() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => prev + 1);
  const previous = () => setCurrent((prev) => prev - 1);

  const items = [
    { title: "", content: <OneStepForm next={next} /> },
    { title: "", content: <TwoStepForm next={next} previous={previous} /> },
    { title: "", content: <ThreeStepForm next={next} previous={previous} /> },
    { title: "", content: <FourStepForm previous={previous} /> },
  ];

  return (
    <div className='flex flex-col  justify-center '>
      <div className=' m-auto mt-11'>
        <Steps current={current} items={items} />
      </div>
      <div className='w-1/2 m-auto mt-6'>{items[current].content} </div>
    </div>
  );
}
