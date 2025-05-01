import { Employee } from "../models/employee.js";


export const EmployeeController = {};

EmployeeController.createEmployee = async (req, res) => {
    try {
        const { employee_id, full_name, email, hashed_password } = req.body;
        if (!employee_id || !full_name || !email || !hashed_password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const exists = await Employee.findOne({ full_name, email });
         if (exists){
        return res.status(401).json({ message: "Employee already Exists" });
        }
        const employee = new Employee({
            employee_id,
            full_name,
            email,
            hashed_password,
        });
        await employee.save();
        return res.status(201).json(employee);
    } catch (error) {
        console.error("Error creating employee:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
