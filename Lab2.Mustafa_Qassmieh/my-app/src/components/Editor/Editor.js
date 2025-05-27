import './Editor.css';
import { useState } from 'react';

// Import the API functions from their respective files
import { Employee } from '../../api/Employees.js';
import { Project } from '../../api/Projects.js';
import { Assignment } from '../../api/Assignments.js';

// Editor Component
function Editor() {
    const [activeForm, setActiveForm] = useState('employee'); // default

    const renderForm = () => {
        switch (activeForm) {
        case 'employee':
            return <EmployeeForm />;
        case 'project':
            return <ProjectForm />;
        case 'assignment':
            return <AssignmentForm />;
        default:
            return null;
        }
    };

    return (
        <div className="editor">
            <h1>Editor</h1>
            <div className="form-container">
                <div className="form-buttons">
                    <button onClick={() => setActiveForm('employee')}>Employee</button>
                    <button onClick={() => setActiveForm('project')}>Project</button>
                    <button onClick={() => setActiveForm('assignment')}>Assignment</button>
                </div>
                {renderForm()}
            </div>
        </div>
    );
}

// Employee Form Component
function EmployeeForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const employeeData = {
            name: formData.get('name'),
            email: formData.get('email'),
            employeeId: formData.get('employee-id')
        };
        // Call the imported API function
        Employee.createNew(employeeData).then(response => {
            console.log('Employee created:', response);
        }).catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="employee-form">
            <h2>Employee Form</h2>
            <form onSubmit={handleSubmit}>
                <span>
                    {/* <label htmlFor="name">Name:</label> */}
                    <input type="text" id="name" name="name" placeholder='Name' required />
                </span>
                <span>
                    {/* <label htmlFor="email">Email:</label> */}
                    <input type="email" id="email" name="email" placeholder='Email' required />
                </span>
                <span>
                    {/* <label htmlFor="employee-id">Employee ID:</label> */}
                    <input type="text" id="employee-id" name="employee-id" placeholder="e.g. EMP028" required />
                </span>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

// Project Form Component
function ProjectForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const projectData = {
            projectName: formData.get('project-name'),
            projectDescription: formData.get('project-description'),
            projectCode: formData.get('project-code')
        };
        // Call the imported API function
        Project.createProject(projectData).then(response => {
            console.log('Project created:', response);
        }).catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="project-form">
            <h2>Project Form</h2>
            <form onSubmit={handleSubmit}>
                <span>
                    {/* <label htmlFor="project-name">Project Name:</label> */}
                    <input type="text" id="project-name" name="project-name" placeholder='Project Name' required />
                </span>
                <span>
                    {/* <label htmlFor="project-description">Project Description:</label> */}
                    <input type="text" id="project-description" name="project-description" placeholder='Description' required />
                </span>
                <span>
                    {/* <label htmlFor="project-code">Project Code:</label> */}
                    <input type="text" id="project-code" name="project-code" placeholder="ID; e.g. PRJ123" required />
                </span>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

// Assignment Form Component
function AssignmentForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const assignmentData = {
            employeeId: formData.get('employee-id'),
            projectCode: formData.get('project-code'),
            startDate: formData.get('start-date')
        };
        // Call the imported API function
        Assignment.createAssignment(assignmentData).then(response => {
            console.log('Assignment created:', response);
        }).catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="assignment-form">
            <h2>Assignment Form</h2>
            <form onSubmit={handleSubmit}>
                <span>
                    {/* <label htmlFor="employee-id">Employee ID:</label> */}
                    <input type="text" id="employee-id" name="employee-id"placeholder='Employee ID EMP###' required />
                </span>
                <span>
                    {/* <label htmlFor="project-code">Project Code:</label> */}
                    <input type="text" id="project-code" name="project-code" placeholder='Project ID PRJ###' required />
                </span>
                <span>
                    <label htmlFor="start-date">Date:</label>
                    <input type="date" id="start-date" name="start-date" required />
                </span>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Editor;
