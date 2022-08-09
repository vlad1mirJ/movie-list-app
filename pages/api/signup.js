import dbConnect from "../../lib/dbConnect"
import User from "../../model/User"
import bcrypt from "bcrypt"

const validateEmail = (email) => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return regEx.test(email)
}

const validateForm = async (username, email, password) => {
  if (username.length < 6) {
    return { error: "Username must have 6 or more characters" }
  }
  if (!validateEmail(email)) {
    return { error: "Email is invalid" }
  }

  await dbConnect()
  const emailUser = await User.findOne({ email: email })

  if (emailUser) {
    return { error: "Email already exists" }
  }

  if (password.length < 6) {
    return { error: "Password must have 6 or more characters" }
  }

  return null
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(200)
      .json({ error: "This API call only accepts POST methods" })
  }

  const { username, email, password } = req.body

  const errorMessage = await validateForm(username, email, password)
  if (errorMessage) {
    return res.status(400).json(errorMessage)
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const newUser = new User({
    name: username,
    email,
    hashedPassword,
  })

  newUser
    .save()
    .then(() =>
      res.status(200).json({ msg: "Successfuly created new User: " + newUser })
    )
    .catch((err) =>
      res.status(400).json({ error: "Error on '/api/register': " + err })
    )
}
