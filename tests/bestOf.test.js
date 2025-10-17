import { expect, test } from '@playwright/test'

test.describe('Simply The Best page', () => {
	// see https://github.com/leereamsnyder/leereamsnyder.com/issues/676
	test('should have a rel="preload" for the hero image’s dithered image src', async ({ page }) => {
		await page.goto('/simply-the-best')

		const ditheredImagePreload = await page.locator('css=link[rel="preload"][as="image"]')

		expect(ditheredImagePreload).toBeAttached()

		const href = await ditheredImagePreload.evaluate((link) => link.getAttribute('href'))

		// this should not be a root-relative url
		// it should have an origin
		expect(href.startsWith('/')).toBeFalsy()
		expect(href.startsWith('http')).toBeTruthy()
	})
})
