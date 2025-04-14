// simple example for testing it manually from your browser.
export default function handler(req, res) {
    res.setDraftMode({ enable: true })
    res.redirect(req.query.slug)
    res.end('Draft mode is enabled')
  }