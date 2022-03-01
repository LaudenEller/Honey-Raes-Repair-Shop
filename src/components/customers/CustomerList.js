import React, { useEffect, useState } from "react"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([]) // initialization of a state is a state change
    const [totalCustomerMessage, updateMessage] = useState ("")

    useEffect(
        () => {
            console.log("Initial useEffect")
            fetch("http://localhost:8088/customers")
                .then(res => res.json())
                .then((data) => {
                    setCustomers(data) // use effect runs second time because the function is invoked that rerenders the DOM
                })
        },
        [] //this effect is watching initial state so it runs once and then does not run again
    )

    useEffect(
        () => {
            console.log("Customer state changed", customers)
            if (customers.length === 1) {
                updateMessage("You have 1 customer")
            }
            else {
                updateMessage(`You have ${customers.length} customers`)
            }
        },
        [customers]
    )

    return (
        <>
        <div>{totalCustomerMessage}</div>
            {
                customers.slice(0, 5).map(
                    (customerObject) => {
                        return <p key={`customer--${customerObject.id}`}>{customerObject.name}</p>
                    }
                )
            }
        </>
    )
}

//----------OLD CODE BELOW-----------//

// import React, { useEffect, useState } from "react"

// export const CustomerList = () => {
//     const [customers, assignCustomers] = useState([]) // "WHAT STATE DO I WANT THIS COMPONENT TO RENDER?" 
//                                                             // define the array that you want to update, define the function you want to use to modify that array, 
//                                                                 //and set them = to useState with an empy array inside parenthesis

//     useEffect(
//         () => {
//             fetch("http://localhost:8088/customers")
//                 .then(res => res.json())
//                 .then((customerArray) => { 
//                     assignCustomers(customerArray) } // invoke function that modifies data, do not modify data directly like in vanillaJs
//                 )
//         },
//         []
//     )

//     return (
//         <>
//         <h2>Customer List</h2>
//             {
//                 customers.map(
//                     (customerObject) => {
//                         return <p key={`customer--${customerObject.id}`}>{customerObject.name}</p> // must use KEY attribute which acts like an Id for React
//                     }
//                 )
//             }
//         </>
//     )
// }