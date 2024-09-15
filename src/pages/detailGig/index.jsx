import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";

export default function DetailGig() {
  let { author, title } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const [sliderValue, setSliderValue] = useState(50);

  const actualizarEdad = () => {
    searchParams.set("author", "juan");
    setSearchParams(searchParams);
  };

  return (
    <div className='flex flex-col gap-7'>
      <div>{author}</div>
      <div>{title}</div>
      <div className='flex gap-3'>
        <select onChange={(e) => console.log(e.target.value)}>
          <option value='' disabled selected>
            Selecciona
          </option>

          <option value='Trf'>Triunfo</option>
          <option value='Trc'>Troncal</option>
        </select>
        <input
          type='range'
          min={0}
          max={100}
          value={sliderValue}
          step={1}
          onChange={(e) => setSliderValue(e.target.value)}
        />
      </div>
    </div>
  );
}
