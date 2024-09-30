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
    await import("./infra/storage");
    const api = await import("./infra/api");
    const site = await import("./infra/remix");
    return {
      api: api.myApi.url,
      site: site.site.url,
    };
  },
});
