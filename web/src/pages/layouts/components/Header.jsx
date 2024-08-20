import { Bars3Icon } from "@heroicons/react/24/outline";
import HeaderItems from "./HeaderItems";
import { useAuthStore } from "../../auth/store/auth";
import Authentication from "../../auth";
import { useRef } from "react";

function Header() {
	const buttonRef = useRef();
	const { setOpenModal, setChangeAction } = useAuthStore((state) => state);

	const handleOpenModal = () => {
		setOpenModal();
		setChangeAction("LOGIN");
		if (buttonRef.current) {
			buttonRef.current.blur();
		}
	};

	return (
		<div className=" bg-header">
			<div className="flex mx-1 justify-between items-center px-3 py-3 sm:max-w-screen-xl sm:mx-auto">
				<span className="text-color5 font-bold -tracking-widest text-xl">LOGO</span>
				<div className="flex items-center">
					<button
						onClick={handleOpenModal}
						ref={buttonRef}
						className="text-color1 font-medium text-sm bg-color5 p-[6px] px-3 rounded-md hover:bg-green-600 hover:text-white hover:font-medium	"
					>
						Acceder
					</button>
					<HeaderItems title="LOGIN" Icon={Bars3Icon} />
				</div>
			</div>
			<Authentication />
		</div>
	);
}

export default Header;
