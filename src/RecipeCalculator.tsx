import React, { useState, useMemo } from "react";

interface Recipe {
  name: string;
  feeds: number;
  ingredients: { [key: string]: number };
  icon: string;
}

const recipes: Recipe[] = [
  {
    name: "Burger",
    feeds: 1,
    ingredients: { Meat: 1, Lettuce: 1, Tomato: 1, Cheese: 1, Dough: 1 },
    icon: "🍔",
  },
  {
    name: "Pie", 
    feeds: 1,
    ingredients: { Dough: 2, Meat: 2 },
    icon: "🥧",
  },
  {
    name: "Sandwich",
    feeds: 1,
    ingredients: { Dough: 1, Cucumber: 1 },
    icon: "🥪",
  },
  {
    name: "Pasta",
    feeds: 2,
    ingredients: { Dough: 2, Tomato: 1, Cheese: 2, Meat: 1 },
    icon: "🍝",
  },
  {
    name: "Salad",
    feeds: 3,
    ingredients: { Lettuce: 2, Tomato: 2, Cucumber: 1, Cheese: 2, Olives: 1 },
    icon: "🥗",
  },
  {
    name: "Pizza",
    feeds: 4,
    ingredients: { Dough: 3, Tomato: 2, Cheese: 3, Olives: 1 },
    icon: "🍕",
  },
];

const ingredientsList = ["Cucumber", "Olives", "Lettuce", "Meat", "Tomato", "Cheese", "Dough"];

export default function RecipeCalculator() {
  const [ingredients, setIngredients] = useState({
    Cucumber: 2, Olives: 2, Lettuce: 3, 
    Meat: 6, Tomato: 6, Cheese: 8, Dough: 10,
  });

  const updateIngredient = (ingredient: string, value: number) => {
    setIngredients(prev => ({ ...prev, [ingredient]: Math.max(0, value) }));
  };

  const calculateMaxServings = useMemo(() => {
    const results = recipes.map((recipe) => {
      const maxPossible = Math.floor(
        Math.min(
          ...Object.entries(recipe.ingredients).map(([ingredient, required]) => {
            const available = ingredients[ingredient] || 0;
            return available / required;
          })
        )
      );
      return {
        recipe: recipe.name,
        maxServings: maxPossible,
        totalPeople: maxPossible * recipe.feeds,
        icon: recipe.icon,
      };
    });

    const totalMaxPeople = Math.max(...results.map(r => r.totalPeople));
    const bestRecipe = results.find(r => r.totalPeople === totalMaxPeople);

    return { results, totalMaxPeople, bestRecipe };
  }, [ingredients]);

  return ({/* Header */}🍳 Recipe CalculatorCalculate the maximum number of people you can feed with your available ingredients</piv{/* Ingredients Panel */}🧮 Available Ingredients</h2{ingredientsList.map((ingredient) => ({ingredient}updateIngredient(ingredient, (ingredients[ingredient] || 0) - 1)}
                        className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center text-red-600"
                      >
                        -updateIngredient(ingredient, parseInt(e.target.value) || 0)}
                        className="w-16 text-center border rounded px-2 py-1"
                        min="0"
                      />updateIngredient(ingredient, (ingredients[ingredient] || 0) + 1)}
                        className="w-8 h-8 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center text-green-600"
                      >
                        +))}{/* Results Panel */}{/* Summary */}👥 Maximum People: {calculateMaxServings.totalMaxPeople}</hcalculateMaxServings.bestRecipe && (Best option:{calculateMaxServings.bestRecipe.icon} {calculateMaxServings.bestRecipe.recipe}({calculateMaxServings.bestRecipe.maxServings} servings))}{/* Recipe Results */}{calculateMaxServings.results.map((result) => (0
                      ? "ring-2 ring-orange-300 bg-orange-50"
                      : ""
                  }`}
                >{result.icon}{result.recipe}{result.totalPeople} peopleMax servings: {result.maxServings}</piv);
}
