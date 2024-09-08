import { Elysia } from "elysia";
import { v4 as uuidv4 } from "uuid";
import { isLeft as isError } from "fp-ts/lib/Either";

import { getBrowser } from "../../playwright";
import { scrape_product } from "../../playwright/product";
import { productModel } from "./model";

import { extract_url } from "../../utils";
import { GeneralErrors } from "../../errors";

// azure translator
const key = "c2bd22b0890f40a88cea3fccffb7120c";
const endpoint = "https://api.cognitive.microsofttranslator.com";
const location = "westeurope";

export const product_v1 = new Elysia({ prefix: "/v1" }).use(productModel).post(
	"/product",
	async ({ body, error }) => {
		const url_result = extract_url(body.url);
		if (isError(url_result)) {
			return error(400, url_result.left);
		}

		const browser = await getBrowser();

		const url = url_result.right;
		const product = await scrape_product(browser, url);

		if (!product) {
			return error(404, { type: GeneralErrors.NotFound, message: "Product not found!" });
		}

		const params = new URLSearchParams({
			"api-version": "3.0",
			from: "zh-Hans",
			to: "uk"
		}).toString();

		const full_url = `${endpoint}/translate?${params}`;

		try {
			const response = await fetch(full_url, {
				method: "POST",
				headers: {
					"Ocp-Apim-Subscription-Key": key,
					"Ocp-Apim-Subscription-Region": location,
					"Content-type": "application/json",
					"X-ClientTraceId": uuidv4().toString()
				},
				body: JSON.stringify([{ text: product.title }])
			});

			if (response.ok) {
				const body = (await response.json()) as { translations: { text: string }[] }[];

				return {
					title: body[0].translations[0].text
				};
			}

			return error(404, { type: GeneralErrors.TranslationFailed, message: "Translation failed!" });
		} catch {
			return error(400, { type: GeneralErrors.TranslationFailed, message: "Translation failed!" });
		}
	},
	{
		body: "productBody",
		response: {
			200: "productOkResponse",
			400: "productErrorResponse",
			404: "productErrorResponse"
		}
	}
);
