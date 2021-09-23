// Selectors
let searchTextElement = document.getElementById("search-meal-input");
const searchButton = document.getElementById("search-button");
const mealSearchResultsContainer = document.getElementById("meal");
const mealDetailsContainer = document.getElementById("meal-details-container");
const backButton = document.getElementsByClassName("back-button")[0];

// Event Listeners
searchButton.addEventListener("click", searchForMeal);
searchTextElement.addEventListener("input", searchForMeal);
mealSearchResultsContainer.addEventListener("click", getRecipeDetails);
backButton.addEventListener("click", closeRecipeDetails);

// Functions
function searchForMeal() {
  let searchText = searchTextElement.value;
  // Promise chaining
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    // convert response to json
    .then((response) => response.json())
    // json structure -> {meals:[]}
    .then((data) => {
      let list = "";
      if (data.meals) {
        // loop over every meal and add it to the list
        data.meals.forEach((meal) => {
          list += `
              <div class = "meal-item d-flex flex-column align-items-center" id = "${meal.idMeal}">
                  <div class = "meal-img">
                      <img src = "${meal.strMealThumb}" alt = "food">
                  </div>
                  <div class = "meal-name">
                      <h3>${meal.strMeal}</h3>
                      <a href = "#" class = "recipe-button">Get the Recipe</a>
                  </div>
                  <button type="submit" class="btn btn-sm btn-outline-primary" id="favourite-button"> Add To Favourites </button>
              </div>
          `;
        });
      }
      // append all meals found to meal div
      mealSearchResultsContainer.innerHTML = list;
    });
}

// To display recipe details
function getRecipeDetails(event) {
  // event.preventDefault();

  if (event.target.classList.contains("recipe-button")) {
    let mealItem = event.target.parentElement.parentElement;
    console.log(mealItem);
    const mealId = mealItem.id;
    let content = ``;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => response.json())
      .then((data) => addRecipeDetail(data.meals[0]));

    // console.log(mealDetailsContainer.parentElement);
  }
}

function addRecipeDetail(meal) {
  let content = `
    <h2 class = "recipe-title">${meal.strMeal}</h2>
    <div class = "recipe-instructions">
        
        <p>${meal.strInstructions}</p>
    </div>
    <div class = "recipe-meal-img">
        <img src = "${meal.strMealThumb}" alt = "">
    </div>
    <div class = "recipe-link">
        <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
    </div>`;
  mealDetailsContainer.innerHTML = content;
  mealDetailsContainer.parentElement.classList.add("show-recipe");
}

// To close recipe details
function closeRecipeDetails() {
  mealDetailsContainer.parentElement.classList.remove("show-recipe");
  // console.log(mealDetailsContainer.parentElement);
}
