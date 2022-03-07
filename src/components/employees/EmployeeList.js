import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Link } from "react-router-dom"
import { getAllEmployees } from "../ApiManager"

export const EmployeeList = () => {
    const [employees, assignEmployees] = useState([]) // "WHAT STATE DO I WANT THIS COMPONENT TO RENDER?" 
                                                        // define the array that you want to update, define the function you want to use to modify that array, 
                                                                //and set them = to useState with an empy array inside parenthesis
    const [specialties, updateSpecialties] = useState("")
   const history = useHistory()
   
    useEffect(
        () => {
            getAllEmployees()
                .then((employeeArray) => { 
                    assignEmployees(employeeArray) } // invoke function that modifies data, do not modify data directly like in vanillaJs
                )
        },
        []
    )
    useEffect(() => {
            const specialties = employees.map(employee => employee.specialty) // WHAT IS THIS DOING?
            updateSpecialties(specialties.join(", "))
        }, [employees]
        )

    return (
        <>
        <button onClick={() => history.push("/employees/create")}>Hire Employee</button>
        <div>Specialties: {specialties}</div>
            {
                employees.map(
                    (employeeObject) => {
                        return <p key={`employee--${employeeObject.id}`}><Link to={`/employees/${employeeObject.id}`}>{employeeObject.name}</Link></p> // must use KEY attribute which acts like an Id for React
                                                                                                                                                        // Through this link is where the route parameter comes from for the useParams function on employee.js
                    }
                )
            }
        </>
    )
}