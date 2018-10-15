import React, { Component } from 'react';
import RandomSprout from '../components/RandomSprout';
import SproutsIndex from '../components/SproutsIndex';
import LongestSprout from '../components/LongestSprout';

class SproutsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: "",
      recipes: [],
      longestRecipe: '',
    };

    this.getRandomRecipe = this.getRandomRecipe.bind(this);
    this.getAllRecipes = this.getAllRecipes.bind(this);
    this.getLongestRecipe = this.getLongestRecipe.bind(this);
  }

  getRandomRecipe(){
    fetch('http://localhost:4567/api/v1/random-recipe')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let randomRecipe = body;
      this.setState(
        {
          recipe: randomRecipe,
          recipes: [],
          longestRecipe: ''
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getAllRecipes(){
    fetch('/api/v1/recipes')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let allRecipes = body;
      this.setState(
        {
          recipes: allRecipes,
          recipe: '',
          longestRecipe: ''
        });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getLongestRecipe() {

    fetch('api/v1/longest-recipe')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let longestRecipe = body;
      this.setState(
        {
          longestRecipe: longestRecipe,
          recipe: '',
          recipes: []
        });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let handleRandomClick = (event) => {
        this.getRandomRecipe();
    };

    let handleIndexClick = () => {
      this.getAllRecipes();
    };

    let handleLongestRecipeClick = () => {
      this.getLongestRecipe();
    };

    return(
      <div className="container">
        <h1>Sprout Fetcher</h1>
          <RandomSprout
            recipe={this.state.recipe}
          />

          <SproutsIndex
            recipes={this.state.recipes}
          />
          <LongestSprout
            longestRecipe={this.state.longestRecipe}
          />

        <div className="buttons">
          <button name="randomRecipe" onClick={handleRandomClick} className="btn">Get Random Recipe</button>

          <button onClick={handleIndexClick} className="btn">See All Recipes</button>

          <button onClick={handleLongestRecipeClick} className="btn">Get Longest Recipe</button>
        </div>
      </div>
    )
  }
}

export default SproutsContainer;
