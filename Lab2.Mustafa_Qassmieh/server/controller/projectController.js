import {project} from "../models/project.js";


export const ProjectController = {};

ProjectController.createProject = async (req, res) => {
    try {
        const { project_code, project_name, project_description } = req.body;
        if (!project_code || !project_name || !project_description) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newProject = new project({
            project_code,
            project_name,
            project_description,
        });
        await newProject.save();
        return res.status(201).json(newProject);
    } catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}