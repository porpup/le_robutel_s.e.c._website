"use client";

import React, { useContext, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { LanguageContext } from "./LanguageContext";
import inTheArea_en from "@public/assets/text/en/inTheArea_en";
import inTheArea_fr from "@public/assets/text/fr/inTheArea_fr";
import TransportationTab from "./TransportationTab";
import SchoolsTab from "./SchoolsTab";
import HealthFacilitiesTab from "./HealthFacilitiesTab";
import EntertainmentTab from "./EntertainmentTab";

const InTheArea = () => {
	const { language } = useContext(LanguageContext);
	const [displayLanguage, setDisplayLanguage] = useState(language);
	const [animationState, setAnimationState] = useState("idle"); // 'idle' | 'animatingOut' | 'animatingIn'
	const translations = displayLanguage === "en" ? inTheArea_en : inTheArea_fr;
	const [activeTab, setActiveTab] = useState("transportation");
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	const tabs = [
		{
			id: "transportation",
			label: translations.tabs.transportation,
			icon: "/assets/img/icons/transportation.svg",
		},
		{
			id: "schools",
			label: translations.tabs.schools,
			icon: "/assets/img/icons/schools.svg",
		},
		{
			id: "hospitals",
			label: translations.tabs.hospitals,
			icon: "/assets/img/icons/hospitals.svg",
		},
		{
			id: "entertainment",
			label: translations.tabs.entertainment,
			icon: "/assets/img/icons/entertainment.svg",
		},
	];

	const renderTab = () => {
		switch (activeTab) {
			case "transportation":
				return <TransportationTab />;
			case "schools":
				return <SchoolsTab />;
			case "hospitals":
				return <HealthFacilitiesTab />;
			case "entertainment":
				return <EntertainmentTab />;
			default:
				return null;
		}
	};

	useEffect(() => {
		if (language !== displayLanguage) {
			// Start animation out
			setAnimationState("animatingOut");

			// After out animation completes, change content
			const timer = setTimeout(() => {
				setDisplayLanguage(language);
				setAnimationState("animatingIn");

				// After in animation completes, return to idle
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
					className="w-full max-w-6xl mx-auto mt-8 px-4"
				>
					{/* Title */}
					<motion.h2
						className="text-3xl font-bold uppercase text-center mb-6 text-black"
						initial={{ opacity: 0, y: 20 }}
						animate={getAnimationState()}
						transition={{ duration: 0.3, delay: 0.1 }}
					>
						{translations.nearby}
					</motion.h2>

					{/* Main container with borders */}
					<motion.div
						className="border-2 border-gray-300 rounded-lg bg-[#eff8f8] shadow-sm"
						initial={{ opacity: 0, y: 20 }}
						animate={getAnimationState()}
						transition={{ duration: 0.3, delay: 0.2 }}
					>
						{/* Tabs */}
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
							{tabs.map(({ id, label, icon }) => {
								const isActive = activeTab === id;

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
										<span
											className="hidden sm:block text-center leading-tight"
											dangerouslySetInnerHTML={{ __html: label }}
										/>
										<span className="block sm:hidden w-5 h-5">
											<Image src={icon} alt={label} width={20} height={20} />
										</span>
									</motion.button>
								);
							})}
						</motion.div>

						{/* Content */}
						<AnimatePresence mode="wait">
							<motion.div
								key={`${displayLanguage}-${activeTab}`}
								initial={{ opacity: 0, y: 20 }}
								animate={getAnimationState()}
								transition={{ duration: 0.3 }}
								className="p-6"
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

export default InTheArea;
