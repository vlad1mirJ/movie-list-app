import Link from "next/link"
import React from "react"
import styles from "../styles/Popup.module.css"

function Popup({ setShowPopup }) {
  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <p className={styles.text}>
          You have to{" "}
          <Link href="/login">
            <span className={styles.signin}>Sign In</span>
          </Link>
        </p>
        <p
          className={styles.close}
          onClick={() => setShowPopup((prev) => !prev)}
        >
          X
        </p>
      </div>
    </div>
  )
}

export default Popup
