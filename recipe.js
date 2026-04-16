// TEST
console.log("Javascript is working");
// const input="kentucky fried chicken"

//variables to hold Name, Ingredients, Instructions, Searchbar and button
const containerName=document.getElementById("mealName")
//containerName.innerHTML = "";
const containerIngredients=document.getElementById("ingredients")
const containerInstructions=document.getElementById("instructions")
const searchInput=document.querySelector(".input")
const button=document.getElementById("btn")

// OUR MAIN FUNCTION THAT DISPLAYS THE DATA FROM API
async function getRecipe(foodName) {
    // Having the try...catch to track errors with the API
    try{

        // Initially setting the text contents to empty
        containerName.innerHTML = "";
        containerIngredients.innerHTML = "";
        containerInstructions.innerHTML = "";

        // OUR BASE API URL
        const baseUrl=`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(foodName)}`

        const res=await fetch(baseUrl);     //getting response from the API    
        //console.log(res);
        
        const data=await res.json()         //converting response to data
        console.log(data); 

        // A code to check if user input exists
        if (!data.meals) {
            // Js Styling
            containerName.style.color="red";
            containerName.style.fontSize = "30px";
            containerName.style.fontWeight="bold"
            containerName.style.marginLeft = "25px";
            containerName.style.fontStyle="italic"
            //feedback
            containerName.textContent = "No recipes found...!";
            return;
        }

        // Looping through the meals arrray to locate user input
        data.meals.forEach(item=>{
            const listName = document.createElement("div");   //a div to hold strname
            
            listName.textContent = item.strMeal;
            containerName.appendChild(listName);     //appending the div to html

            //FOR LOOP TO GET INGREDIENTS ONE BY ONE
            for (let i = 1; i <= 20; i++) {
                const ingredient = item[`strIngredient${i}`];
                const measure = item[`strMeasure${i}`];
        
                // Stop if ingredient is empty or null
                if (!ingredient || ingredient.trim() === "") break;
                

                //displaying the ingredients on our web page
                const listIngredients = document.createElement("li");
                listIngredients.textContent = `${measure} ${ingredient}`.trim();
                containerIngredients.appendChild(listIngredients);
            }

            //Codes to display cooking instructions
            const listInstructions = document.createElement("div");
            listInstructions.textContent = item.strInstructions;
            containerInstructions.appendChild(listInstructions);

        }); 
    }
    //The catch for returning errors
    catch(err) {
        document.getElementById('error').innerHTML = "Error occurred with your connection...!";
        console.error(err);
    }

}

// AN EVENT LISTENER FOR THE BUTTON AND SEARCHBAR
button.addEventListener("click",(event)=>{
    event.preventDefault();                           //prevents defaulst bahaviuor of html form submission
    getRecipe(searchInput.value)                      //I call the function that takes in user input
    searchInput.value=""                              //initializing the search bar to empty after submission
})


              //THE END