"use client";

import React, { useContext, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { LanguageContext } from "./LanguageContext";
import discoverOurTowers_en from "@public/assets/text/en/discoverOurTowers_en";
import discoverOurTowers_fr from "@public/assets/text/fr/discoverOurTowers_fr";
import FirstTowerTab from "./FirstTowerTab";
import SecondTowerTab from "./SecondTowerTab";
import ThirdTowerTab from "./ThirdTowerTab";

const DiscoverOurTowers = () => {
	const { language } = useContext(LanguageContext);
	const [displayLanguage, setDisplayLanguage] = useState(language);
	const [animationState, setAnimationState] = useState("idle");
	const translations =
		displayLanguage === "en" ? discoverOurTowers_en : discoverOurTowers_fr;
	const [activeTab, setActiveTab] = useState("tower1");
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	const tabs = [
		{ id: "tower1", labelKey: "tower1" },
		{ id: "tower2", labelKey: "tower2" },
		{ id: "tower3", labelKey: "tower3" },
	];

	const renderTab = () => {
		switch (activeTab) {
			case "tower1":
				return <FirstTowerTab />;
			case "tower2":
				return <SecondTowerTab />;
			case "tower3":
				return <ThirdTowerTab />;
			default:
				return null;
		}
	};

	useEffect(() => {
		if (language !== displayLanguage) {
			setAnimationState("animatingOut");
			const timer = setTimeout(() => {
				setDisplayLanguage(language);
				setAnimationState("animatingIn");
				const timer2 = setTimeout(() => {
					setAnimationState("idle");
				}, 300);
				return () => clearTimeout(timer2);
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [language, displayLanguage]);

	const getAnimationState = () => {
		if (!isInView) return { opacity: 0, y: 20 };
		if (animationState === "animatingOut") return { opacity: 0, y: -20 };
		if (animationState === "animatingIn") return { opacity: 1, y: 0 };
		return { opacity: 1, y: 0 };
	};

	return (
		<div ref={ref}>
			<AnimatePresence mode="wait">
				<motion.div
					key={displayLanguage}
					initial={{ opacity: 0, y: 20 }}
					animate={getAnimationState()}
					transition={{ duration: 0.3 }}
					className="w-full max-w-6xl mx-auto mt-8 mb-8 px-4"
				>
					<motion.h2
						className="text-3xl font-bold uppercase text-center mb-6 text-black"
						initial={{ opacity: 0, y: 20 }}
						animate={getAnimationState()}
						transition={{ duration: 0.3, delay: 0.1 }}
					>
						{translations.title}
					</motion.h2>

					<motion.div
						className="border-2 border-gray-300 rounded-lg bg-white shadow-sm"
						initial={{ opacity: 0, y: 20 }}
						animate={getAnimationState()}
						transition={{ duration: 0.3, delay: 0.2 }}
					>
						<motion.div
							className="flex justify-center items-center bg-gray-300 border-b border-gray-300 py-2 gap-1 flex-nowrap w-full"
							initial={{ opacity: 0, scale: 0.95 }}
							animate={
								!isInView
									? { opacity: 0, scale: 0.95 }
									: animationState === "animatingOut"
									? { opacity: 0, scale: 0.95 }
									: { opacity: 1, scale: 1 }
							}
							transition={{ duration: 0.3, delay: 0.3 }}
						>
							{tabs.map(({ id, labelKey }) => {
								const isActive = activeTab === id;
								const label = translations.tabs[labelKey];
								return (
									<motion.button
										key={`${displayLanguage}-${id}`}
										animate={{ scale: isActive ? 1.1 : 1 }}
										whileHover={!isActive ? { scale: 1.05 } : {}}
										whileTap={{ scale: 0.95 }}
										transition={{ duration: 0.2 }}
										onClick={() => setActiveTab(id)}
										className={`flex-1 min-w-0 h-12 px-1 mx-[8px] sm:mx-[12px] md:mx-[18px] flex items-center justify-center rounded text-white text-[3vw] sm:text-sm transition-all duration-200 ${
											isActive
												? "bg-black"
												: "bg-gray-500"
										}`}
									>
										<span className="text-center leading-tight">{label}</span>
									</motion.button>
								);
							})}
						</motion.div>

						<AnimatePresence mode="wait">
							<motion.div
								key={`${displayLanguage}-${activeTab}`}
								initial={{ opacity: 0, y: 20 }}
								animate={getAnimationState()}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
							>
								{renderTab()}
							</motion.div>
						</AnimatePresence>
					</motion.div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default DiscoverOurTowers;
