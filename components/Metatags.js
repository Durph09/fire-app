import Head from 'next/head';

export default  function MetaTags ({title, description, image}) {
// start with theses meta tags are look at the doc for open graph
    return (
        <Head>
        <title>{title}</title>
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@durph09' />
        <meta name= "twitter: title" content={title} />
        <meta name = "twitter:image" content={image} />

        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og: image' content={image} />

        </Head>
    )
}