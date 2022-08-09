import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb.js"
import dbConnect from "../../../lib/dbConnect.js"
import User from "../../../model/User.js"
import { compare } from "bcrypt"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await dbConnect()

        const user = await User.findOne({
          email: credentials?.email,
        })

        if (!user) {
          throw new Error("Email is not registered")
        }

        const isPasswordCorrect = await compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect")
        }

        return user
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
})
