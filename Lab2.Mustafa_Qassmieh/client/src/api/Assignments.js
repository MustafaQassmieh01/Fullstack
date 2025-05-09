export const Assignment = {}

Assignment.getAssignments = async () => {
    try {
        const response = await fetch('/api/assignments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching assignments:', error);
        throw error;
    }
}

Assignment.createAssignment = async (assignmentData) => {
    try {
        const response = await fetch('/api/assignments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(assignmentData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating assignment:', error);
        throw error;
    }
}