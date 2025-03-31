"use client";

import { LanguageProvider } from "@app/components/LanguageContext";
import Navbar from "@app/components/Navbar";
import Welcome from '@app/components/Welcome';
import Map from "@app/components/Map";
import Footer from "@app/components/Footer";

const Home = () => {
	return (
		<LanguageProvider>
			<Navbar />
			<Welcome />
			<Map />
			<Footer />
		</LanguageProvider>
	);
};

export default Home;
