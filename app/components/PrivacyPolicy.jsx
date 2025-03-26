"use client";

import React, { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import privacyPolicy_en from "@public/assets/text/en/privacyPolicy_en";
import privacyPolicy_fr from "@public/assets/text/fr/privacyPolicy_fr";

const PrivacyPolicy = () => {
	const { language } = useContext(LanguageContext);
	const t = language === "fr" ? privacyPolicy_fr : privacyPolicy_en;

	return (
		<div className="min-h-screen bg-white px-4 pt-[80px] pb-16 flex justify-center">
			<div className="max-w-4xl w-full">
				<h1 className="text-3xl font-bold mb-6">{t.title}</h1>
				<p className="mb-10 whitespace-pre-line text-gray-800">{t.intro}</p>

				{t.sections.map((section, index) => (
					<div key={index} className="mb-8">
						<h2 className="text-xl font-semibold mb-2 text-black">
							{section.title}
						</h2>
						<p className="whitespace-pre-line text-gray-700">
							{section.content}
						</p>
					</div>
				))}

				<p className="mt-10 text-sm italic text-gray-600">{t.lastUpdated}</p>
			</div>
		</div>
	);
};

export default PrivacyPolicy;
