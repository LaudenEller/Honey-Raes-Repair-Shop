import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./Tickets.css"

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

    return (
        <>
            <button onClick={() => history.push("/tickets/create")}>Create Ticket</button>
            {
                tickets.map(
                    (ticketObject) => {
                        return <p className={`ticket ${ticketObject.emergency ? "emergency" : ""}`} key={`ticket--${ticketObject.id}`}>
                            {ticketObject.emergency ? "🚑" : ""}  {ticketObject.description} submitted by {ticketObject.customer.name}
                            and worked on by {ticketObject.employee.name}</p> // must use KEY attribute which acts like an Id for React
                    }
                )
            }
        </>
    )
}