import React, { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const TicketForm = () => { // export a new function that is responsible for saving local state to JSON and returns a ticket form component
    const [ticket, updateTicket] = useState({ // set initial state as an object with two keys
        description: "",
        emergency: false
    });

    const history = useHistory() // save the useHistory function imported from RouterDOM to a local variable

    const submitTicket = (event) => { // declare a function that accepts a click event from the submit button as an argument

        const newTicket = { // declare a new object and set the keys using initial state, local storage, an id for JSON, and a date
            description: ticket.description,
            emergency: ticket.emergency,
            customerId: parseInt(localStorage.getItem("honey_customer")),
            employeeId: 1,
            dateCompleted: ""
        }
        
        event.preventDefault() // forces DOM to do something........

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTicket) // push new object to JSON as a "flat object" (a string)
        }

        return fetch("http://localhost:8088/serviceTickets", fetchOption)
        .then(response => response.json())
        .then(() => {
            history.push("/tickets") // utilizes the RouterDOM history function and ApplicationViews.js to reroute the user to the tickets page
        })
    }

    return ( // this is what will render to the DOM
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        onChange={ // evenetListener observing the input field for changes, copies local state, 
                                        // modifies it with user input, and invokes the updateTicket function passing the modified copy of state as an argument
                            (evt)=> {
                                const copy = {...ticket}
                                copy.description = evt.target.value
                                updateTicket(copy)
                            }
                        } 
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.emergency = evt.target.checked
                                updateTicket(copy)
                                
                            }
                        } 
                        />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={submitTicket}>
                Submit Ticket
            </button>
        </form>
    )
}