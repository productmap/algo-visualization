import type { Config } from "@jest/types";

const esModules = ["nanoid"].join("|");

const config: Config.InitialOptions = {
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  moduleNameMapper: { "^uuid$": "uuid" },
};

export default config;