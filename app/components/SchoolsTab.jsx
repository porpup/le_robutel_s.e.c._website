"use client";

import React, { useContext, useRef, useEffect, useState } from "react";
import Image from "next/image";
import { LanguageContext } from "./LanguageContext";
import schoolText_en from "@public/assets/text/en/schoolTab_en";
import schoolText_fr from "@public/assets/text/fr/schoolTab_fr";

const SchoolsTab = () => {
	const { language } = useContext(LanguageContext);
	const textData = language === "fr" ? schoolText_fr : schoolText_en;

	const [animateImage, setAnimateImage] = useState(false);
	const [animateText, setAnimateText] = useState(false);

	const imageRef = useRef(null);
	const textRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			if (imageRef.current) {
				const rect = imageRef.current.getBoundingClientRect();
				if (rect.top < window.innerHeight * 0.9) {
					setAnimateImage(true);
				}
			}
			if (textRef.current) {
				const rect = textRef.current.getBoundingClientRect();
				if (rect.top < window.innerHeight * 0.9) {
					setAnimateText(true);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="flex flex-col md:flex-row md:space-x-12 gap-6 md:gap-0 items-stretch justify-center">
			{/* Animated image container */}
			<div
				ref={imageRef}
				className={`w-full md:w-1/2 flex transition-transform duration-700 ${
					animateImage
						? "translate-x-0 opacity-100"
						: "-translate-x-full opacity-0"
				}`}
			>
				<div
					className="relative w-full h-64 md:h-auto flex-1 cursor-pointer"
					onClick={() =>
						window.open(
							"https://www.google.com/maps/place/20+Bd+Industriel,+Châteauguay,+QC+J6J+4Z2/@45.3583788,-73.7202838,13.75z/data=!4m15!1m8!2m7!1sschools!3m5!2s20+Bd+Industriel,+Châteauguay,+QC+J6J+4Z2!3s0x4cc914937f112f53:0x3409e8f01cd0fe5d!4m2!1d-73.7087202!2d45.3672779!3m5!1s0x4cc914937f112f53:0x3409e8f01cd0fe5d!8m2!3d45.3672779!4d-73.7087202!16s%2Fg%2F11c3q3psp_?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
							"_blank"
						)
					}
				>
					<Image
						src="/assets/img/schools.png"
						alt="Schools Châteauguay"
						fill
						className="object-cover rounded-br-[5rem] hover:brightness-95 transition"
						priority
					/>
				</div>
			</div>

			{/* Text content */}
			<div
				ref={textRef}
				className={`w-full md:w-1/2 flex transition-transform duration-700 ${
					animateText ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
				}`}
			>
				<div className="text-gray-800 text-base leading-relaxed p-4 flex flex-col justify-center">
					{textData.map((para, idx) => (
						<p key={idx} className="mb-4">
							{para}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default SchoolsTab;
