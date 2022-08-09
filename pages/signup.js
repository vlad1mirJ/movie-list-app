import React from "react"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import SignUp from "../components/SignUp.jsx"
import Nav from "../components/Nav.jsx"
import Router from "next/router"
import { useSession } from "next-auth/react"

function Signup() {
  const { data: session, status } = useSession()
  if (status === "loading") {
    return <div>Loading...</div>
  } else if (status === "unauthenticated") {
    return (
      <>
        <Head>
          <title>Sign Up</title>
        </Head>
        <header className={styles.header}>
          <Nav />
          <SignUp />
        </header>
      </>
    )
  } else Router.push("/list")
}

export default Signup
