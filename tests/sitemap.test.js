import { expect, test } from '@playwright/test'

// not necessary to run this in all browsers
test.use({ browserName: 'chromium' })

test.describe('Sitemap', () => {
	test('robots.txt should reference the sitemap.xml file', async ({ request }) => {
		const robotsReq = await request.get('/robots.txt')

		const text = await robotsReq.text()

		expect(text.includes('Sitemap: https://www.leereamsnyder.com/sitemap.xml')).toBeTruthy()
	})

	test('sitemap.xml file should exist', async ({ page, context, request }) => {
		const sitemapReq = await request.get('/sitemap.xml')

		expect(sitemapReq.ok()).toBeTruthy()
		expect(sitemapReq.status()).toBe(200)
	})

	test('sitemap should not include certain values', async ({ request }) => {
		const sitemapReq = await request.get('/sitemap.xml')
		const text = await sitemapReq.text()

		// excluded routes
		expect(text).not.toContain('/404')
		expect(text).not.toContain('/offline')

		// this happened when I reused a "path" property with an opening "/"
		expect(text).not.toContain('/archives//')

		// this shouldn't be there outside of dev
		expect(text).not.toContain('/style-guide')

		// Google explicitly does not give a toss about these
		expect(text).not.toContain('<changefreq>')
		expect(text).not.toContain('<priority>')

		// Google also treats a lastmod date as extremely sus and typically ignores it
		expect(text).not.toContain('<lastmod>')
	})

	// taken mostly from https://github.com/jasongitmail/super-sitemap#playwright-test
	test('sitemap.xml is valid', async ({ isMobile, page }) => {
		await page.goto('/sitemap.xml')

		// Ensure XML is valid. Playwright parses the XML here and will error if it cannot be parsed.
		const urls = await page.$$eval('url', (urls) =>
			urls.map((url) => ({
				loc: url.querySelector('loc').textContent,
			})),
		)

		// sanity check
		expect(urls.length).toBeGreaterThan(400)

		// Ensure entries are in a valid format
		for (const url of urls) {
			expect(url.loc).toBeTruthy()
			expect(() => new URL(url.loc)).not.toThrow()
		}
	})
})
