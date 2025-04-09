"use client";

import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "./LanguageContext";
import privacyPolicy_en from "@public/assets/text/en/privacyPolicy_en";
import privacyPolicy_fr from "@public/assets/text/fr/privacyPolicy_fr";

const PrivacyPolicy = () => {
	const { language } = useContext(LanguageContext);
	const t = language === "fr" ? privacyPolicy_fr : privacyPolicy_en;

	return (
		<div className="min-h-screen bg-white px-4 pt-[80px] pb-16 flex justify-center">
			<div className="max-w-4xl w-full">
				<AnimatePresence mode="wait">
					<motion.div
						key={language} // This triggers animation on language change
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5 }}
					>
						<h1 className="text-3xl font-bold mb-6">{t.title}</h1>
						<p className="mb-10 whitespace-pre-line text-gray-800">{t.intro}</p>

						{t.sections.map((section, index) => (
							<motion.div
								key={`${language}-${index}`} // Unique key for each section
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1, duration: 0.3 }}
								className="mb-8"
							>
								<h2 className="text-xl font-semibold mb-2 text-black">
									{section.title}
								</h2>
								<p className="whitespace-pre-line text-gray-700">
									{section.content}
								</p>
							</motion.div>
						))}

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: t.sections.length * 0.1, duration: 0.3 }}
							className="mt-10 text-sm italic text-gray-600"
						>
							{t.lastUpdated}
						</motion.p>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default PrivacyPolicy;
