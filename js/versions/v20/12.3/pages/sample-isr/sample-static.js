import Head from 'next/head'

export default function Home({generated, draftMode}) {
  return (
    <div className="container">
      <main>
        <p>(ISR) Server Side Generated page Revalidated every 28 seconds, last revalidate: {generated} (DraftMode: {draftMode})</p>
      </main>
    </div>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps(context) {
  let date = new Date();
  const generated = date.toString()

  let draftMode = "false"

  if (context.draftMode) {
    draftMode = "true"
  }

  return {
    props: {
      generated,
      draftMode
    },

    revalidate: 28,
  }
}
