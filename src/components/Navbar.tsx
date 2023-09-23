import { FiSearch } from "react-icons/fi";

import Link from "next/link";

function NavButton({ href, children }: any) {
	return (
		<Link
			className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-500"
			href={href}
		>
			{children}
		</Link>
	);
}
export default function Navbar() {
	return (
		<nav className="bg-transparent flex items-center w-full h-20">
			<div className="w-1/5 ml-10">
				<h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
					<Link href="/">Mental app</Link>
				</h3>
			</div>
			<div className="float-right ml-auto mr-5 flex flex-row bg-background-primary h-1/2 w-50 rounded-md">
				<div className="h-full w-5 relative flex justify-center items-center ml-3">
					<FiSearch style={{ fontSize: "1.5rem" }} />
				</div>
				<input type="search" placeholder="Search" className="bg-transparent ml-2 focus:outline-none" />
			</div>
			<ul className="list-none flex flex-row space-x-5 float-right ml mr-10">
				<li>
					<NavButton href="/resources">Resources</NavButton>
				</li>
				<li>
					<NavButton href="/help">Help</NavButton>
				</li>
			</ul>
		</nav>
	);
}
