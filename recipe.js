
console.log("Javascript is working");
// const input="kentucky fried chicken"

//variables to hold Name, Ingredients, Instructions, Searchbar and button
const containerName=document.getElementById("mealName")
const containerIngredients=document.getElementById("ingredients")
const containerInstructions=document.getElementById("instructions")
const searchInput=document.querySelector(".input")
const button=document.getElementById("btn")

let optionSelected;


// Function to deal with multiple Meal Names from the Server
async function getMealNames(foodName) {
    try{
        // Fetching data from the DB Meal Server
        const baseUrl=`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(foodName)}`
        const res=await fetch(baseUrl);       
        
        const data=await res.json()        
        console.log(data); 

        // Loop through meal names and store them into a created <select> element
        data.meals.forEach(foods=>{
                const listName = document.createElement("option");  
                listName.value=foods.strMeal
                listName.textContent=foods.strMeal
                containerName.appendChild(listName);
        })
        if (data.meals.length === 1) {
            containerName.value = data.meals[0].strMeal;
            getRecipe(data.meals[0].strMeal);
        }
        // An Event Listener for the <select> options 
        containerName.addEventListener("change",function(){
            const selectedMeal=this.value 

            if (selectedMeal !== "") {
                getRecipe(selectedMeal);
            }
        })
    }
    catch{
        // Js Styling of the error induced
        const eerrors=document.getElementById("error")
        eerrors.style.color="red";
        eerrors.style.fontSize = "30px";
        eerrors.style.fontWeight="bold"
        eerrors.style.marginLeft = "25px";
        eerrors.style.fontStyle="italic"
        //feedback
        eerrors.textContent = "No recipes found...!";
        console.log(error);
    }
}

//  FUNCTION THAT DISPLAYS THE DATA FROM API
async function getRecipe(optionSelected) {
    // Having the try...catch to track errors with the API
    try{
        // Initially setting the text contents to empty
        containerIngredients.innerHTML = "";
        containerInstructions.innerHTML = "";

        // OUR BASE API URL
        const baseUrl=`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(optionSelected)}`

        const res=await fetch(baseUrl);     //getting response from the API    
        //console.log(res);
        
        const data=await res.json()         //converting response to data
        console.log(data); 


        // Looping through the meals arrray to locate user input
        data.meals.forEach(item=>{
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
    event.preventDefault();  
    containerName.innerHTML = "";                       
    const optionSelected=getMealNames(searchInput.value)                      
    searchInput.value=""                              
})
              //THE END