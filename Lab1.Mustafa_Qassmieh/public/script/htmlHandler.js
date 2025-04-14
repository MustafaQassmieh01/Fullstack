export const dom = {};

/**
 * @param {recipe} recipe- object from the database to be formated
 * @param {HTMLDivElement} parent- tag to upload this into
 * @param {Map} options -this is to store all kinds of values
 *  - @param {function} onDelete -function to be executed on delete click
 *  - @param {function} onUpdate -function executed when edit button clicks save after editinh
 * 
 */
dom.Recipe =(recipe,main, options ={}) => {

    const parent = document.createElement('div')
    parent.classList.add('recipe-card')

    //creating the actual container inside the html
    const childContainer = document.createElement('div')
    childContainer.classList.add('recipe-container')
    childContainer.setAttribute('data-id',recipe._id)

    //making tags for name and date
    const recipeName = document.createElement('h3');
    recipeName.classList.add('name-tag');
    recipeName.textContent = recipe.name;

    const recipeTime = document.createElement('p');
    recipeTime.classList.add('time-tag')
    recipeTime.textContent = `Time: ${recipe.cookingTime}`;

    // creating the ingredient and instruction elements
    const instructions = document.createElement('span');
    instructions.classList.add('instruction-container');
    dom.List(instructions,
        recipe.preparationSteps,
        'Instructions',
        {class:'instructions'} //options
    )

    const ingredients = document.createElement('span');
    ingredients.classList.add('ingredient-container');
    dom.List(ingredients,
        recipe.ingredients,
        'Ingredients',
        {class: 'ingredients'} //options
    )
    // creating the origin and spice level
    const origin = document.createElement('p');
    origin.classList.add('origin');
    origin.innerText = `Origin: ${recipe.origin}`

    const spice = document.createElement('p');
    spice.classList.add('spice');
    spice.innerText = `Spice-Level${recipe.spiceLevel}`

    //final point of creativity ill just add a circle div to hold the pic later probably;
    const pictureFrame = document.createElement('span')
    pictureFrame.classList.add('circle', 'picture-frame')
    pictureFrame.setAttribute('recipe-name', recipe.name)

    //almost forgot the buttons
    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container');
    
    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.setAttribute('data-id',recipe._id)
    editButton.textContent = 'Edit'
    editButton.onclick = async ()=>{
       // Clear the parent and show the recipe form
       parent.innerHTML = '';
       dom.recipeForm(parent, { recipe: recipe, mode: 'update', id: recipe._id,editButton },
        //     (id,data)=>{
        //         console.log(`onUpdate called with ${JSON.stringify(data)}`);
        //         options.onUpdate(id,data)
        //     }
         options.onUpdate
        );
    }
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.setAttribute('data-id',recipe._id)
    deleteButton.textContent = 'Delete'
    deleteButton.onclick = async ()=>{
        const deleted = await options.onDelete(recipe._id)
        deleted && parent.remove()
    }
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    

    //finally adding everything together

    parent.appendChild(recipeName);
    childContainer.appendChild(pictureFrame)
    childContainer.appendChild(ingredients)
    childContainer.appendChild(instructions)
    parent.appendChild(childContainer)
    parent.appendChild(recipeTime)    
    parent.appendChild(origin)
    parent.appendChild(spice)
    parent.appendChild(buttonContainer)
    main.appendChild(parent)
}

dom.List = (parent, List, title, options= {}) =>{
    
    if(title){
        const heading = document.createElement('h4');
        heading.textContent = title;
        parent.appendChild(heading)
    }

    const ul = document.createElement('ul');
    ul.classList.add(options.class || 'list');
    
    List.forEach(item =>{
        const li = document.createElement('li');
        options.class && li.classList.add(`li-${options.class}`); // One-liner to add class if options.class exists
        li.textContent = item;
        ul.appendChild(li)
    })

    parent.appendChild(ul)
}

// dom.createNew = (parent,next)=>{
//     const title = document.createElement('h3')
//     title.classList.add('')

// }

/**
 * Creates a recipe form with pre-filled values if in update mode, or empty fields for a new recipe.
 * 
 * @param {HTMLElement} div - The parent element where the form will be appended.
 * @param {Map} options - Contains configuration for the form.
 * @param {string} [options.mode] - The mode of the form. Can be either 'create' (default) or 'update'. If 'update', the form will be pre-filled with existing recipe data.
 * @param {Object} [options.recipe] - The recipe object that contains the data for pre-filling the form in update mode. The structure should be:
 *   - @param {string} options.recipe.name - The name of the recipe (required in update mode).
 *   - @param {Array<string>} options.recipe.ingredients - An array of ingredients (required in update mode).
 * @param {string} [options.class] - A custom CSS class to apply to the form.
 * 
 * @param {function} onSave - Callback function that is invoked when the form is submitted. It receives the form data as an argument:
 *   - @param {Object} data - The data from the form, which includes:
 *     - @param {string} data.name - The name of the recipe.
 *     - @param {Array<string>} data.ingredients - An array of ingredients entered by the user.
 */

