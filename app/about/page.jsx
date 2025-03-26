"use client";

import { LanguageProvider } from "@app/components/LanguageContext";
import Navbar from "@app/components/Navbar";
import Footer from "@app/components/Footer";
import About from "@app/components/About";

const AboutCompany = () => {
	return (
		<LanguageProvider>
			<Navbar />
			<About />
			<Footer />
		</LanguageProvider>
	);
};

export default AboutCompany;
