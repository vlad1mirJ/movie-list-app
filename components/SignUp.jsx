import { useState } from "react"
import styles from "../styles/Signin.module.css"
import { useSession, signIn, getProviders } from "next-auth/react"
import axios from "axios"
import Router from "next/router"
import Link from "next/link"
import { set } from "mongoose"

function SignUp() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    username: "",
  })
  const [error, setError] = useState({
    emailError: null,
    passwordError: null,
    usernameError: null,
  })

  function handleChange(e, type) {
    setInput((prev) => ({ ...prev, [type]: e.target.value }))
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
  }

  const redirectToList = () => {
    const { pathname } = Router
    if (pathname === "/signup") {
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

    res.error ? console.log(res.error) : redirectToList()
  }

  const registerUser = async () => {
    const res = await axios
      .post(
        "/api/signup",
        {
          username: input.username,
          email: input.email,
          password: input.password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async () => {
        await loginUser()
        redirectToList()
      })
      .catch((er) => {
        setError((prev) => ({ ...prev, passwordError: er.response.data.error }))
      })
    console.log(res)
  }

  return (
    <div className={styles.signin}>
      <div className={styles.modal}>
        <p>Sign Up</p>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault()
            registerUser()
          }}
        >
          <input
            type="text"
            placeholder="Username"
            minLength={6}
            autoComplete="username"
            required
            onChange={(e) => {
              handleChange(e, "username")
            }}
          />
          {error.username && (
            <div className={styles.error}>{error.usernameError}</div>
          )}
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            onChange={(e) => {
              if (!isValidEmail(e.target.value)) {
                setError((prev) => ({
                  ...prev,
                  emailError: "Please enter a valid email",
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
            minLength={6}
            autoComplete="new-password"
            required
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
            Sign Up
          </button>
        </form>
        <p className={styles.bottom}>
          {"Alredy have an account? "}
          <Link href="/login">Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
