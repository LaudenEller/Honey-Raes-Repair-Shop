import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Link } from "react-router-dom"
import "./Tickets.css"
import { getAllTickets } from "../ApiManager"

const deleteTicket = (id) => {
    fetch(`http://localhost:8088/serviceTickets/${id}`, {
        method: "DELETE"
    })
}


export const TicketList = () => {
    const [tickets, updateTickets] = useState([])
    const history = useHistory()

    useEffect(
        () => {

        },
        []
    )
    useEffect(
        () => {
            getAllTickets()
                .then((data) => {
                    updateTickets(data)
                }
                )
        },
        []
    )
    useEffect(
        () => {
           getAllTickets()
                .then((data) => {
                    updateTickets(data)
                }
                )
        },
        [tickets]
    )

    return (
        <>
            <button onClick={() => history.push("/tickets/create")}>Create Ticket</button>
            {
                tickets.map(
                    (ticketObject) => {
                        return <p className={`ticket ${ticketObject.emergency ? "emergency" : ""}`} key={`ticket--${ticketObject.id}`}>

                            {ticketObject.emergency ? "🚑" : ""} <Link to={`/tickets/${ticketObject.id}`}>{ticketObject.description}</Link>
                            , submitted by {ticketObject.customer.name} and worked on by {ticketObject.employee.name}

                            <button onClick={() => {
                                deleteTicket(ticketObject.id)
                            }}>Delete</button></p>
                    }
                )
            }
        </>
    )
}