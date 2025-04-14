/**
 * so here i have to do all the fetch 
 * i have to asign somewhat of a standard look for each recipe and then assign values to them 
 * make the buttons and add listeners and functionality 
 */

/**
 * fetch all recipes  
 */ 
class Fetch{
    async fetchAllRecipes(){
        try{
            const res = await fetch('/api/recipes');
            if(!res.ok){
                console.log(res.json())
                throw new Error(`HTTP error! Status: ${res.status}`);

            }
            const recipes = await res.json()
            return recipes;
        }catch(err){
            console.error(err.message)

        }
    }

    async fetchRecipe(name){
        try{
            const res = await fetch(`/api/recipe/${name}`)
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const recipe = await res.json()
            return recipe 
        }catch(err){
            console.error(err.message)

        }
    }

    async createRecipe(newRecipe){
        try{
            const res = await fetch('/api/recipes',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(newRecipe),
            });
            if(!res.ok){
                throw new Error(`HTTP error! status ${res.status}`);
            }
            const Recipe = await res.json()
            return Recipe
        }catch(err){
            console.error(err.message)
        }

    }

    async updateRecipe(id,body){
        try{
            const string = JSON.stringify(id)
            const bodyString = JSON.stringify(body)
            console.log(`reached the fetch update with ${string}
                \n\n\n
                and this is the body ${body}`)
            const res = await fetch(`/api/recipes/${id}`,{
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(body),
            });
            if(!res.ok){
                console.log(res.json())
                throw new Error(`HTTP error! status ${res.status}`);
            }
            const newRecipe = await res.json()
            return newRecipe
        }catch(err){
            console.error(err.message)
        }

    }

    async deleteRecipe(id){
        try{
            
            const res = await fetch(`/api/recipe/${id}`,{
                method: 'DELETE',
            })
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const answer = await res.json()
            return answer
        }catch(err){
            console.error(err.message)

        }
    }
}
export const fetcher = new Fetch();
