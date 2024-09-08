import { Page } from "playwright";

export const handle_unusual_trafic = async (page: Page) => {
	try {
		const isSecurityCheck = await page
			.getByText("Sorry, we have detected unusual traffic from your network.")
			.isVisible();

		if (isSecurityCheck) {
			await page.waitForTimeout(1000);

			const slide_btn = await page.locator(".nc_iconfont.btn_slide").first();
			const slider = await page.locator(".nc-lang-cnt");

			const slider_size = await slider.boundingBox();

			if (!slider_size) {
				return "Slider not found";
			}

			const slider_width = slider_size.width;

			await slide_btn.hover({ force: true, timeout: 2000 });
			await page.mouse.down();
			await slide_btn.hover({
				force: true,
				position: { x: slider_width, y: 0 },
				timeout: 2000
			});
			await page.mouse.up();
			await page.waitForTimeout(1000);

			const isError = await page.getByText("Please refresh and try again.").isVisible();

			if (isError) {
				await page.reload({ waitUntil: "domcontentloaded" });
			}
		}
	} catch {
		return "Error";
	}
};
