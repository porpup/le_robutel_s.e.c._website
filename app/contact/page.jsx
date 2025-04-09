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
			{/* Show footer only on small screens */}
			<div className="block md:hidden">
				<Footer />
			</div>
		</LanguageProvider>
	);
};

export default ContactUs;
