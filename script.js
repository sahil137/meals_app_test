// Selectors
let searchTextElement = document.getElementById("search-meal-input");
const searchButton = document.getElementById("search-button");
const mealSearchResultsContainer = document.getElementById("meal");

// Event Listeners
searchButton.addEventListener("click", searchForMeal);
searchTextElement.addEventListener("input", searchForMeal);

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
              <div class = "meal-item d-flex flex-column align-items-center" meal-id = "${meal.idMeal}">
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
