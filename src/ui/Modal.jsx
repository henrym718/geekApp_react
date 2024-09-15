import { useEffect, useRef } from "react";

export default function Modal({ children, isOpenModal, setCloseModal }) {
  const bgRef = useRef();
  const contentRef = useRef();

  const handleClickOutside = (event) => {
    if (
      bgRef.current &&
      bgRef.current.contains(event.target) &&
      !contentRef.current.contains(event.target)
    ) {
      setCloseModal();
    }
  };

  const handlePressKeyOutside = (event) => {
    if (event.key === "Escape") {
      setCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handlePressKeyOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handlePressKeyOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "hidden"; // Evita el scroll del fondo
    } else {
      document.body.style.overflow = "auto"; // Restaura el scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Limpia al desmontar
    };
  }, [isOpenModal]);

  return (
    <div>
      {isOpenModal && (
        <div
          ref={bgRef}
          className="fixed top-0 left-0 z-50 h-screen w-screen bg-[rgba(0,0,0,.65)] flex items-center justify-center transition-opacity duration-300 ease-in-out"
          style={{ opacity: isOpenModal ? 1 : 0 }}
        >
          <div
            ref={contentRef}
            className="relative bg-white overflow-hidden rounded-[13px] transform transition-transform duration-300 ease-in-out"
            style={{ transform: isOpenModal ? "scale(1)" : "scale(0.95)" }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
