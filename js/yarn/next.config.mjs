/** @type {import('next').NextConfig} */
import { withAtlasConfig } from '@wpengine/atlas-next';

const nextConfig = withAtlasConfig({
  reactStrictMode: true,
});

export default nextConfig;
