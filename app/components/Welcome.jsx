"use client";

import React, { useEffect, useContext, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import welcome_en from "@public/assets/text/en/welcome_en";
import welcome_fr from "@public/assets/text/fr/welcome_fr";

const images = [
	"/assets/img/renders/Building_Day.png",
	"/assets/img/renders/Building_Front_1.png",
	"/assets/img/renders/Dinning_Area.png",
	"/assets/img/renders/Living_Area.png",
];

const Welcome = () => {
	const { language } = useContext(LanguageContext);
	const [index, setIndex] = useState(0);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % images.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const timeout = setTimeout(() => setIsVisible(true), 100); // slight delay for animation
		return () => clearTimeout(timeout);
	}, []);

	const texts = language === "en" ? welcome_en : welcome_fr;

	return (
		<div
			id="home"
			className={`relative w-screen h-[35vh] md:h-[50vh] lg:h-[70vh] overflow-hidden transition-opacity duration-[2000ms] ease-out ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
		>
			{/* Background crossfade images */}
			{images.map((src, i) => (
				<div
					key={i}
					className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
						i === index
							? "opacity-100 z-0 pointer-events-none"
							: "opacity-0 z-0 pointer-events-none"
					}`}
					style={{
						backgroundImage: `url(${src})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
				/>
			))}

			{/* Overlay content */}
			<div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
				<h1
					className={`pointer-events-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl uppercase font-bold text-white whitespace-nowrap drop-shadow-xl neon-glow transition-all duration-[2000ms] ease-out ${
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
					}`}
				>
					{texts.welcomeText}
				</h1>
			</div>
		</div>
	);
};

export default Welcome;
