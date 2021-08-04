import React from "react";
import {Link} from "react-router-dom";

const Employee = ({id,name,contact_no,username,password,companyName, callback})=>{
    return (
        <div>
            <h3>Name: {name}</h3>
            <p>Company:{companyName}</p>
            <p>contact_no: {contact_no}</p>
            <p>username: {username}</p>
            <p>password: {password}</p>
            <button onClick={()=>callback(id)}>Delete</button>
            <Link to={`/edit/${id}`}> EDIT</Link>
        </div>
    );
}

export default Employee;