"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { quizzes as getQuizzes } from "@/lib/api";

export default function Quizzes() {
	const [quizzes, setQuizzes] = useState<any>([]);

	useEffect(() => {
		getQuizzes()
			.then((data: any) => {
				setQuizzes(data);
			})
			.catch((err: any) => {
				console.error(err);

				setQuizzes([
					{
						title: "ADHD",
						image: "/landing_bg.jpg",
						desc: "test",
						slug: "123",
					},
					{
						title: "ADHD",
						image: "/landing_bg.jpg",
						desc: "test",
						slug: "123",
					},
					{
						title: "ADHD",
						image: "/landing_bg.jpg",
						desc: "test",
						slug: "123",
					},
				]);
			});
	}, []);

	return (
		<div className="flex flex-col items-center mt-5">
			<h1 className="text-4xl m-5 ml-10">Try some of these quizzes to get to know yourself better</h1>
			<div className="quizCardContainer relative m-10 w-4/5 grid gap-x-4 gap-y-4 items-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center ">
				{quizzes.map((quiz: any) => (
					<div
						className="quizCard relative w-full h-64 flex flex-col rounded-xl p-5 drop-shadow-lg top-0 hover:-top-3 transition-[top] duration-200"
						key={quiz.slug}
					>
						<Link href={`/quizzes/${quiz.quiz_slug}`} key={quiz.slug}>
							<div className="imageContainer w-full h-full rounded-xl absolute top-0 left-0 z-[-1] overflow-clip">
								<Image src={quiz.img ?? "/landing_bg.jpg"} alt={quiz.title} fill={true} />
							</div>
							<h3 className="text-3xl text-foreground-tertiary font-bold" >{quiz.title}</h3>
							<p className="mt-4 text-white">{quiz.desc}</p>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
