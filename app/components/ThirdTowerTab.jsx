"use client";

import React, { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import secondTowerTab_en from "@public/assets/text/en/secondTowerTab_en";
import secondTowerTab_fr from "@public/assets/text/fr/secondTowerTab_fr";

const ThirdTowerTab = () => {
	const { language } = useContext(LanguageContext);
	const translations =
		language === "en" ? secondTowerTab_en : secondTowerTab_fr;

	return (
		<div
			className="relative w-full flex items-center justify-center"
			style={{
				aspectRatio: "16/9",
				minHeight: "300px",
				height: "clamp(300px, 50vh, 500px)",
			}}
		>
		

			{/* Text */}
			<div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center space-y-2">
				<h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 drop-shadow-md">
					{translations.comingSoon}
				</h2>
				<h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 drop-shadow-md">
					{translations.underDevelopment}
				</h3>
			</div>
		</div>
	);
};

export default ThirdTowerTab;
