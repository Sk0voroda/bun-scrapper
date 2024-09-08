import { Elysia } from "elysia";

import { product_v1 } from "./v1/product";
import { closeBrowser } from "./playwright";

const app = new Elysia()
	.get("/", () => "1688 Scrapper")
	.use(product_v1)
	.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

process.on("SIGINT", async () => {
	console.log("closing...");

	await closeBrowser();
	process.exit();
});
