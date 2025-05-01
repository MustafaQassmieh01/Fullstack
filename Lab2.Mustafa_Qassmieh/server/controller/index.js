import { AssignmentController } from "./assignmentController";
import { EmployeeController } from "./employeeController";
import { ProjectController } from "./projectController";

export const Controller = {};

Controller.createEmployee = EmployeeController.createEmployee;
Controller.createProject = ProjectController.createProject;
Controller.assignToProject = AssignmentController.assignToProject;
Controller.getAssignments = AssignmentController.getAssignments;
