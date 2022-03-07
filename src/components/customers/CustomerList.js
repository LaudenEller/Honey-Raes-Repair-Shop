import React, { useEffect, useState } from "react"
import { getAllCustomers } from "../ApiManager"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([]) // "WHAT STATE DO I WANT THIS COMPONENT TO RENDER?" 
    // define the array that you want to update, define the function you want to use to modify that array, 
    // and set them = to useState with an empy array inside parenthesis
    // Initialization of a state is a state change 
    const [totalCustomerMessage, updateMessage] = useState("")

    useEffect(
        () => {
            console.log("Initial useEffect") // console logs message when initial state is set
            getAllCustomers()
                .then((customers) => {
                    setCustomers(customers) // Use effect runs second time because the function is invoked that rerenders the DOM
                    // Invokes function that modifies data, can not modify data directly like in vanillaJs
                })
        },
        [] //this effect is watching initial state so it runs once and then does not run again
    )

    useEffect(
        () => {
            console.log("Customer state changed", customers) // console log message string and customer array that came back from JSON
            if (customers.length === 1) { // checks to see if customer array has 1 object in it
                updateMessage("You have 1 customer") // when true, update useState with this string
            }
            else {
                updateMessage(`You have ${customers.length} customers`) // when false, update useState with this string
            }
        },
        [customers] // monitoring customer state so invokes useEffect after initial state is set
    )

    return (
        <>
            <div>{totalCustomerMessage}</div> {/* returns string in useState wrapped in a div */}
            {
                customers.slice(0, 5).map(
                    (customerObject) => {
                        return <p key={`customer--${customerObject.id}`}>{customerObject.name}</p> // must use KEY attribute which acts like an Id for React
                    } // returns the first five customerObjects that have a name key each wrapped in a p
                )
            }
        </>
    )
}