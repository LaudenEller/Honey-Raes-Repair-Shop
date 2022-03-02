import React from "react"
import { CustomerList } from "./customers/CustomerList"
import { EmployeeList } from "./employees/EmployeeList"
import { TicketList } from "./serviceTickets/TicketList"
import { Route } from "react-router-dom"
import { TicketForm } from "./serviceTickets/TicketForm"

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/customers">
                <CustomerList />
            </Route>
            <Route path="/employees">
                <EmployeeList />
            </Route>
            <Route exact path="/tickets">
                <TicketList />
            </Route>
            <Route exact path="/tickets/create">
                <TicketForm />
            </Route>
        </>
    )
}