dom.recipeForm= (parent,options ={},onSave)=>{
    // creating the form layer
    const mainForm = document.createElement('form');
    options.class && mainForm.classList.add(`${options.class}`);
    mainForm.setAttribute('id', 'recipe-form');

    // Create label and input for recipe name
    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'recipe-name');
    nameLabel.textContent = 'Recipe Name:';
    const recipeName = document.createElement('input');
    recipeName.setAttribute('id', 'recipe-name');
    recipeName.setAttribute('type', 'text');
    recipeName.setAttribute('class', 'name-input');
    if (options.mode === 'update' && options.recipe.name) {
        recipeName.value = options.recipe.name;
    }

    // Create label and input for ingredients
    const ingredientsLabel = document.createElement('label');
    ingredientsLabel.setAttribute('for', 'ingredients');
    ingredientsLabel.textContent = 'Ingredients:';
    const ingredients = document.createElement('input');
    ingredients.setAttribute('id', 'ingredients');
    ingredients.setAttribute('type', 'text');
    ingredients.setAttribute('class', 'ingredients-input');
    if (options.mode === 'update' && options.recipe.ingredients) {
        ingredients.value = options.recipe.ingredients.join(', ');
    }

    // Create label and input for preparation steps
    const instructionsLabel = document.createElement('label');
    instructionsLabel.setAttribute('for', 'preparation-steps');
    instructionsLabel.textContent = 'Preparation Steps:';
    const instructions = document.createElement('input');
    instructions.setAttribute('id', 'preparation-steps');
    instructions.setAttribute('type', 'text');
    instructions.setAttribute('class', 'preparation-steps-input');
    if (options.mode === 'update' && options.recipe.preparationSteps) {
        instructions.value = options.recipe.preparationSteps.join(', ');
    }

    // Create label and input for cooking time
    const timeLabel = document.createElement('label');
    timeLabel.setAttribute('for', 'cooking-time');
    timeLabel.textContent = 'Cooking Time:';
    const time = document.createElement('input');
    time.setAttribute('id', 'cooking-time');
    time.setAttribute('type', 'text');
    time.setAttribute('class', 'time-input');
    if (options.mode === 'update' && options.recipe.cookingTime) {
        time.value = options.recipe.cookingTime;
    }

    // Create label and input for origin
    const originLabel = document.createElement('label');
    originLabel.setAttribute('for', 'origin');
    originLabel.textContent = 'Origin:';
    const origin = document.createElement('input');
    origin.setAttribute('id', 'origin');
    origin.setAttribute('type', 'text');
    origin.setAttribute('class', 'origin-input');
    if (options.mode === 'update' && options.recipe.origin) {
        origin.value = options.recipe.origin;
    }

    // Create label and input for spice level
    const spiceLevelLabel = document.createElement('label');
    spiceLevelLabel.setAttribute('for', 'spice-level');
    spiceLevelLabel.textContent = 'Spice Level:';
    const spiceLevel = document.createElement('input');
    spiceLevel.setAttribute('id', 'spice-level');
    spiceLevel.setAttribute('type', 'text');
    spiceLevel.setAttribute('class', 'spiceLevel-input');
    if (options.mode === 'update' && options.recipe.spiceLevel) {
        spiceLevel.value = options.recipe.spiceLevel;
    }

    // Create the submit button
    const save = document.createElement('input');
    save.setAttribute('type', 'submit');
    save.setAttribute('id', 'submit-button');
    save.setAttribute('value', options.mode === 'update' ? 'Update Recipe' : 'Create Recipe');

    save.onclick = (e) => {
        // e.preventDefault()
            const data = {
            name: recipeName.value,
            ingredients: ingredients.value.split(',').map(i => i.trim()),
            preparationSteps: instructions.value.split(',').map(i => i.trim()),
            cookingTime: time.value,
            origin: origin.value,
            spiceLevel: spiceLevel.value,
            };
        
            // Trigger the onSave callback with the collected data
            if(options.mode === 'update'&& options.recipe._id) {
                console.log('options.id:', options.id);
                console.log('data:', data);
                console.log('Calling onSave...');
                onSave( options.id,data);
            }else{onSave(data);}
        

            // mainForm.remove()
    };

    mainForm.appendChild(nameLabel);
    mainForm.appendChild(recipeName);

    mainForm.appendChild(ingredientsLabel);
    mainForm.appendChild(ingredients);

    mainForm.appendChild(instructionsLabel);
    mainForm.appendChild(instructions);

    mainForm.appendChild(timeLabel);
    mainForm.appendChild(time);

    mainForm.appendChild(originLabel);
    mainForm.appendChild(origin);

    mainForm.appendChild(spiceLevelLabel);
    mainForm.appendChild(spiceLevel);

    mainForm.appendChild(save);

    // Add the form to the parent container
    parent.appendChild(mainForm);

}

// dom.edit = (recipe)=>{


// }

// dom.delete = (recipe) => {

// }