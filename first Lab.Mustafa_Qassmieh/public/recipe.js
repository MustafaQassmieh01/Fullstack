const DEPLOY_URL= "http://localhost:5000"

document.addEventListener("DOMContentLoaded", async () => {
    const recipesContainer = document.getElementById('recipesContainer'); 
    try {
        const response = await fetch('/api/recipes');
        const recipes = await response.json();

        
        const createRecipeCard = recipe.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.id = `${recipe._id}`;
            recipeCard.innerHTML = `
                <aside>
                    <div id="recipeImage">
                        <img src="${recipe.imageUrl}" alt="${recipe.title}" />
                    </div>
                    
                </aside>
                <article>
                    <div id="recipeTitle">
                        <h2>${recipe.title}</h2>
                    </div>
                    <ul>
                        <div id="recipeCookingTime">
                            <li><span class="icon icon-clock"></span><span>${recipe.cookingTime} min</span></li>
                        </div>
                    </ul>
                    <div id="recipeInstructions">
                        <p>${recipe.instructions}</p>
                    </div>
                    <p class="ingredients" id="recipeIngredients"><span>Ingredients:&nbsp;</span>${recipe.ingredients.join(', ')}</p>
                </article>
                <button class="deleteButton" data-id="${recipe._id}">Delete</button>
                <button class="updateButton" data-id="${recipe._id}">Update</button>
            `;

            recipesContainer.appendChild(recipeCard);
        });

        // Adding event listeners for delete and update buttons
        document.querySelectorAll('.deleteButton').forEach(button => {
            button.addEventListener('click', async (e) => {
                const recipeId = e.target.getAttribute('data-id');
                console.log(recipeId);
                try {
                   
                    const response = await fetch(`/api/recipes/delete/${recipeId}`, {
                        method: 'DELETE'
                    });
                    const result = await response.json();
                    if (response.ok) {
                        document.getElementById(recipeId).remove();
                        alert(result.message);
                    } else {
                        alert(result.message);
                    }
                } catch (err) {
                    console.error(err);
                }
            });
        });

        document.querySelectorAll('.updateButton').forEach(button => {
            button.addEventListener('click', (e) => {
                const recipeId = e.target.getAttribute('data-id');
                const recipeCard = document.getElementById(recipeId);
                const title = recipeCard.querySelector('#recipeTitle h2').innerText;
                const ingredients = recipeCard.querySelector('#recipeIngredients').innerText.split(': ')[1]|| '';
                const instructions = recipeCard.querySelector('#recipeInstructions p').innerText;
                const cookingTime = recipeCard.querySelector('#recipeCookingTime span:nth-child(2)').innerText.split(' ')[0];
                const imageUrl = recipeCard.querySelector('img').src;

                // removing existing form if pres
                let existingForm = recipeCard.querySelector('.updateform');
                if (existingForm) {
                    existingForm.remove();
                }

                // Open a form for updating the recipe
                const updateForm = document.createElement('form');
                updateForm.classList.add('update-form');
                updateForm.innerHTML = `
                    <div class="form-group">
                        <label for="update-title">Title</label>
                        <input type="text" id="update-title" name="title" value="${title}" required>
                    </div>
                    <div class="form-group">
                        <label for="update-ingredients">Ingredients</label>
                        <textarea id="update-ingredients" name="ingredients" rows="4" required>${ingredients}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="update-instructions">Instructions</label>
                        <textarea id="update-instructions" name="instructions" rows="6" required>${instructions}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="update-cookingTime">Cooking Time (minutes)</label>
                        <input type="number" id="update-cookingTime" name="cookingTime" value="${cookingTime}" required>
                    </div>
                    <div class="form-group">
                        <label for="update-imageUrl">Image URL</label>
                        <input type="url" id="update-imageUrl" name="imageUrl" value="${imageUrl}">
                    </div>
                    <button type="submit">Update Recipe</button>
                `;
                // const button_update = document.querySelector('.updateButton');
                // if (button_update!= null){
                //     button_update.classList.add('cancelButton');
                // button_update.innerHTML = 'Cancel';
                
                // button_update.classList.remove('updateButton');
                // }
                // recipeCard.appendChild(updateForm);

                // const button= recipeCard.querySelector('.cancelButton');

                // button.addEventListener('click', () => {
                //     pressCancel(updateForm,button)
                // });

                updateForm.addEventListener('submit', async (e) => {
                    e.preventDefault();

                    const updatedRecipe = {
                        title: updateForm.querySelector('#update-title').value,
                        imageUrl: updateForm.querySelector('#update-imageUrl').value,
                        ingredients: updateForm.querySelector('#update-ingredients').value.split(','),
                        instructions: updateForm.querySelector('#update-instructions').value,
                        cookingTime: updateForm.querySelector('#update-cookingTime').value
                    };

                    try {
                        console.log('button used')
                        const response = await fetch(`/api/recipes/update/${recipeId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updatedRecipe)
                            
                        });console.log(response)

                        const result = await response.json();
                        console.log(result)
                        console.log('supose result cameback')
                        if (response.ok) {

                            alert("updated successfully");
                            // Update the recipe card with new values
                            recipeCard.querySelector('#recipeTitle h2').innerText = updatedRecipe.title;
                            recipeCard.querySelector('#recipeImage img').src = updatedRecipe.imageUrl;
                            recipeCard.querySelector('#recipeIngredients').innerHTML = `<span>Ingredients:&nbsp;</span>${updatedRecipe.ingredients.join(', ')}`;
                            recipeCard.querySelector('#recipeInstructions p').innerText = updatedRecipe.instructions;
                            recipeCard.querySelector('#recipeCookingTime span:nth-child(2)').innerText = `${updatedRecipe.cookingTime} min`;
                           

                            updateForm.remove();
                        } else {
                            console.log('something is wrong')
                            alert(result.message);
                        }
                    } catch (err) {
                        console.error(err);
                    }
                });
            
                
            });
        });
    } catch (err) {
        console.error(err);
    }
});
// function cancelUpdate() {
//     const button = document.querySelector('.updateButton');
//     if (button!= null){
//         button.classList.add('cancelButton');
//     button.innerHTML = 'Cancel';
    
//     button.classList.remove('updateButton');
//     }
    
// }
// function pressCancel(form,button) {
//     form.remove();
//     button.classList.add('updateButton');
//     button.innerHTML = 'update';
//     button.classList.remove('cancelButton');
// }
