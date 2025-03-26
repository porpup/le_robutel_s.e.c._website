"use client";

import { LanguageProvider } from "@app/components/LanguageContext";
import Navbar from "@app/components/Navbar";
import Footer from "@app/components/Footer";
import PrivacyPolicy from '@app/components/PrivacyPolicy';

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
