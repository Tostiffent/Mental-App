import { FiSearch } from "react-icons/fi";

import Link from "next/link";

function NavButton({ href, children }: any) {
	return (
		<Link
			className="text-2xl font-bold hover:text-foreground-tertiary"
			href={href}
		>
			{children}
		</Link>
	);
}
export default function Navbar() {
	return (
		<nav className="bg-transparent flex items-center w-full h-20">
			<div className="w-2/5 ml-10">
				<h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground-tertiary to-background-secondary">
					<Link href="/">Moodscape</Link>
				</h3>
			</div>
{/* 			<div className="float-right ml-auto mr-5 flex flex-row bg-background-primary h-1/2 w-50 rounded-md">
				<div className="h-full w-5 relative flex justify-center items-center ml-3">
					<FiSearch style={{ fontSize: "1.5rem" }} />
				</div>
				<input type="search" placeholder="Search" className="bg-transparent ml-2 focus:outline-none placeholder-black" />
			</div> */}
			<ul className="list-none flex flex-row space-x-5 float-right ml-auto mr-10">
				<li>
					<NavButton href="/resources">Resources</NavButton>
				</li>
				<li>
					<NavButton href="/quizzes">Quizzes</NavButton>
				</li>
				<li>
					<NavButton href="/forum">Forum</NavButton>
				</li>
			</ul>
		</nav>
	);
}
