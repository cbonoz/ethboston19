import React, { useState } from "react"
import "./styles.scss"
import { useAuth } from "../../util/auth.js"
import { startContract } from "../../api/index.js"

function DepositPage(props) {
  const auth = useAuth()
  const [status, setStatus] = useState()
  const [amount, setAmount] = useState(0)
  const [recipient, setRecipient] = useState("")
  const [address, setAddress] = useState("")
  const [currency, setCurrency] = useState("ETH")
  const [showCompletedModal, setShowCompletedModal] = useState(false)

  const SQ_CODE = process.env.REACT_APP_SQ_CODE

  const depositRequest = async () => {
    const user = auth.user
    const sender = user.email
    const body = {
      timestamp: Date.now(),
      recipient,
      address,
      sender: sender || "",
      amount,
      currency
    }
    console.log("depositRequest", body)
    console.log('user', user)

    if (!recipient || !amount) {
      alert("Recipient and amount should both be specified")
      return
    }

    if (!address) {
      alert("Email must be validated first")
      return
    }

    try {
      const response = await startContract(
        "payments",
        "create",
        JSON.stringify(body)
      )
      console.log("resp", response)
      const data = JSON.parse(response)
      setShowCompletedModal(true)
    } catch (e) {
      console.error("error creating payment", e)
    }

    if (false && SQ_CODE) { //  && !user['profileImage']) {
      // No gmail auth, use squarelink.
      const wei = amount / 1000000
      const url = `https://app.squarelink.com/tx?client_id=${SQ_CODE}&to=${address}&amount=${wei}`
      window.location.assign(url)
      return
    }

    try {
    } catch (e) {
      console.error(e)
      // error issuing payment - cancel.
      return
    }

  }

  const validateEmail = async () => {
    const torus = window.torus
    if (torus) {
      try {
        const address = await torus.getPublicAddress(recipient)
        setAddress(address)
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <div className="deposit-section">
      <h1>New Payment</h1>
      <p>
        Send payments to friends, regardless if they have cryptocurrency
        accounts or not, via BankShare.
      </p>

      <div className="send-email">
        <div className="field">
          <label className="label">Email</label>
          <input
            className="input"
            onChange={e => setRecipient(e.target.value)}
            type="text"
            placeholder="Enter recipient email"
          />
        </div>
        <a className="button validate-button" onClick={() => validateEmail()}>
          Validate Email
        </a>
      </div>

      {address && (
        <div>
          Generated address: {address}
          <br />
        </div>
      )}
      <div className="field">
        <label className="label">Amount (ETH)</label>
        <input
          className="input"
          onChange={e => setAmount(e.target.value)}
          type="number"
          placeholder="Enter amount in ETH"
        />
      </div>
      <br />

      <a className="invite-button" onClick={() => depositRequest()}>
        <img src="https://squarelink.com/img/sign-tx.svg" width="220" />
      </a>

      {showCompletedModal && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">You completed a payment!</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setShowCompletedModal(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              <p>
                You successfully sent {amount} {currency} to {recipient}.<br />
                The user can access their funds, bank-free, by going to{" "}
                <a href="app.tor.us" target="_blank">
                  app.tor.us
                </a>{" "}
                and logging in with that same email.
              </p>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button"
                onClick={() => setShowCompletedModal(false)}
              >
                Done
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}

export default DepositPage
