import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul style={{ listStyleType: "none"}} className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/customers">Customers</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Tickets</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="#"
                onClick={() => {
                    localStorage.removeItem("honey_customer") // removes key the app checks for to render, therefore reroutes DOM to login
                }}>logout</Link>
            </li>
        </ul>
    )
}