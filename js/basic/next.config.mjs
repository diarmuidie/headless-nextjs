import { createRequire } from "module";
const require = createRequire(import.meta.url);

const getAtlasCacheHandler = async (config = {}) => {
  // if (process.env.ATLAS_CACHE_HANDLER_ENABLED === undefined) {
  //     return { ...config };
  // }

  // const { CacheHandler } = await import("./.atlas/atlas-cache-handler.js");
  // const require = createRequire(import.meta.url);
  // const { atlasCacheHandler } = require.resolve('./.atlas/atlas-cache-handler.js');


  return {
    ...config,
    ...{
      incrementalCacheHandlerPath: require.resolve('./.atlas/atlas-cache-handler.js'),
      isrMemoryCacheSize: 0,
    },
  };
};

const nextConfig = {
  experimental: {
    ...(await getAtlasCacheHandler()),
  },
};

export default nextConfig
