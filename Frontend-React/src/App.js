import jobsList from './components/jobs';
import { useState, useEffect } from 'react';
import Createjobs from './components/createjob';
import CreateEmployee from './components/CreateEmployee';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {

const getjobs=()=>{
    fetch("http://localhost:8000/api/jobs").then((response)=>{
      response.json().then((result)=>{
        setJoblist(result);
      })
    })
  }
 const [joblist, setJoblist] = useState([]);
  const deleteuser = (id)=>{

    fetch('http://localhost:8000/api/jobsDelete/'+id,
        {
            method: "DELETE",
        }).then((result)=>{
            result.json().then((resp)=>{
                alert("Job has heen Deleted")
                getjobs()
            })
        })
  }
  const addNewJob=(newJob)=>{
    fetch('http://localhost:8000/api/jobs', {
                          method: "Post",
                          headers:{
                              'Content-Type':'application/json'
                          },
                          body: JSON.stringify(newJob)
                      }).then((result)=>{
                          result.json().then((resp)=>{
                              alert("Job has heen added")
                              getjobs()
                          })
                      })
  }
  const updateJob=(id,editJob)=>{
    fetch('http://localhost:8000/api/jobsUpdate/'+id, {
            method: "Post",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(editJob)
        }).then((result)=>{
            result.json().then((resp)=>{
                alert("Job has heen edited")
                getjobs()
            })
        });

        

    
  }
  
  useEffect(() => {
    fetch("http://localhost:8000/api/jobs").then((response)=>{
      response.json().then((result)=>{
        setJoblist(result);
      })
    })
  },[]);



const [employeeList, setEmployeeList] = useState([]);

const getEmployeeData=()=>{
  fetch("http://localhost:8000/api/getAllEmployee").then((response)=>{
    response.json().then((result)=>{
      setEmployeeList(result);
    })
  })
}

const addEmployee=(newUser)=>{
  fetch('http://localhost:8000/api/createNewEmp', {
                        method: "Post",
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify(newUser)
                    }).then((result)=>{
                        result.json().then((resp)=>{
                            alert("employee has heen added")
                            getEmployeeData()
                        })
                    })
}


const updateEmployee=(id,editedUser)=>{
  fetch('http://localhost:8000/api/editEmp/'+id, {
          method: "PUT",
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify(editedUser)
      }).then((result)=>{
          result.json().then((resp)=>{
              alert(" employee has heen edited")
              getEmployeeData()
          })
      });
 
}

useEffect(() => {
  fetch("http://localhost:8000/api/getAllEmployee").then((response)=>{
    response.json().then((result)=>{
      setEmployeeList(result);
    })
  })
},[]);





  return (
   
    <Router>
      <Switch>
          <Route exact path='/'> 
              <h1>Job</h1>
          </Route>
          <Route path='/job/list'>
            <div>
                <jobsList list={joblist} deleteCallback={deleteuser}/>
            </div>
          </Route>
          <Route path='/job/create'>
              <Createjobs status='add' addjobCallback={addNewJob} />
          </Route>
        <Route path='/job/edit/:id' children={<Createjobs status='edit' updatejobCallback={updateJob} />} ></Route>
        <Route path='/job/create'>
              <CreateEmployee status='add' addjobCallback={addEmployee} />
          </Route>
        <Route path='/employee/edit/:id' children={<CreateEmployee status='edit' updateEmployeeCallback={updateEmployee} />} ></Route>
          <Route path='*'>
              404 not found
          </Route>          
      </Switch>
  </Router>
  );
}

export default App;