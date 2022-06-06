import { useState } from 'react';
import './App.css';
import Axios from "axios";
import Table from './Table';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  
  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name, 
      age: age, 
      country: country, 
      position: position,
      wage: wage
    }).then(() => {
      console.log("success");
    })
  }

  const getEmployees = () => {
    console.log("getting...")
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
      console.log(response);
    })
  }

  return (
    <div className="App">
      <div className='form'>
        <label>Name</label>
        <input type="text" onChange={(e) => {
          setName(e.target.value);
        }} />
        <label>Age</label>
        <input type="number" onChange={(e) => {
          setAge(e.target.value);
        }} />
        <label>Country</label>
        <input type="text" onChange={(e) => {
          setCountry(e.target.value);
        }} />
        <label>Position</label>
        <input type="text" onChange={(e) => {
          setPosition(e.target.value);
        }} />
        <label>Wage</label>
        <input type="number" onChange={(e) => {
          setWage(e.target.value);
        }} />
          <button className='button add' onClick={addEmployee}>Add</button>
      </div>
      <Table />
    </div>
  );
}
export default App;
