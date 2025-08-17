import { reactRouter } from "@react-router/dev/vite";
import {
  sentryReactRouter,
  type SentryReactRouterBuildOptions,
} from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Resolve Sentry auth token from Node env first, then from import.meta.env (if available).
const resolvedAuthToken =
  process.env.SENTRY_AUTH_TOKEN ??
  (typeof import.meta !== "undefined"
    ? (import.meta as any).env?.SENTRY_AUTH_TOKEN
    : undefined);

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "0xarianxesl",
  project: "travel-agency",
  // An auth token is required for uploading source maps; leave undefined when not present.
  authToken: resolvedAuthToken,
  // ...
};

export default defineConfig((config) => {
  return {
    plugins: [
      tailwindcss(),
      tsconfigPaths(),
      reactRouter(),
      // Only add the Sentry plugin when an auth token is available (avoid errors in dev).
      ...(resolvedAuthToken ? [sentryReactRouter(sentryConfig, config)] : []),
    ],
    sentryConfig,
    ssr: {
      noExternal: [/@syncfusion/],
    },
  };
});
