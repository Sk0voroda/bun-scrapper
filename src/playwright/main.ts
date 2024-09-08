import { closeBrowser, getBrowser } from ".";

import { scrape_product } from "./product";

(async () => {
	const browser = await getBrowser();
	await scrape_product(
		browser,
		"https://detail.1688.com/offer/742107161996.html?offerId=742107161996&extStr=0.008337020874023438..0.0016556978225708008..0.0040..0.1370..fI2ISwg..122710002..0..0..1..2..815c8719-9b3d-45a3-810f-0f8d8543d002..offer..742107161996..1..799662717995..363..1032768..58..organic..0..fI2ISwg..0....long..0..9.594309944655791E-10..4....1.0E-10....54..9439c427bab0e2fc84956600cd82fd60..1000003..na61..1007.50972.375248.0.._....78..commonScene_78..null&object_id=742107161996&object_sub_type=normal&object_type=offer&tpp_expodata=742107161996..213e38f617247834572954575eef93..815c8719-9b3d-45a3-810f-0f8d8543d002..1724783457..78....1007.38042.291243.0..businessType:normal&traceId=213e38f617247834572954575eef93&spm=a260k.home2024.recommendpart.0&scm=1007.50972.375248.0"
	);

	await closeBrowser();
})();
