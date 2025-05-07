import ProjectAssignment from "../models/projectAssignment.js";
import  Employee  from "../models/employee.js";
import  Project  from "../models/project.js";

export const AssignmentController = {};

AssignmentController.assignToProject = async (req, res) => {
    try {
        const { employee_id, project_code, start_date } = req.body;
        if (!employee_id || !project_code || !start_date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const employeeExists = await Employee.findOne({ employee_id });
        const projectExists = await Project.findOne({ project_code });
        
        if(!employeeExists|| !projectExists) {
            return res.status(404).json({ message: "Employee or Project not found" });
        }

        const newAssignment = new ProjectAssignment({
            employee_id,
            project_code,
            start_date,
        });
        await newAssignment.save();
        return res.status(201).json(newAssignment);
    } catch (error) {
        console.error("Error assigning to project:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

AssignmentController.getAssignments = async (req, res) => {
    try {
        const assignments = await ProjectAssignment.find()
        .populate({
            path:'employee_id',
            model: 'Employee',
            localField : 'employee_id', 
            foreignField:'employee_id',
            justOne: true})
        .populate({
            path:'project_code',
            model: 'Project',
            localField : 'project_code',
            foreignField:'project_code',
            justOne: true});
        return res.status(200).json(assignments);
    } catch (error) {
        console.error("Error fetching assignments:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


