"use client";

import { useLayoutEffect, useRef } from "react";
import styles from "./BreathingBlob.module.scss";

export default function BreathingBlob() {
	const blobRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLHeadingElement>(null);

	useLayoutEffect(() => {
		let breatheIn = true;

		if (blobRef.current) blobRef.current.style.transform = `scale(${breatheIn ? 1.4 : 1})`;

		setInterval(() => {
			if (blobRef.current && textRef.current) {
				textRef.current.innerText = `Breathe ${breatheIn ? "in" : "out"}`;
				blobRef.current.style.transform = `scale(${breatheIn ? 1.4 : 1})`;
				breatheIn = !breatheIn;
			}
		}, 4100);
	}, []);

	return (
		<div className={styles.blob} ref={blobRef}>
			<h2 className="font-bold text-2xl transition-opacity" ref={textRef}>
				Breathe in
			</h2>
		</div>
	);
}
