"use client";

import React, { createContext, useState, useEffect } from "react";
import navbar_en from "@public/assets/text/en/navbar_en";
import navbar_fr from "@public/assets/text/fr/navbar_fr";

export const LanguageContext = createContext();

const translations = { en: navbar_en, fr: navbar_fr };

export const LanguageProvider = ({ children }) => {
	const [language, setLanguage] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Get the saved language from local storage
		const savedLanguage = localStorage.getItem("language") || "fr";
		setLanguage(savedLanguage);
		setLoading(false);
	}, []);

	const toggleLanguage = () => {
		setLanguage((prevLanguage) => {
			const newLanguage = prevLanguage === "en" ? "fr" : "en";
			// Save the new language to local storage
			localStorage.setItem("language", newLanguage);
			return newLanguage;
		});
	};

	if (loading) {
		return null; // or a loading spinner if you prefer
	}

	return (
		<LanguageContext.Provider
			value={{ language, toggleLanguage, translations: translations[language] }}
		>
			{children}
		</LanguageContext.Provider>
	);
};
