# Atlas Next
Package that provides improved Next.js support on WP Engine Headless Platform.

## Prerequisites
See [our Node.js documentation](https://developers.wpengine.com/docs/atlas/platform-guides/customizing-builds/#nodejs) for supported versions of Node.js on Headless Platform

The Atlas Next package requires a minimum Next.js version of v12.2.0

For On-Demand Revalidation support a minimum Next.js version of v13.5.1 is required

_Next.js versions `>= 13.4.13 < 13.5.1` are not supported due to a [bug in Next.js](https://github.com/vercel/next.js/issues/54453)._

## Install
To install the package, run:
```sh
$ npm install --save @wpengine/atlas-next
```

## Usage
In the `next.config.(mjs|js)` file at the root of your Next.js project wrap the exported `nextConfig` with the `withWPEConfig` method:
```javascript
const { withWPEConfig } = require("@wpengine/atlas-next")

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config
}

module.exports = withWPEConfig(nextConfig)
```

## API

### withWPEConfig
```ts
withWPEConfig(nextConfig: NextConfig, wpeConfig?: WPEConfig): NextConfig
```

#### Options
`nextConfig`: The existing `nextConfig` in the `next.config.js` file

`wpeConfig`: The following options can be set

| Name | Type | Description | Default value |
| --- | --- | --- | --- |
| remoteCacheHandler | boolean | Enable or disable the Remote Cache Handler | true |

For example:

```javascript
module.exports = withWPEConfig(nextConfig, { remoteCacheHandler: false })
```


## Report an issue

To report security vulnerabilities please see [https://wpengine.com/security/](https://wpengine.com/security/).

Bugs can be reported using the [live chat in the User Portal](https://my.wpengine.com/support/)

## License

[MIT License](./LICENCE) © WP Engine
