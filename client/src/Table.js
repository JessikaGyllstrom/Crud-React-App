import { useState } from "react";
import Axios from "axios";

const Table = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [newWage, setNewWage] = useState(0);

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(employeeList.filter((val) => {
        return val.id !== id;
      }))
    })
  }
  const getEmployees = () => {
      console.log("getting...")
      Axios.get("http://localhost:3001/employees").then((response) => {
        setEmployeeList(response.data);
        console.log(response);
      })
    }
  
    const updateEmployeeWage = (id) => {
      console.log("?");
      Axios.put("http://localhost:3001/update", {
        wage: newWage, 
        id: id
      }).then((response) => {
        alert("Updated");
        setEmployeeList(employeeList.map((val) => {
          return val.id == id 
          ? {id: val.id, 
            name: val.name, 
            country: val.country, 
            age: val.age, 
            position: val.position, 
            wage: newWage}
             : val;
          })
        );
        }
      )
    }
      return (
            <div className='employees'>
            <button className="show" onClick={getEmployees}>Show Employees</button>
            {employeeList.map((val, key) => {
            return ( 
                <div className="employee" key={key}>
                  <div>
                    <p>Name: {val.name}</p>
                    <p>Age: {val.age}</p>
                    <p>Country: {val.country}</p>
                    <p>Position: {val.position}</p>
                    <p>Wage: {val.wage}</p>
                  </div>
                  <div className="operations">
                    <label>Update Wage:</label>
                    <input 
                    type="text" 
                    placeholder='2000...'
                    onChange={(e) => {
                      setNewWage(e.target.value);
                    }}/>
                    <button className="add" onClick={() => {updateEmployeeWage(val.id)}} >Save</button>
                    <button className="delete" onClick={() => {deleteEmployee(val.id)}}>Delete Employee</button>
                </div>
              </div>
            );
          })}
  </div>)
}
export default Table;