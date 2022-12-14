import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Nav from "../components/Nav.jsx"
import Hero from "../components/Hero.jsx"
import { useSession } from "next-auth/react"
import Router from "next/router"

export default function Home() {
  const { data: session, status } = useSession()
  if (status === "loading") {
    return <div>Loading...</div>
  } else if (!session) {
    return (
      <div className="">
        <Head>
          <title>Favorite movies</title>
          <meta name="description" content="Best movie watchlist" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className={styles.header}>
          <Nav />
          <Hero />
        </header>
      </div>
    )
  } else Router.push("/list")
}
