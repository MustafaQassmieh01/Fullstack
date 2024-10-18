const express = require('express');
const router = express.Router();
const {
    addemployee, getemployee } = require("../models/employee.js");

const { 
    addproject, getproject } = require("../models/projects.js");

const {
    addProjectAssignment, getProjectAssignment } = require("../models/projectAssignments.js");
// Register user
router.post('/employees', async (req, res) => { //take info from request body and send it to addUser function in users.js
    try {
      const employeeInfo = req.body;
  
      const employeeName = employeeInfo.userName;
      const employeeEmail = employeeInfo.employeeEmail;
      const password = employeeInfo.password;
      const employeeID = employeeInfo.employeeID;
  
      const employee = await addemployee(
        employeeName,
        employeeEmail,
        password,
        employeeID
          );
  
      if (!employee) {
        return res
          .status(409)
          .json({ message: "An employee with that userName already exists" });
      }
      res.status(201).json({
        message: "employee added successfully",
        employee,
      });
    } catch (error) {
      console.error("Error in route when adding the epmloyee:", error);
      res.status(500).json({ message: "Error adding epmloyee data" });
    }
  });

// Login user
router.post('/projects', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);
    if (user) {
      // Login successful, handle session or token generation here
      res.status(200).json({
        message: "Login successful",
        user: { id: user._id, email: user.email } // Do not send password
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({ message: "Error processing login" });
  }
});

router.post('/projects_assignment', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await authenticateUser(email, password);
      if (user) {
        // Login successful, handle session or token generation here
        res.status(200).json({
          message: "Login successful",
          user: { id: user._id, email: user.email } // Do not send password
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error in login route:", error);
      res.status(500).json({ message: "Error processing login" });
    }
  });

  router.get('/get/employees', async (req, res) => {
    try {
      const employees = await getEmployee();
      if (!employees) { // if employees = null
        return res.status(404).json({ message: "There are no employees yet" });
      }
      res.json({
        message: "employees retrieved successfully",
        employees,
      });
    } catch (error) {
      console.error("Error in route when retrieving employees:", error);
      res.status(500).json({ message: "Error retrieving employees data" });
    }
  });
module.exports = router;
