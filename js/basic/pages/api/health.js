export default function handler(req, res) {
  console.log('Health check')
  res.status(200).json({ "status": "ok" })
}
