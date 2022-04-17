module.exports = {
	testPathIgnorePatterns: ["/node_modules", "/.next"],
	setupFilesAfterEnv: [
		"<rootDir>/src/setupTests.ts"
	],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
	},
	testEnvironment: "jsdom",
	collectCoverage: true,
}