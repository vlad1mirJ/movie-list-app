import React from "react"
import styles from "../styles/Hero.module.css"
import Link from "next/link"

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.card}>
        <h1 className={styles.title}>Best watch list</h1>
        <h2 className={styles.subtitle}>
          {
            "Vladimir has one of the best movie tastes in the world. He practised for nearly a decade by watching all kind of movies, shows, animes and youtube videos. Don't belive? Then check it out!"
          }
        </h2>
        <h2 className={styles.subtitle} id={styles.ready}>
          Ready to see it?
        </h2>
        <Link href="/list">
          <button className={styles.signup}>Get started</button>
        </Link>
      </div>
    </div>
  )
}

export default Hero
