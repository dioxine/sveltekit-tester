/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	testDir: 'tests',
	webServer: {
		command: 'npm run build && npm run preview',
		port: 3000
	}
};

export default config;
