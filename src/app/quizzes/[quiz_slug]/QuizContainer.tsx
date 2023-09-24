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

export default function QuizContainer({ quizData }: any) {
	const [currentQuestion, setCurrentQuestion] = useState<any>(0);
	const quizContainerRef = useRef<HTMLDivElement | null>(null);
  const lastQuestionDivRef = useRef<HTMLDivElement | null>(null);

	const questions = quizData?.questions;

	useEffect(() => {
		const quizContainer = quizContainerRef.current;
    let lastQuestionDiv = lastQuestionDivRef.current
		if (!quizContainer) return;

		const questionDiv = quizContainer.querySelector(`[data-question-idx="${currentQuestion}"]`) as HTMLDivElement;

    if (lastQuestionDiv && lastQuestionDiv.getAttribute("data-question-idx") != `${currentQuestion}`) {
      lastQuestionDiv.style.opacity = "0%"
      lastQuestionDiv.style.top = "-100vh"
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
					className={`${idx == currentQuestion ? "" : "-z-10"} question opacity-0 absolute flex flex-col w-4/5 transition-[opacity,top] duration-500`}
				>
					<h1 className="text-4xl ">{question}</h1>
					<RadioOptions options={QUIZ_OPTIONS} />
					<div className="flex flex-row gap-5">
					{/* 	{currentQuestion > 0 ? (
							<button
								className="mt-5 bg-foreground-secondary rounded-xl w-[130px] h-[50px]"
								onClick={() => {
									setCurrentQuestion((question: any) =>
										clampBetween(question - 1, 0, questions.length - 1)
									);
								}}
							>
								{"<-"} Back
							</button>
						) : null} */}
						<button
							className="mt-5 bg-foreground-secondary rounded-xl w-[130px] h-[50px]"
							onClick={() => {
								if (currentQuestion + 1 >= questions.length - 1) {
									// quiz over
									
								}
								setCurrentQuestion((question: any) =>
									clampBetween(question + 1, 0, questions.length - 1)
								);
							}}
						>
							{currentQuestion == questions.length - 1 ? `Complete ->` : `Next ->`}
						</button>
					</div>
				</div>
			))}

			<Link href="/quizzes" className="text-4xl absolute top-3 right-3">
				<AiOutlineClose />
			</Link>
			<style jsx>{`
				.fadeOut {
					opacity: 0;
					top: -100vh;
					transition: top 0.5s 0.5s, opacity 0.5s;
				}
				.fadeIn {
					opacity: 1;
					transition: opacity 0.5s 0.5s;
				}
			`}</style>
		</div>
	);
}
