"use client";

import React, { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import firstTowerTab_en from "@public/assets/text/en/firstTowerTab_en";
import firstTowerTab_fr from "@public/assets/text/fr/firstTowerTab_fr";

const FirstTowerTab = () => {
	const { language } = useContext(LanguageContext);
	const content = language === "en" ? firstTowerTab_en : firstTowerTab_fr;

	return <p className="p-6">{content.description}</p>;
};

export default FirstTowerTab;
