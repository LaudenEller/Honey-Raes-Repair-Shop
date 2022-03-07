import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/customers?email=${email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    } // THIS USES A TERNARY OPERATOR TO RETURN ONLY CUSTOMER OBJECTS WITH AN EMAIL KEY FROM JSON

    const handleLogin = (e) => {
        e.preventDefault() // WHAT DOES THIS DO??? browser form submission is a default behavior in the web browser
        existingUserCheck() // CHECKS TO SEE IF CUSTOMER EXISTS
            .then(exists => {
                if (exists) {
                    localStorage.setItem("honey_customer", exists.id) // ADDS NEW key TO LOCAL STORAGE 
                                                                            //WHICH IS WHAT APP CHECKS FOR BEFORE DISPLAYING HTML
                    history.push("/") // WHAT DOES THIS DO?
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Honey Rae Repairs</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

