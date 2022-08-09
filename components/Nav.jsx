import React from "react"
import styles from "../styles/Nav.module.css"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import Router from "next/router"

function Nav() {
  const { data: session, status } = useSession()
  if (status === "loading") {
    return <div></div>
  } else {
    return (
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/">
            <p className={styles.logo}>
              Netflix <span className={styles.almost}>(almost)</span>
            </p>
          </Link>
          <div className={styles.nav_btns}>
            <Link href={session ? "/" : "/login"}>
              <button
                className={styles.signin}
                onClick={(e) => {
                  if (session) {
                    e.preventDefault()
                    signOut({
                      callbackUrl: `${window.location.origin}`,
                    })
                  }
                }}
              >
                {session ? "Sign Out" : "Sign In"}
              </button>
            </Link>
            {!session && (
              <Link href="/signup">
                <button className={styles.signup}>Sign Up</button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    )
  }
}

export default Nav
