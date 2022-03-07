import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

//export a function that erturns 
export const Employee = () => {
    const [employee, set] = useState({})  // State variable for current employee object
    const { employeeId } = useParams()  // Variable storing the route parameter // WHERE DOES USEPARAMS GET THE EMPLOYEEID PARAMETER FROM?

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees/${employeeId}`) // Get the employee object with an employeeId 
                                                                        //that matches the id in the route parameter
                .then(res => res.json())
        
                .then(set) // Notice the implicit data that was returned being passed as a an argument
        },
        [ employeeId ]  // This useEffect runs when the value of employeeId changes
    )

    return (
        <>
            <section className="employee">
                <h3 className="employee__name">{employee.name}</h3>
                <div className="employee__specialty">Specializes in {employee.specialty}</div>
            </section>
        </>
    )
}