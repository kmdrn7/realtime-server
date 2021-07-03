import {default as keys} from "@/env";
import dotenv from "dotenv-flow";
import {log} from "./log";

const PRODUCTION = "production";
const TEST = "test";

type Env = {
  [key in typeof keys[number]]: string;
};

export function isProduction() {
  return env.NODE_ENV.toLowerCase() === PRODUCTION;
}

export function isTest() {
  return env.NODE_ENV.toLowerCase() === TEST;
}

export function isDevelopment() {
  return !isProduction() && !isTest();
}

dotenv.config({purge_dotenv: true});

export const env = Object.fromEntries(
  Object.keys(process.env).map((key) => [key, process.env[key] ?? ""]),
) as Env;
for (const key of keys) {
  const value = env[key];
  if (!value) {
    log.warn(`🛑 Environment variable ${key} is empty!`);
  } else if (isDevelopment()) {
    log.debug(`${key}: ${value}`);
  }
}