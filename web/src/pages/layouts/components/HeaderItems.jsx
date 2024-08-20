function HeaderItems({ title, Icon }) {
	return (
		<div className="flex flex-col text-color5 cursor-pointer w-12 items-center sm:w-20 group hover:text-color6 	">
			<Icon className="h-6 lg:group-hover:animate-bounce" />
			<p className=" hidden  opacity-0 group-hover:opacity-100 tracking-widest">{title}</p>
		</div>
	);
}

export default HeaderItems;
