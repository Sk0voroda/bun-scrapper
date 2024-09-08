import { GeneralErrors } from "../errors";

import Either from "fp-ts/Either";

export const extract_url = (url: string) =>
	Either.tryCatch(
		() => {
			const page_url = new URL(url);
			return page_url.origin + page_url.pathname;
		},
		() => ({ type: GeneralErrors.NotValidUrl, message: "Not valid url provided!" })
	);

export type KeysOf<T> = keyof T;
