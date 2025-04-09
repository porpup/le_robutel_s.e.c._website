"use client";

import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "./LanguageContext";
import about_en from "@public/assets/text/en/about_en";
import about_fr from "@public/assets/text/fr/about_fr";

const About = () => {
	const { language } = useContext(LanguageContext);
	const content = language === "fr" ? about_fr : about_en;
	const condoUrl =
		language === "fr"
			? "https://condoslouisalexandre.ca/"
			: "https://condoslouisalexandre.ca/en/";

	return (
		<section className="max-w-4xl mx-auto px-4 py-12">
			<AnimatePresence mode="wait">
				<motion.div
					key={language} // This triggers animation on language change
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-3xl font-bold mb-6 text-center">
						{content.sectionTitle}
					</h2>

					<p className="mb-6">{content.intro}</p>

					<h3 className="text-2xl font-semibold mt-8 mb-2">
						{content.honoringTitle}
					</h3>
					<p className="mb-6">{content.honoringText}</p>

					<h3 className="text-2xl font-semibold mt-8 mb-2">
						{content.visionTitle}
					</h3>
					<p className="mb-6">{content.visionText}</p>

					<h3 className="text-2xl font-semibold mt-8 mb-2">
						{content.commitmentTitle}
					</h3>
					<p className="mb-4">{content.commitmentText}</p>
					<ul className="list-disc list-inside mb-6">
						{content.commitmentPoints.map((point, index) => (
							<motion.li
								key={index}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								{point}
							</motion.li>
						))}
					</ul>

					<h3 className="text-2xl font-semibold mt-8 mb-2">
						{content.impactTitle}
					</h3>
					<p>{content.impactText}</p>
				</motion.div>
			</AnimatePresence>
		</section>
	);
};

export default About;
