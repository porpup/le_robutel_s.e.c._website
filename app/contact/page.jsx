"use client";

import { LanguageProvider } from "@app/components/LanguageContext";
import Navbar from "@app/components/Navbar";
import Form from "@app/components/Form";
import Footer from "@app/components/Footer";

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
