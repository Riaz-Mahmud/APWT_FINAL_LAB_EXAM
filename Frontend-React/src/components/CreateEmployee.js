import { useParams  } from "react-router";
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";


const CreateEmployee = ({status, addEmployeeCallback, updateEmployeeCallback})=>{
    let history = useHistory();
    const {id:eid} = useParams();
    const initialState = { name:'',company_name:'',contact_no: '', username: '',password:'' };
    const [employee, setEmployee] = useState(initialState);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
  
      setEmployee({ ...employee, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
                    status==='add'?addEmployeeCallback(employee):updateEmployeeCallback(eid,employee);
                    history.push("/employeeList");
    }
    useEffect(() => {
      fetch('http://localhost:8000/api/createNewEmp/'+eid).then((response) => {
        response.json().then((result) => {
            console.warn(result)
            setEmployee({
                company_name:result.company_name,
                contact_no:result.contact_no,
                 name:result.name,
                 username:result.username,
                 password:result.password,
              })
        })
    })
    },[eid]);
    return(
        <>
            <br/>
            <h3>{status==='add'?'Create':'Edit'} employee Page: {eid}</h3>
            <form
                onSubmit={onSubmit}>
                <label >Name</label>
                <input type='text' name='name' value={employee.name} onChange={handleInputChange} /> <br />
                <label >Name</label>
                <input type='number' name='contact_no'  value={employee.contact_no} onChange={handleInputChange} /> <br/>
                <label >Name</label>
                <input type='text' name='company_name' value={employee.company_name} onChange={handleInputChange} /> <br/>
                <label >Name</label>
                <input type='text' name='username' value={employee.username} onChange={handleInputChange} /> <br/>
                <label >Name</label>
                <input type='text' name='password' value={employee.password} onChange={handleInputChange} /> <br/>
                <input type='submit' value={status==='add'?'Create':'Update'}/>
            </form>
            
        </>
    );
}

export default CreateEmployee;