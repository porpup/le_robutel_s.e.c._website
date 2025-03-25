"use client";

import { LanguageProvider } from "@app/components/LanguageContext";
import Navbar from "@app/components/Navbar";
import Footer from "@app/components/Footer";
import Test from "@app/components/Test";

const Home = () => {
	return (
		<LanguageProvider>
			<Navbar />
			<Test />
			<Footer />
		</LanguageProvider>
	);
};

export default Home;
