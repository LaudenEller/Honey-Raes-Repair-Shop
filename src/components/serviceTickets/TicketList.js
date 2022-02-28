import React, { useEffect, useState } from "react"

export const TicketList = () => {
    const [tickets, updateTickets] = useState([])

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

            {
                tickets.map(
                    (ticketObject) => {
                        return <p key={`ticket--${ticketObject.id}`}>
                            {ticketObject.description} submitted by {ticketObject.customer.name}
                            and worked on by {ticketObject.employee.name}</p> // must use KEY attribute which acts like an Id for React
                    }
                )
            }
        </>
    )
}