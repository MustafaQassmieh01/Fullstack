import { useEffect, useState } from "react";
import { Assignment } from "../../api/Assignments.js";
import Caret from "../Icon/Caret.jsx";
import './Assignments.css';

function Assignments() {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const data = await Assignment.getAssignments();
      setAssignments(data);
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
  }
  
  useEffect(() => {
    fetchAssignments();
    const interval = setInterval(fetchAssignments,60000); // 60 seconds
    
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="assignments">
      <h1>Assignments</h1>
      <Table assignments={assignments} />
    </div>
  );
}


function Table({assignments}) {
  const headers = [
    {id:1, KEY:'employee_id.employee_id', label: 'Employee ID'},
    {id:2, KEY:'employee_id.full_name', label: 'Employee Name'},
    {id:3, KEY:'project_code.project_name', label: 'Project Name'},
    {id:4, KEY:'start_date', label: 'Start Date',isDate:true}
  ]
  const [sort,setSort] = useState({keyToSort:'employee_id.employee_id',direction:"asc"});

  function handleHeaderClick(header) {
    setSort({
      keyToSort:header.KEY,
      direction:
      header.KEY === sort.keyToSort?sort.direction === "asc" ? "desc" : "asc": 'desc' // if the header is the same as the current sort key, toggle the direction 
    });
  }

  function getSortedArray(array,headerKey) {
    if (sort.direction === "asc"){
      return array.sort((a, b) => {
        return getValueFromPath(a, sort.keyToSort) > getValueFromPath(b, sort.keyToSort) ? 1 : -1;
      });
    }
    return array.sort((a, b) => {
      return getValueFromPath(a, sort.keyToSort) > getValueFromPath(b, sort.keyToSort) ? -1 : 1;
    })
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header,index) => (
            
            <th key={index} onClick={() => handleHeaderClick(header)}>
              <div className="header-container">
                <span>{header.label}</span>
                <span className="caret">
                  {header.KEY === sort.keyToSort &&(
                    <Caret 
                    direction={sort.keyToSort ===header.KEY? sort.direction:'asc'}/>
                  )} 
                </span>
              </div>
            </th>
            
          ))}
        </tr>
      </thead>
      <tbody>
        {getSortedArray(assignments).map((row, index) => (
          <tr key={index}>
            {headers.map((header, index) => {
              return ( 
              <td key={index}>
                {header.isDate ? new Date(getValueFromPath(row, header.KEY)).toLocaleDateString() : getValueFromPath(row, header.KEY)}
              </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function getValueFromPath(obj, path) {
  return path.split('.').reduce((o, p) => (o ? o[p] : undefined), obj);
}

export default Assignments;
