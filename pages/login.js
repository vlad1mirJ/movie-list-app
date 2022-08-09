import React from "react"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import SignIn from "../components/SignIn.jsx"
import Nav from "../components/Nav.jsx"
import { useSession } from "next-auth/react"
import Router from "next/router"

function Login() {
  const { data: session, status } = useSession()
  if (status === "loading") {
    return <div>Loading...</div>
  } else if (status === "unauthenticated") {
    return (
      <>
        <Head>
          <title>Sign In</title>
        </Head>
        <header className={styles.header}>
          <Nav />
          <SignIn />
        </header>
      </>
    )
  } else Router.push("/list")
}

export default Login
