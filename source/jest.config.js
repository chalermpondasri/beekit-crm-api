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
        "^@common(.*)$": "<rootDir>/src/common$1",
        "^@constants(.*)$": "<rootDir>/src/constants$1",
        "^@providers(.*)$": "<rootDir>/src/providers$1",
        "^@utils(.*)$": "<rootDir>/src/utils$1",
        "^@repositories(.*)$": "<rootDir>/src/repositories$1",
        "^@adapters(.*)$": "<rootDir>/src/adapters$1",
        "^@domains(.*)$": "<rootDir>/src/domains$1",
        "^@controllers(.*)$": "<rootDir>/src/controllers$1",
        "^@modules(.*)$": "<rootDir>/src/modules$1",
    },
}
