import mongoose from "mongoose";

const projectAssignmentSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.String,
        ref:"Employee",
        required: true },
    project_code: { type: mongoose.Schema.Types.String,
        ref:"Project",
        required: true },
    start_date: { type: Date, required: true }
});

const ProjectAssignment = mongoose.model("ProjectAssignment", projectAssignmentSchema, "ProjectAssignments");
export default ProjectAssignment;

