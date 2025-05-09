export const Project = {};

Project.createProject = async (newProject) => {
    try{
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProject)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
        return await response.json();
    }catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}