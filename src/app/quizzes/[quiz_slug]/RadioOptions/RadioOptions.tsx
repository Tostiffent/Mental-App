import { useEffect, useRef } from "react";

export default function RadioOptions({
	setOption,
	options,
}: {
	setOption: (idx: 0 | 1 | 2 | 3) => void;
	options: string[];
}) {
	const optionContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const optionContainer = optionContainerRef.current;

		if (optionContainer) {
			const radios = optionContainer.getElementsByTagName("input");

			for (let i = 0; i < radios.length; i++) {
				const radio = radios[i];
				radio.addEventListener("change", function () {
					// has been checked
					setOption(i as any);
				});
			}
		}
	}, [setOption]);

	return (
		<div className="mt-10" ref={optionContainerRef}>
			{options.map((option: any) => (
				<label className="container" key={option}>
					{option}
					<input type="radio" name="quizOption" />
					<span className="checkmark"></span>
				</label>
			))}
			<style jsx>{`
				.container {
					display: block;
					position: relative;
					padding-left: 35px;
					margin-bottom: 12px;
					cursor: pointer;
					font-size: 22px;
					-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;
				}

				/* Hide the browser's default radio button */
				.container input {
					position: absolute;
					opacity: 0;
					cursor: pointer;
				}

				/* Create a custom radio button */
				.checkmark {
					position: absolute;
					top: 0;
					left: 0;
					height: 25px;
					width: 25px;
					background-color: #eee;
					border-radius: 50%;
				}

				/* On mouse-over, add a grey background color */
				.container:hover input ~ .checkmark {
					background-color: #ccc;
				}

				/* When the radio button is checked, add a blue background */
				.container input:checked ~ .checkmark {
					background-color: var(--foreground-tertiary);
				}

				/* Create the indicator (the dot/circle - hidden when not checked) */
				.checkmark:after {
					content: "";
					position: absolute;
					display: none;
				}

				/* Show the indicator (dot/circle) when checked */
				.container input:checked ~ .checkmark:after {
					display: block;
				}

				/* Style the indicator (dot/circle) */
				.container .checkmark:after {
					top: 9px;
					left: 9px;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background: white;
				}
			`}</style>
		</div>
	);
}
