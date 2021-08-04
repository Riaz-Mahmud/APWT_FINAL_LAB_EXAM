import React from "react";
import Employee from "./Employee";
const EmployeeList = ({list, deleteCallback})=>{
   
    return (
        <div>
            <h1>All Emplyee List</h1>
            <div>
            {
                list.map((u)=>{
                   return  <Employee key={u.id} {...u} callback={deleteCallback}/>
                })
            }
            </div>
        </div>
    );
}

export default EmployeeList;