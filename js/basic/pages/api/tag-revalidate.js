const fs = require('fs');

export default async function handler(req, res) {
  const tag = req.query.tag

  if (!tag) {
    res.status(500).send('Tag query param not found')
  }

  try {
    const manifestLocation = 'manifest.json';

    let manifest = {}

    const data = fs.readFileSync(manifestLocation, 'utf8');

    manifest = JSON.parse(data);

    for (const [url, tags] of Object.entries(manifest)) {
      if (tags.includes(tag)) {
        console.log(`Revalidate ${url}`);
        await res.revalidate(url)
      }
    }

    return res.json({ revalidated: true })
  } catch (err) {
    console.log(err)
    return res.status(500).send('Error revalidating')
  }
}
