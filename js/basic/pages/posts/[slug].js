import { client } from "../../lib/apollo";
import { gql } from "@apollo/client";
import Head from "next/head";
const fs = require('fs');

export default function SlugPage({ post }) {
  return (
    <div>
      <Head>
        <title>Headless WP Next Starter</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <main>
        <div className="siteHeader">
          <h1 className="title">{post.title}</h1>
          <p>
            ✍️ &nbsp;&nbsp;
            {`${post.author.node.firstName} ${post.author.node.lastName}`} | 🗓️
            &nbsp;&nbsp;{new Date(post.date).toLocaleDateString()}
          </p>
        </div>
        <article dangerouslySetInnerHTML={{ __html: post.content }}></article>
      </main>
    </div>
  );
}


export async function getServerSideProps(context) {
  const GET_POST = gql`
    query PostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        content
        date
        author {
          node {
            firstName
            lastName
          }
        }
      }
    }
  `;

  const response = await client.query({
    query: GET_POST,
    variables: {
      id: context.params.slug,
    },
  });


  const post = response?.data?.post;

  if (post) {
    const tags = response?.data?.extensions?.queryAnalyzer?.keys;
    context.res.setHeader("Cache-Tags", tags.replace(' ', ','));

    const url = context.resolvedUrl
    const manifestLocation = 'manifest.json';

    // Update the manifest file in place
    fs.readFile(manifestLocation, 'utf8', function readFileCallback(err, data) {
      let obj = {};

      if (err) {
        if (err.code !== 'ENOENT') {
          console.log(err);
          return;
        }
      } else {
        obj = JSON.parse(data);
      }

      obj[url] = tags.split(' ');
      let json = JSON.stringify(obj, null, 2);
      fs.writeFile(manifestLocation, json, 'utf8', err => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  return {
    props: {
      post,
    },
  };
}
