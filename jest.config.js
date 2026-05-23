const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  preset:"ts-jest",
  clearMocks:true,
  collectCoverage:true,
  verbose:true,
  coverageDirectory:"coverage",
  coveragePathIgnorePatterns:["/node_modules"],
  coverageProvider: "v8",
  moduleDirectories:["node_modules","src"]
};

