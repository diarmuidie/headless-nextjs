import { NextConfig } from 'next';

/**
 * @deprecated since version 1.5.0, use `WPEConfig` instead
 */
interface AtlasConfig extends WPEConfig {
}
interface WPEConfig extends Record<string, any> {
    /**
     * If set to `false`, the Headless Platform remote cache handler will not be added (defaults to true)
     */
    remoteCacheHandler?: boolean;
}
/**
 * This is an alias for withWPEConfig
 * @deprecated since version 1.5.0, use `withWPEConfig` instead
 * @param nextConfig
 * @param atlasConfig
 * @returns The modified config
 */
declare function withAtlasConfig(nextConfig: NextConfig, atlasConfig?: AtlasConfig): NextConfig;
/**
 * Add Headless Platform options to the config to be exported from the user's Next.js config file
 * @param nextConfig
 * @param wpeConfig
 * @returns The modified config
 */
declare function withWPEConfig(nextConfig: NextConfig, wpeConfig?: WPEConfig): NextConfig;

export { type AtlasConfig, type WPEConfig, withAtlasConfig, withWPEConfig };
