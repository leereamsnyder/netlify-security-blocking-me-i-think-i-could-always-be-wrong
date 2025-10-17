import { test, expect } from '@playwright/test'

// these were Cloudinary, then Netlify’s (beta) Image CDN
test.describe('Image CDN rewrites for images', () => {
	test('should successfully request an auto-optimized image', async ({ page }) => {
		page.on('response', async (res) => {
			await expect(res.status()).toBe(200)
		})

		await page.goto('/auto-optimized-image/images/blog/a-bit-more-ge-nasty-toaster.jpeg')
	})

	test('should successfully request an on-demand resized + optimized image', async ({ page }) => {
		page.on('response', async (res) => {
			await expect(res.status()).toBe(200)
		})

		await page.goto(
			'/resized-n-optimized-image/w/256/q/50/images/blog/a-bit-more-ge-nasty-toaster.jpeg',
		)
	})
})
