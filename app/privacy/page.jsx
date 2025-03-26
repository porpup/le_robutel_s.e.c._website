"use client";

import { LanguageProvider } from "@app/components/LanguageContext";
import Navbar from "@app/components/Navbar";
import PrivacyPolicy from "@app/components/PrivacyPolicy";
import Footer from "@app/components/Footer";

const Privacy = () => {
	return (
		<LanguageProvider>
			<Navbar />
			<PrivacyPolicy />
			<Footer />
		</LanguageProvider>
	);
};

export default Privacy;
