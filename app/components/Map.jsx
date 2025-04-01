"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import TransportationTab from "./TransportationTab";
import SchoolsTab from "./SchoolsTab";
import HospitalsTab from "./HospitalsTab";
import EntertainmentTab from "./EntertainmentTab";
import Image from "next/image";

const tabs = [
	{
		id: "transportation",
		label: "Transportation",
		icon: "/assets/img/icons/transportation.svg",
	},
	{ id: "schools", label: "Schools", icon: "/assets/img/icons/schools.svg" },
	{
		id: "hospitals",
		label: "Hospitals",
		icon: "/assets/img/icons/hospitals.svg",
	},
	{
		id: "entertainment",
		label: "Entertainment",
		icon: "/assets/img/icons/entertainment.svg",
	},
];

const Map = () => {
	const [activeTab, setActiveTab] = useState("transportation");

	const renderTab = () => {
		switch (activeTab) {
			case "transportation":
				return <TransportationTab />;
			case "schools":
				return <SchoolsTab />;
			case "hospitals":
				return <HospitalsTab />;
			case "entertainment":
				return <EntertainmentTab />;
			default:
				return null;
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1 }}
			className="w-full max-w-6xl mx-auto mt-8 px-4"
		>
			<h2 className="text-3xl font-bold uppercase text-center mb-6 text-gray-800">
				Nearby
			</h2>

			<div className="border-2 border-gray-300 rounded-lg bg-white shadow-sm">
				{/* Tabs - shrink forever, no wrap */}
				<div className="flex justify-center items-center  bg-gray-100 border-b border-gray-300 py-2 gap-1 flex-nowrap w-full">
					{tabs.map(({ id, label, icon }) => {
						const isActive = activeTab === id;

						return (
							<motion.button
								key={id}
								animate={{ scale: isActive ? 1.1 : 1 }}
								whileHover={!isActive ? { scale: 1.05 } : {}}
								whileTap={{ scale: 0.95 }}
								transition={{ duration: 0.2 }}
								onClick={() => setActiveTab(id)}
								className={`flex-1 min-w-0 h-12 px-1 mx-[8px] sm:mx-[12px] md:mx-[18px] flex items-center justify-center rounded text-white text-[3vw] sm:text-sm transition-all duration-200 ${
									isActive ? "bg-black border-b-2 border-white" : "bg-gray-500"
								}`}
							>
								{/* Text on sm+, icon only on smaller */}
								<span className="hidden sm:block truncate">{label}</span>
								<span className="block sm:hidden w-5 h-5">
									<Image src={icon} alt={label} width={20} height={20} />
								</span>
							</motion.button>
						);
					})}
				</div>

				{/* Tab content */}
				<div className="p-6">{renderTab()}</div>
			</div>
		</motion.div>
	);
};

export default Map;
