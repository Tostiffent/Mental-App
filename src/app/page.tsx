import BreathingBlob from "@/components/BreathingBlob";

export default function Home() {
	return (
		<>
			<div
				className="absolute top-0 -z-10 bg-cover h-full w-full"
				style={{ backgroundImage: "url(landing_bg.jpg)" }}
			></div>
			<main className="flex flex-row items-center justify-between h-3/6  pt-20 pl-16">
				<div className="hero w-3/5 text-ce">
					<h1 className="text-5xl font-bold">Open platform to address mental issues</h1>
					<h3 className="text-2xl mt-7">You deserve to be happy. We can help you with what you need.</h3>
				</div>
				<div className="blob-container w-2/5 h-full flex items-center justify-center">
					<BreathingBlob />
				</div>
			</main>
		</>
	);
}
