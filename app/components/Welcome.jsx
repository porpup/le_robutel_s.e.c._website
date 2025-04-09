"use client";

import React, { useEffect, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
	const [prevLanguage, setPrevLanguage] = useState(language);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % images.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const timeout = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		if (language !== prevLanguage) {
			setIsVisible(false);
			const timeout = setTimeout(() => {
				setPrevLanguage(language);
				setIsVisible(true);
			}, 500); // Match this with your animation duration
			return () => clearTimeout(timeout);
		}
	}, [language, prevLanguage]);

	const texts = language === "en" ? welcome_en : welcome_fr;

	return (
		<div
			id="home"
			className="relative w-screen h-[35vh] md:h-[50vh] lg:h-[70vh] overflow-hidden"
		>
			{/* Background crossfade images */}
			{images.map((src, i) => (
				<motion.div
					key={src}
					initial={{ opacity: 0 }}
					animate={{ opacity: i === index ? 1 : 0 }}
					transition={{ duration: 2, ease: "easeInOut" }}
					className="absolute inset-0 z-0 pointer-events-none"
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
				<AnimatePresence mode="wait">
					<motion.h1
						key={language} // This triggers animation on language change
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5 }}
						className="pointer-events-auto text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl uppercase font-bold text-white whitespace-nowrap drop-shadow-xl neon-glow"
					>
						{texts.welcomeText}
					</motion.h1>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default Welcome;
