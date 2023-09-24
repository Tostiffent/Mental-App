"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import RadioOptions from "./RadioOptions/RadioOptions";
import Link from "next/link";

const QUIZ_OPTIONS = ["Often", "Sometimes", "Rarely", "Never"];
const OPTION_SCORES = [1, 0.6, 0.3, 0];

function clampBetween(val: number, min: number, max: number) {
	return Math.max(Math.min(val, max), min);
}

function getResult(score: number, results: { [key: string]: string }) {
	console.log(results);

	return Object.keys(results).reduce(
		(prevVal, threshold) => (score > parseInt(threshold) ? results[threshold] : prevVal),
		"No result"
	);
}

export default function QuizContainer({ quizData }: any) {
	const [currentQuestion, setCurrentQuestion] = useState<any>(0);
	const [currentlySelectedOption, setCurrentlySelectedOption] = useState<0 | 1 | 2 | 3 | null>(null);
	const [quizOver, setQuizOver] = useState<boolean>(false);
	const [score, setScore] = useState<number>(0);

	const quizContainerRef = useRef<HTMLDivElement | null>(null);
	const lastQuestionDivRef = useRef<HTMLDivElement | null>(null);

	const questions = quizData?.questions;

	useEffect(() => {
		const quizContainer = quizContainerRef.current;
		let lastQuestionDiv = lastQuestionDivRef.current;
		if (!quizContainer) return;

		const questionDiv = quizContainer.querySelector(`[data-question-idx="${currentQuestion}"]`) as HTMLDivElement;

		if (lastQuestionDiv && lastQuestionDiv.getAttribute("data-question-idx") != `${currentQuestion}`) {
			lastQuestionDiv.style.opacity = "0%";
			lastQuestionDiv.style.top = "-100vh";
		}

		if (questionDiv) {
			questionDiv.style.opacity = "100%";
			lastQuestionDivRef.current = questionDiv;
			// questionDiv.style.top = "unset"
		}
	}, [currentQuestion]);

	return (
		<div className="quizContainer flex items-center justify-center" ref={quizContainerRef}>
			{questions.map((question: any, idx: number) => (
				<div
					key={idx}
					data-question-idx={idx}
					className={`${
						idx == currentQuestion ? "" : "-z-10"
					} question opacity-0 absolute flex flex-col w-4/5 transition-[opacity,top] duration-500`}
				>
					<h1 className="text-4xl ">{question}</h1>
					<RadioOptions setOption={setCurrentlySelectedOption} options={QUIZ_OPTIONS} />
					<div className="flex flex-row gap-5">
						<button
							className="mt-5 bg-foreground-secondary rounded-xl w-[130px] h-[50px] disabled:bg-gray-300"
							disabled={currentlySelectedOption != null ? false : true}
							onClick={() => {
								if (currentlySelectedOption == null) return;

								setScore(score + OPTION_SCORES[currentlySelectedOption]);

								if (currentQuestion == questions.length - 1) {
									// quiz over
									setQuizOver(true);
									setCurrentQuestion(-1);
									return;
								}

								setCurrentQuestion(clampBetween(currentQuestion + 1, 0, questions.length - 1));
								setCurrentlySelectedOption(null);
							}}
						>
							{currentQuestion == questions.length - 1 ? `Complete ->` : `Next ->`}
						</button>
					</div>
				</div>
			))}

			<div
				className={`question ${
					quizOver ? "opacity-100" : "opacity-0 -z-10"
				} absolute flex flex-col justify-start w-4/5 transition-[opacity] duration-500 text-center`}
			>
				<h1 className="text-4xl text-foreground-tertiary">Results:</h1>
				<h2 className="text-3xl mt-6">{quizOver ? getResult(score, quizData.results) : "nil"} </h2>
				<h3 className="text-2xl mt-4">
					<i>{`(Your score was ${score.toFixed(2)})`}</i>
				</h3>
			</div>

			<Link href="/quizzes" className="text-4xl absolute top-3 right-3">
				<AiOutlineClose />
			</Link>
		</div>
	);
}
