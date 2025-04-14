// import { draftMode } from 'next/headers';

// export async function GET(req, res) {
//   // Check the secret and next parameters
//   // This secret should only be known to this API route and the CMS
//   // if (req.query.secret !== 'MY_SECRET_TOKEN' || !req.query.slug) {
//   //   return res.status(401).json({ message: 'Invalid token' })
//   // }
 
//   // Fetch the headless CMS to check if the provided `slug` exists
//   // getPostBySlug would implement the required fetching logic to the headless CMS
//   // const post = await getPostBySlug(req.query.slug)
 
//   // // If the slug doesn't exist prevent draft mode from being enabled
//   // if (!post) {
//   //   return res.status(401).json({ message: 'Invalid slug' })
//   // }
 
//   // Enable Draft Mode by setting the cookie
//   // res.setDraftMode({ enable: true })
//   // res.end('Draft mode is enabled')
//   // Enable Draft Mode
//   const draft = draftMode();
//   draft.enable();
//   // Redirect to the path from the fetched post
//   // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
//   // res.redirect(post.slug)
// }
// async function getPostBySlug(slug: string) {
//   // Simulate fetching a post from a headless CMS
//   const mockPosts = [
//     { slug: 'post-1', title: 'First Post', content: 'This is the first post.' },
//     { slug: 'post-2', title: 'Second Post', content: 'This is the second post.' },
//   ];

//   // Find the post with the matching slug
//   const post = mockPosts.find((post) => post.slug === slug);

//   // Return the post if found, otherwise return null
//   return post || null;
// }

export default function handler(req, res) {
  res.setDraftMode({ enable: true }); // Enable draft mode
  res.redirect(req.query.slug); // Redirect to the provided slug
}
