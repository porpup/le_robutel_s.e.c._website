"use client";

import { LanguageProvider } from "@app/components/LanguageContext";
import Navbar from "@app/components/Navbar";
import Footer from "@app/components/Footer";
import Form from "@app/components/Form";

const ContactUs = () => {
	return (
		<LanguageProvider>
			<Navbar />
			<Form />
			<Footer />
		</LanguageProvider>
	);
};

export default ContactUs;
