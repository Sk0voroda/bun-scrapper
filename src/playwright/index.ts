import { Browser } from "playwright";
import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";

chromium.use(stealth());

export let browser: Browser | null = null;

export const getBrowser = async () => {
	if (!browser) {
		browser = await chromium.launch({
			headless: true
		});
	}

	return browser;
};

export const closeBrowser = async () => {
	if (browser) {
		await browser.close();
		browser = null;
	}
};
