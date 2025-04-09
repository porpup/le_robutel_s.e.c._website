"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "./LanguageContext";
import inTheArea_en from "@public/assets/text/en/inTheArea_en";
import inTheArea_fr from "@public/assets/text/fr/inTheArea_fr";
import TransportationTab from "./TransportationTab";
import SchoolsTab from "./SchoolsTab";
import HealthFacilitiesTab from "./HealthFacilitiesTab";
import EntertainmentTab from "./EntertainmentTab";

const InTheArea = () => {
	const { language } = useContext(LanguageContext);
	const translations = language === "en" ? inTheArea_en : inTheArea_fr;
	const [activeTab, setActiveTab] = useState("transportation");

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

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={language} // Use language as key to trigger animation on change
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-6xl mx-auto mt-8 px-4"
			>
				<h2 className="text-3xl font-bold uppercase text-center mb-6 text-gray-800">
					{translations.nearby}
				</h2>

				<div className="border-2 border-gray-300 rounded-lg bg-white shadow-sm">
					<div className="flex justify-center items-center bg-gray-100 border-b border-gray-300 py-2 gap-1 flex-nowrap w-full">
						{tabs.map(({ id, label, icon }) => {
							const isActive = activeTab === id;

							return (
								<motion.button
									key={`${language}-${id}`} // Include language in key to force re-render
									animate={{ scale: isActive ? 1.1 : 1 }}
									whileHover={!isActive ? { scale: 1.05 } : {}}
									whileTap={{ scale: 0.95 }}
									transition={{ duration: 0.2 }}
									onClick={() => setActiveTab(id)}
									className={`flex-1 min-w-0 h-12 px-1 mx-[8px] sm:mx-[12px] md:mx-[18px] flex items-center justify-center rounded text-white text-[3vw] sm:text-sm transition-all duration-200 ${
										isActive
											? "bg-black border-b-2 border-white"
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
					</div>

					<AnimatePresence mode="wait">
						<motion.div
							key={`${language}-${activeTab}`} // Combine language and activeTab for animation
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className="p-6"
						>
							{renderTab()}
						</motion.div>
					</AnimatePresence>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default InTheArea;
