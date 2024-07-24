import { useState } from "react";

export default function useOptionsSelector(dataPlaces) {
  const [city, setCity] = useState();

  /* obtengo las ciudaddes al formato que pide el comnponente */
  const citiesOp = dataPlaces.map((cityObject) => {
    const cityName = cityObject.city;
    return { label: cityName, value: cityName };
  });

  /*obtengo dinamicamente los sectores al formato que pide el comnponente*/
  const cityObject = city && dataPlaces.find((obj) => obj.city == city);
  const cityValues = cityObject && cityObject.sector;
  const sectorsOp =
    cityValues && cityValues.map((e) => ({ label: e, value: e }));

  return { citiesOp, sectorsOp, setCity };
}
