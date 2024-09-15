import request from "../utils/request";

function Nav() {
	return (
		<nav className="relative  ">
			<div className="flex z-1 px-10 text-xl space-x-10 overflow-x-scroll scrollbar-hide sm:whitespace-nowrap sm:space-x-16 sm:mx-3">
				{Object.entries(request).map(([key, { title, url }]) => [
					<h2
						key={key}
						className="cursor-pointer last:pr-14 text-center transition duration-100 transform hover:scale-110 hover:text-color1 hover:font-semibold active:text-[#0ae98a]"
					>
						{title}
					</h2>,
				])}
			</div>
			<div className="absolute top-0 right-0  h-14 w-[5%]  bg-gradient-to-l from-[#FFFFFFF] "></div>
			<div className="absolute top-0 left-0  h-14 w-[5%]  bg-gradient-to-r from-[#FFFFFFF] "></div>

		</nav>
	);
}

export default Nav;
