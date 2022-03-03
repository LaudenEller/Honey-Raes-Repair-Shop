import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Link } from "react-router-dom"
import "./Tickets.css"

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
            fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
                .then(res => res.json())
                .then((data) => {
                    updateTickets(data)
                } // invoke function that modifies data, do not modify data directly like in vanillaJs
                )
        },
        []
    )
    useEffect(
        () => {
            fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
                .then(res => res.json())
                .then((data) => {
                    updateTickets(data)
                } // invoke function that modifies data, do not modify data directly like in vanillaJs
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
                            }}>Delete</button></p>    // must use KEY attribute which acts like an Id for React
                    }
                )
            }
        </>
    )
}