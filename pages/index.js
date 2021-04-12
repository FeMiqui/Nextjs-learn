import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
/*
server side rendering template  -> for data at the requested time. (pre-render a page whose
  data must be fetched at request time)
  Alternative, when you don't need to pre-render data: client-side rendering:
    Statically generate (pre-render) parts of the page that do not require external data.
    When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.
    if fetching data on client-side :try swr from Next
One example would be something that depends on actual time.
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
*/
export default function Home({ allPostsData }) {
  return (
    <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p> Welcome stranger! I'm Fellipe, a student at GMU finishing my bachelors in CS and BME. This project is my introducution to
        Next.js ! I hope to learn more about it and implement it in my next application.
      </p>
      <p>
        (This is a sample website - you’ll be building a site like this on{' '}
        <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
      </p>
    </section>
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
  </Layout>
  )
}
