export const Employee = {};

Employee.createNew = async (employeeData) => {
    try {
        const response = await fetch('http://localhost:5000/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating employee:', error);
        throw error;
    }
}