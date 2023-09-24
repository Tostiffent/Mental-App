"use client";

import { useEffect, useState } from "react";
import { quiz } from "@/lib/api";
import Loading from "@/components/Loading";
import QuizContainer from "./QuizContainer";

export default function QuizPage({ params }: { params: { quiz_slug: string } }) {
	const [quizData, setQuizData] = useState<any>(null);
	const [err, setErr] = useState<any>(null);

	useEffect(() => {
		quiz(params.quiz_slug)
			.then((data) => {
				setQuizData(data);
			})
			.catch((err) => {
				// setErr(err);
				setQuizData({
					questions: [
						"I have difficulty following through on some of my plans and projects, even though I was very excited about them when I got started.",
						"At times, I feel so energetic that I can function on little to no sleep.",
					],
					results: {
						1: "Hardly depressed",
						6: "Mildly",
						10: "Severely",
					},
				});
			});
	}, [params.quiz_slug]);

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-background-primary flex justify-center items-center">
			{!(quizData || err) ? (
				<Loading style={{ width: "5rem", height: "5rem", borderTop: "6px solid var(--foreground-tertiary)" }} />
			) : (
				<>
					{err ? (
						<div>
							<h1 className="text-3xl text-red-600">Uh oh. There was an error loading this quiz.</h1>
						</div>
					) : (
						<QuizContainer quizData={quizData} />
					)}
				</>
			)}
		</div>
	);
}
