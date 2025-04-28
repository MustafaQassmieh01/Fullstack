import { fetcher } from "./script/fetch.js";
import { dom } from "/script/htmlHandler.js";
// import {table} from "./script/toDelLater.js";~

async function main() {
    const searchBtn = document.querySelector('#search-btn');
    const mainSection = document.getElementById('recipe-list-section')
    mainSection.innerHTML = '<div id="recipe-list-container"></div>'
    const recipeContainer = document.getElementById('recipe-list-container');
    
    const recipes = await fetcher.fetchAllRecipes();

    // const table = document.createElement('table');
    // table.classList.add('recipe-table');

    // const thead = document.createElement('thead');
    // thead.innerHTML = `
    //     <tr>
    //         <th>Name</th>
    //         <th>Ingredients</th>
    //         <th>Instructions</th>
    //         <th>Time</th>
    //         <th>Origin</th>
    //         <th>Spice Level</th>
    //         <th>Actions</th>
    //     </tr>
    // `;
    // table.appendChild(thead);
    const createButton = document.createElement('button');
    createButton.textContent = 'Add New Recipe';
    createButton.id = 'create-recipe-button';
    createButton.onclick = () => {
        dom.recipeForm(recipeContainer, {
            mode: 'create'
        }, async (data) => {
            const created = await fetcher.createRecipe(data);
            if (created) {
                dom.Recipe(created, recipeContainer, {
                    onDelete: fetcher.deleteRecipe.bind(fetcher),
                    onUpdate: fetcher.updateRecipe.bind(fetcher)
                });
            }
        });
    };

    recipes.forEach(element => {
        dom.Recipe(element, recipeContainer, {
            onDelete: fetcher.deleteRecipe.bind(fetcher),
            onUpdate: fetcher.updateRecipe.bind(fetcher)
        });
    });

    const createNew = document.createElement('div');
    createNew.classList.add('create-button-holder');
    createNew.appendChild(createButton);
    recipeContainer.insertAdjacentElement('afterend', createNew);

    searchBtn.onclick = () => handleSearch(recipeContainer);
}

async function handleSearch(recipeContainer) {
    const searchBar = document.querySelector('#search-bar');
    const searchQuery = searchBar.value;
    recipeContainer.innerHTML = '';

    if (searchQuery === '') {
        main(); // recall to fetch all again
    } else {
        try {
            const result = await fetcher.fetchRecipe(searchQuery);
            if (!result) {
                const noResultsMessage = document.createElement('p');
                noResultsMessage.textContent = 'No recipe found with that name!';
                recipeContainer.appendChild(noResultsMessage);
            } else {
                result.forEach(element =>{
                    dom.Recipe(element, recipeContainer, {
                    onDelete: fetcher.deleteRecipe.bind(fetcher),
                    onUpdate: fetcher.updateRecipe.bind(fetcher),
                });
                })
                
            }
        } catch (err) {
            console.error("Search error:", err);
        }
    }
}

main();
