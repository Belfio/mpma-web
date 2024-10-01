/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "mpma-web",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const buckets = await import("./infra/storage");
    const db = await import("./infra/database");
    const api = await import("./infra/api");
    const site = await import("./infra/remix");

    return {
      api: api.myApi.url,
      site: site.site.url,
    };
  },
});
