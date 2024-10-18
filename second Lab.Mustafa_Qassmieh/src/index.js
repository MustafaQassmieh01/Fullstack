import React from 'react';
import ReactDOM from 'react-dom';

class Comp extends React.Component {
    render() {
        return<h2> this works
        </h2>;
    }
}
fetch("localhost:3000/api/get/employees")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then(data => {
          throw new Error(data.message); // Assuming the JSON contains a "message" property with the error message
        });
      }
    })
    .then((data) => {
      const employees = data.employees;
      let employeeID ={};
      employees.forEach((employee) => {
        employeeID.add(employee.employeeID);

    });project.forEach((proj) => {
        if (assignmnet.employeeID == neededemployeeid){
            return employee;
        }
    });
      currentUser ={userId:  data.userId, userName:data.userName}
      console.log(currentUser.id, currentUser.userName)
      // Refresh the list after adding
      alert(data.message);
    })
    .catch((error) => {
      alert(error.message)
    }
    );

ReactDOM.render(<Comp />, document.getElementById('index'))