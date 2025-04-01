"use client";

import React, { useContext, useRef, useEffect, useState } from "react";
import Image from "next/image";
import { LanguageContext } from "./LanguageContext";
import hospitalText_en from "@public/assets/text/en/hospitalsTab_en";
import hospitalText_fr from "@public/assets/text/fr/hospitalsTab_fr";

const HospitalsTab = () => {
	const { language } = useContext(LanguageContext);
	const textData = language === "fr" ? hospitalText_fr : hospitalText_en;

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
							"https://www.google.com/maps/place/20+Bd+Industriel,+Ch%C3%A2teauguay,+QC+J6J+4Z2/@45.3571172,-73.7355027,14.15z/data=!4m9!1m2!2m1!1sclinics!3m5!1s0x4cc914937f112f53:0x3409e8f01cd0fe5d!8m2!3d45.3672779!4d-73.7087202!16s%2Fg%2F11c3q3psp_?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
							"_blank"
						)
					}
				>
					<Image
						src="/assets/img/hospitals.png"
						alt="Hospitals in Châteauguay"
						fill
						className="object-cover rounded-tr-[5rem] hover:brightness-95 transition"
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

export default HospitalsTab;
