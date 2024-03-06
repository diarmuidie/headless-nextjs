const fs = require('fs');

export default async function handler(req, res) {
  const tag = req.query.tag

  if (!tag) {
    res.status(500).send('Tag query param not found')
  }

  try {
    const manifestLocation = 'manifest.json';

    const data = fs.readFileSync(manifestLocation, 'utf8');
    let manifest = JSON.parse(data);

    for (const [url, tags] of Object.entries(manifest)) {

      // Find any pages that used this tag and revalidate them
      if (tags.includes(tag)) {
        await res.revalidate(url)

        // TODO clear the Cloudflare cache for these pages
        // Can we purge the cache by the tag or do we need
        // to purge the cache for each page URL?
      }
    }

    return res.json({ revalidated: true })
  } catch (err) {
    console.log(err)
    return res.status(500).send('Error revalidating')
  }
}
