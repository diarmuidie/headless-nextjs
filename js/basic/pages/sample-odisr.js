import Head from 'next/head'

export default function Home({generated}) {
  return (
    <div className="container">
      <Head>
        <title>ISR</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          ● (On-demand ISR) Server Side Generated page
        </h1>
        <p>Visit <a href="/api/revalidate?page=/sample-odisr">/api/revalidate?page=/sample-odisr</a> to revalidate, last revalidate: {generated}</p>
      </main>
    </div>
  )
}

export async function getStaticProps(context) {
  if (context.draftMode) {
    // dynamic data
    let date = new Date();
    const generated = date.toString()

    return {
      props: {
        generated,
      },
      revalidate: 1
    }
  }
  return {
    props: {
      generated: 'Not in draft mode'
    },
    revalidate: 1,
  }
}
