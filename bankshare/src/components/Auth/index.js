import React, { useState, useEffect } from "react"
import FormStatus from "./../FormStatus"
import FormField from "./../FormField"
import SectionButton from "./../SectionButton"
import { Link, useRouter } from "./../../util/router.js"
import googleLogo from "../../assets/torus_google_login.svg"
import Torus from "@toruslabs/torus-embed"
import Web3 from "web3"

import "./styles.scss"

import loadingSpinner from "../../assets/loading_spinner.gif"
import { useAuth } from "../../util/auth"

function Auth(props) {
  // State for all inputs
  const auth = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [pass, setPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [torus, setTorus] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loc = window.location.pathname
    if (loc === "/signin" || loc === "/signup") {
      if (auth && auth.user) {
        router.push("/dashboard")
      }
    }
  }, [auth])

  const [showErrors, setShowErrors] = useState(false)

  const torusLogin = async () => {
    setLoading(true)
    const torus = window.torus
    try {
      await torus.login() // await torus.ethereum.enable()
    } catch (e) {
      // continue, might already have session
    }
    window.web3 = new Web3(torus.provider)

    if (!auth.user) {
      try {
        const userInfo = await torus.getUserInfo()
        const email = userInfo.email
        if (email) {
          const address = await torus.getPublicAddress(userInfo.email)
          userInfo['address'] = address
        }
        auth.setTorusUser(torus, userInfo)
        router.push("/dashboard")
      } catch (e) {
        console.error(e)
      }
    }
    setLoading(false)
  }

  // Error array we'll populate
  let errors = []

  // Function for fetching error for a field
  const getError = field => {
    return errors.find(e => e.field === field)
  }

  // Function to see if field is empty
  const isEmpty = val => val.trim() === ""

  // Add error if email empty
  if (["signin", "signup", "forgotpass"].includes(props.mode)) {
    if (isEmpty(email)) {
      errors.push({
        field: "email",
        message: "Please enter an email"
      })
    }
  }

  // Add error if password empty
  if (["signin", "signup", "changepass"].includes(props.mode)) {
    if (isEmpty(pass)) {
      errors.push({
        field: "pass",
        message: "Please enter a password"
      })
    }
  }

  // Add error if confirmPass empty or
  // if it doesn't match pass.
  // Only for signup and changepass views.
  if (["signup", "changepass"].includes(props.mode)) {
    if (isEmpty(confirmPass)) {
      errors.push({
        field: "confirmPass",
        message: "Please confirm password"
      })
    } else if (pass !== confirmPass) {
      errors.push({
        field: "confirmPass",
        message: `This doesn't match your password`
      })
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    // If field errors then show them
    if (errors.length) {
      setShowErrors(true)
    } else {
      // Otherwise call onSubmit with email/pass
      if (props.onSubmit) {
        props.onSubmit({
          email,
          pass
        })
      }
    }
  }

  return (
    <div className="Auth">
      {props.status && props.status.message && (
        <FormStatus type={props.status.type} message={props.status.message} />
      )}

      <form
        onSubmit={e => {
          e.preventDefault()
          handleSubmit()
        }}
      >

        <FormField
            value={name}
            type="text"
            placeholder="Name"
            error={showErrors}
            onChange={value => setName(value)}
          />
        {["signup", "signin", "forgotpass"].includes(props.mode) && (
          <FormField
            value={email}
            type="email"
            placeholder="Email"
            error={showErrors && getError("email")}
            onChange={value => setEmail(value)}
          />
        )}

        {false && <div>

        {["signup", "signin", "changepass"].includes(props.mode) && (
          <FormField
            value={pass}
            type="password"
            placeholder="Password"
            error={showErrors && getError("pass")}
            onChange={value => setPass(value)}
          />
        )}

        {["signup", "changepass"].includes(props.mode) && (
          <FormField
            value={confirmPass}
            type="password"
            placeholder="Confirm Password"
            error={showErrors && getError("confirmPass")}
            onChange={value => setConfirmPass(value)}
          />
        )}

        </div>}
        <div className="field">
          <p className="control ">
            <SectionButton
              parentColor={props.parentColor}
              size="medium"
              fullWidth={true}
              state={
                props.status && props.status.type === "pending"
                  ? "loading"
                  : "normal"
              }
            >
              {props.buttonText}
            </SectionButton>
          </p>
        </div>

        {false && ["signup", "signin"].includes(props.mode) && (
          <div className="Auth__bottom-link has-text-centered">
            {props.mode === "signup" && (
              <>
                Have an account already?
                <Link to="/signin">Sign in</Link>
              </>
            )}

            {props.mode === "signin" && (
              <>
                <Link to="/signup">Create an account</Link>
                <Link to="/forgotpass">Forgot password</Link>
              </>
            )}
          </div>
        )}
      </form>
      <hr />
      <p className="centered or-text">or</p>
      {loading && <img src={loadingSpinner} />}
      {!loading && (
        <div className="torus-login">
          <img
            src={googleLogo}
            className="login-button centered"
            onClick={() => torusLogin()}
          />
        </div>
      )}
    </div>
  )
}

export default Auth
