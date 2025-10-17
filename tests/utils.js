export async function waitForSvelteKitHydration(page) {
	return page.waitForSelector('body.app-started')
}
