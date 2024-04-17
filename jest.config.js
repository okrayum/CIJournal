module.exports = {
  testEnvironment: 'jsdom',
  reporters: [
    "default",
    ["jest-junit", {
      outputDirectory: "./test",
      outputName: "jest-test-results.json",
    }],
  ],
};