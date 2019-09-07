import React, { useEffect, useState } from "react"
import { useAuth } from "./../../util/auth.js"
import { useRouter } from "./../../util/router.js"
import "./styles.scss"

import logo from "../../assets/bankshare_icon.png"
import { strict } from "assert";

function DashboardPage(props) {
  const auth = useAuth()
  const router = useRouter()

  const [user, setUser] = useState(null)
  setUser(auth.user)

  // Redirect to signin
  // if not signed in.
  useEffect(() => {
    if (auth.user === false) {
      router.push("/signin")
    }
  }, [auth])

  // TODO: Dashboard page after logging in.
  return (
    <div className="dashboard-section">
      <div className="dashboard-header centered">
        <img className="centered image-block" src={logo} />
      </div>
      <div className="columns center-container">
        <div className='column is-half'>{JSON.stringify(user)}</div>
        <div className='column is-half'>hi</div>
      </div>
    </div>
  )
}

export default DashboardPage
