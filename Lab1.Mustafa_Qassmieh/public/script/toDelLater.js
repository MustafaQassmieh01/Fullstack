export const tableDom = {};

tableDom.Recipe = (recipe, main, options = {}) => {
    let table = main.querySelector('table');

    // Create the table if it doesn't exist
    if (!table) {
        table = document.createElement('table');
        table.classList.add('recipe-table');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Name', 'Time', 'Origin', 'Spice Level', 'Ingredients', 'Instructions', 'Actions'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        main.appendChild(table);
    }

    const tbody = table.querySelector('tbody');
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = recipe.name;
    row.appendChild(nameCell);

    const timeCell = document.createElement('td');
    timeCell.textContent = recipe.cookingTime;
    row.appendChild(timeCell);

    const originCell = document.createElement('td');
    originCell.textContent = recipe.origin;
    row.appendChild(originCell);

    const spiceCell = document.createElement('td');
    spiceCell.textContent = recipe.spiceLevel;
    row.appendChild(spiceCell);

    const ingredientsCell = document.createElement('td');
    ingredientsCell.textContent = recipe.ingredients.join(', ');
    row.appendChild(ingredientsCell);

    const instructionsCell = document.createElement('td');
    instructionsCell.textContent = recipe.preparationSteps.join(', ');
    row.appendChild(instructionsCell);

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
        main.innerHTML = '';
        tableDom.recipeForm(main, { recipe, mode: 'update', id: recipe._id }, options.onUpdate);
    };
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = async () => {
        const deleted = await options.onDelete(recipe._id);
        if (deleted) row.remove();
    };
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
    row.appendChild(actionsCell);

    tbody.appendChild(row);
};

// dom.List = () => {};

tableDom.recipeForm = (parent, options = {}, onSave) => {
    const mainForm = document.createElement('form');
    mainForm.classList.add('recipe-form');

    const inputs = [
        { id: 'recipe-name', label: 'Recipe Name', value: options.recipe?.name || '' },
        { id: 'ingredients', label: 'Ingredients (comma separated)', value: options.recipe?.ingredients?.join(', ') || '' },
        { id: 'preparation-steps', label: 'Preparation Steps (comma separated)', value: options.recipe?.preparationSteps?.join(', ') || '' },
        { id: 'cooking-time', label: 'Cooking Time', value: options.recipe?.cookingTime || '' },
        { id: 'origin', label: 'Origin', value: options.recipe?.origin || '' },
        { id: 'spice-level', label: 'Spice Level', value: options.recipe?.spiceLevel || '' }
    ];

    inputs.forEach(({ id, label, value }) => {
        const labelElem = document.createElement('label');
        labelElem.setAttribute('for', id);
        labelElem.textContent = label;

        const input = document.createElement('input');
        input.id = id;
        input.value = value;

        mainForm.appendChild(labelElem);
        mainForm.appendChild(input);
    });

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = options.mode === 'update' ? 'Update Recipe' : 'Create Recipe';
    mainForm.appendChild(submitBtn);

    submitBtn.onclick = (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('recipe-name').value,
            ingredients: document.getElementById('ingredients').value.split(',').map(i => i.trim()),
            preparationSteps: document.getElementById('preparation-steps').value.split(',').map(i => i.trim()),
            cookingTime: document.getElementById('cooking-time').value,
            origin: document.getElementById('origin').value,
            spiceLevel: document.getElementById('spice-level').value,
        };
        if (options.mode === 'update') {
            onSave(options.id, data);
        } else {
            onSave(data);
        }
    };

    parent.appendChild(mainForm);
};
