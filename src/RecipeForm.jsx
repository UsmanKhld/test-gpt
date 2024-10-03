import React, { useState } from "react";
import axios from "axios";
import "./RecipeForm.css";

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState("");
  const [style, setStyle] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [cuisine, setCuisine] = useState("");

  const apiKey = import.meta.env.VITE_APP_OPENAI_API_KEY;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const prompt = `I have the following ingredients: ${ingredients}. I want to cook a ${style} dish, and in this cuisine: ${cuisine}. Please suggest a recipe.`;

    try {
      const result = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that generates creative recipes based on given ingredients, preferred cooking style, and cooking time.",
            },
            { role: "user", content: prompt },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      setRecipe(result.data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-form-container">
      <h1>Generate a Recipe</h1>
      <form onSubmit={handleFormSubmit} className="recipe-form">
        <div className="form-group">
          <label>Ingredients (comma separated):</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Style of food (e.g., Italian, Mexican):</label>
          <input
            type="text"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Cuisine:</label>
          <input
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Generating Recipe..." : "Generate Recipe"}
        </button>
      </form>

      {recipe && (
        <div className="recipe-output">
          <h2>Your Generated Recipe:</h2>
          <p>{recipe}</p>
        </div>
      )}
      <a href="/">
        <button>back home</button>
      </a>
    </div>
  );
};

export default RecipeForm;
