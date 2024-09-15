import Header from "./components/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div className="flex flex-col h-screen">
			<header>
				<Header />
			</header>

			<main className="flex-grow">
				<Outlet />
			</main>

			<footer>
				<p>&copy; 2024 My App. All rights reserved.</p>
			</footer>
		</div>
	);
}
