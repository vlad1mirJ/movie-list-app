import { useState } from "react"
import styles from "../styles/Signin.module.css"
import { NextPage } from "next"
import { useSession, signIn, getProviders } from "next-auth/react"
import axios from "axios"
import Router from "next/router"
import Link from "next/link"

function SignIn() {
  const [input, setInput] = useState({ email: "", password: "" })
  const [error, setError] = useState({ emailError: null, passwordError: null })

  function handleChange(e, type) {
    setInput((prev) => ({ ...prev, [type]: e.target.value }))
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
  }

  const redirectToList = () => {
    const { pathname } = Router
    if (pathname === "/login") {
      Router.push("/list")
    }
  }

  async function loginUser() {
    const res = await signIn("credentials", {
      redirect: false,
      email: input.email,
      password: input.password,
      callbackUrl: `${window.location.origin}/list`,
    })

    res.error
      ? setError((prev) => ({ ...prev, passwordError: res.error }))
      : redirectToList()
  }

  return (
    <div className={styles.signin}>
      <div className={styles.modal}>
        <p>Sign In</p>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault()
            loginUser()
          }}
        >
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            onChange={(e) => {
              if (!isValidEmail(e.target.value)) {
                setError((prev) => ({
                  ...prev,
                  emailError: "Please, enter a valid email",
                }))
              } else setError((prev) => ({ ...prev, emailError: null }))
              handleChange(e, "email")
            }}
          />
          {error.emailError && (
            <div className={styles.error}>{error.emailError}</div>
          )}
          <input
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            onChange={(e) => {
              if (e.target.value.length < 6) {
                setError((prev) => ({
                  ...prev,
                  passwordError:
                    "Your passwors must conatin at least 6 characters",
                }))
              } else {
                setError((prev) => ({
                  ...prev,
                  passwordError: null,
                }))
              }
              handleChange(e, "password")
            }}
          />
          {error.passwordError && (
            <div className={styles.error}>{error.passwordError}</div>
          )}
          <button className={styles.button} type="submit">
            Sign In
          </button>
        </form>
        <p className={styles.bottom}>
          {"Don't have an account? "}
          <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
