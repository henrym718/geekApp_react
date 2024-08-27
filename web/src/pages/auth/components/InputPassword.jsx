import { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function InputPassword({ onChange, setDisabledButton, showCheck }) {
  const [showPassword, setShowPassword] = useState(false);
  const [textInput, setTextINput] = useState("");
  const [check, setCheck] = useState({
    checkNumber: false,
    checkLength: false,
    checkLower: false,
    ckeckUpper: false,
  });

  const handleOnChange = (e) => {
    const value = e.target.value;
    onChange(value);
    setTextINput(value);
  };

  useEffect(() => {
    const patronLongitud = new RegExp(".{8,}");
    const patronMinuscula = new RegExp("[a-z]");
    const patronMayuscula = new RegExp("[A-Z]");
    const patronNumero = new RegExp("[0-9]");

    setCheck(() => ({
      checkLength: patronLongitud.test(textInput),
      checkNumber: patronNumero.test(textInput),
      ckeckUpper: patronMayuscula.test(textInput),
      checkLower: patronMinuscula.test(textInput),
    }));
  }, [textInput]);

  useEffect(() => {
    const allChecksTrue = Object.values(check).every(Boolean);
    setDisabledButton(!allChecksTrue);
  }, [check]);

  return (
    <div className=" flex flex-col">
      <div className="flex h-[42px] w-full border justify-center items-center pl-3 pr-4">
        <input
          className="flex-1 outline-none h-full"
          type={`${showPassword ? "text" : "password"}`}
          onChange={handleOnChange}
        />

        <div>
          {showPassword ? (
            <IoEyeOutline
              size={17}
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer -rotate-180 text-color2"
            />
          ) : (
            <FaRegEyeSlash
              size={17}
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer text-color2"
            />
          )}
        </div>
      </div>

      {showCheck === false ? (
        <div className={`pt-3 transition-all duration-300 h-auto`}>
          <div className="min-h-[40px] -mb-5">
            <OptionsCheck option="Al menos 8 caracteres" check={check.checkLength} />
            <OptionsCheck option="Al menos 1 minúscula" check={check.checkLower} />
            <OptionsCheck option="Al menos 1 mayúscula" check={check.ckeckUpper} />
            <OptionsCheck option="Al menos 1 número" check={check.checkNumber} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

const OptionsCheck = ({ option, check }) => {
  return (
    <div
      className={`${
        check && "text-green-500 line-through font-normal"
      } flex items-center space-x-2 text-sm text-color4 tracking-wide pb-1`}
    >
      {check ? <IoIosCheckmarkCircle size={17} /> : <IoCheckmarkCircleOutline size={17} />}

      <p>{option}</p>
    </div>
  );
};
