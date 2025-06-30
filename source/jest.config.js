/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    setupFiles: ['dotenv/config'],
    verbose: true,
    testTimeout: 30000, // Increased timeout for API calls
    moduleNameMapper: {
        "^@core(.*)$": "<rootDir>/src/core$1",
        "^@domains(.*)$": "<rootDir>/src/domains$1",
        "^@shared(.*)$": "<rootDir>/src/shared$1",
        "^@utils(.*)$": "<rootDir>/src/utils$1",
        "^@modules(.*)$": "<rootDir>/src/modules$1"

    },
}
