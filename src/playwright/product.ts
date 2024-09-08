import { Browser } from "playwright";

import { KeysOf } from "../utils";
import { handle_unusual_trafic } from "./helpers";

export const ProductSelectors = {
	title: ".title-first-column > .title-text"
} as const;

type Selectors = KeysOf<typeof ProductSelectors>;

export const scrape_product = async (browser: Browser, url: string) => {
	const context = await browser.newContext();

	const page = await context.newPage();

	await page.goto(url);

	// NOTE: wait untile "load" ("domcontentloaded") will fail
	await page.waitForLoadState("load");

	await handle_unusual_trafic(page);

	let elements: Record<Selectors, string> | null = null;

	for (const selector in ProductSelectors) {
		const value = await page.locator(ProductSelectors[selector as Selectors]).first();
		const content = await value.textContent();

		if (!elements) {
			elements = {
				[selector as Selectors]: content ?? ""
			};
		} else {
			elements[selector as Selectors] = content ?? "";
		}
	}

	await page.close();
	await context.close();

	return elements;
};
