import React, { useState } from "react"
import "./styles.scss"
import { useAuth } from "../../util/auth.js"
import { startContract } from "../../api/index.js"

function DepositPage(props) {
  const auth = useAuth()
  const [status, setStatus] = useState()
  const [amount, setAmount] = useState(0)
  const [recipient, setRecipient] = useState("")
  const [address, setAddress]  = useState("")
  const [currency, setCurrency] = useState("ETH")
  const [showCompletedModal, setShowCompletedModal] = useState(false)

  const depositRequest = async () => {
    const sender = auth.user.email
    const body = {
      timestamp: Date.now(),
      recipient,
      address,
      sender: sender || '',
      amount,
      currency
    }
    console.log("depositRequest", body)
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
  }

  const validateEmail = async () => {
    const torus =  window.torus
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
    <div>
      <p>
        Send payments to friends, regardless if they have cryptocurrency
        accounts or not, via BankShare.
      </p>

      <div className="send-email">
        <input
          className="input"
          onChange={e => setRecipient(e.target.value)}
          type="text"
          placeholder="Enter recipient email"
        />
        <a
          className="button is-success validate-button"
          onClick={() => validateEmail()}
        >
          Validate Email
        </a>
      </div>

      {address && <div>Ggenerated address: {address}<br/></div>}
      
      <input
        className="input"
        onChange={e => setAmount(e.target.value)}
        type="number"
        placeholder="Enter amount in ETH"
      />

      <a
        className="button is-success invite-button"
        onClick={() => depositRequest()}
      >
        Send Funds
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
