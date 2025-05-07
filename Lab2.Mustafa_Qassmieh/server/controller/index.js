import { AssignmentController } from "./assignmentController.js";
import { EmployeeController } from "./employeeController.js";
import { ProjectController } from "./projectController.js";

export const Controller = {};

Controller.createEmployee = EmployeeController.createEmployee;
Controller.createProject = ProjectController.createProject;
Controller.assignToProject = AssignmentController.assignToProject;
Controller.getAssignments = AssignmentController.getAssignments;
