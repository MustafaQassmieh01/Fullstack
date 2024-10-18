document.addEventListener("DOMContentLoaded",() =>{
    const form = document.getElementById('create-recipe-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('create-title').value;
        const ingredients = document.getElementById('create-ingredients').value;
        const instructions = document.getElementById('create-instructions').value;
        const cookingTime = document.getElementById('create-cookingTime').value;
        const imageUrl = document.getElementById('create-imageUrl').value;

        const recipe = { title, ingredients, instructions, cookingTime, imageUrl };
        try {
            const response = await fetch('api/recipe/new',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' 

                },
                body:JSON.stringify(recipe)
            });
            const messageDive = document.getElementById('create-message');
            if(response.ok){
                const result =await response.json();
            }
        }})
    }
    
});