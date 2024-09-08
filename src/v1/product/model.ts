import { Elysia, t } from "elysia";

import { ProductErrors } from "../../errors";

export const productModel = new Elysia().model({
	productBody: t.Object(
		{
			url: t.String({
				minLength: 1,
				error: { type: ProductErrors.EmptyUrl, message: "Product url is empty!" }
			})
		},
		{
			error: { type: ProductErrors.EmptyBody, message: "Product url is missing!" }
		}
	),
	productOkResponse: t.Object({
		title: t.Nullable(t.String())
	}),
	productErrorResponse: t.Object({
		type: t.String(),
		message: t.String()
	})
});
