/** @type {import('next-sitemap').IConfig} */
const config = {
	siteUrl: "https://lerobutel.com", // change to your real domain
	generateRobotsTxt: true,
	sitemapSize: 5000, // optional
	changefreq: "weekly",
	priority: 0.7,
};

module.exports = config;
