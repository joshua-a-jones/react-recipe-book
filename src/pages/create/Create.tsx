import React, { FormEvent, useState, useRef } from "react";
import "./Create.css";
import { IRecipe } from "../../api/recipes/Recipe";
import { useHistory } from "react-router-dom";
import { useTheme } from "../../api/hooks/useTheme";
import { projectFirestore } from "../../firebase/config";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const { themeStyle } = useTheme();
  const ingredientInput = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const [isError, setIserror] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const recipe: IRecipe = {
      title,
      method,
      cookingTime: cookingTime + " minutes",
      ingredients,
    };

    try {
      await projectFirestore.collection("recipes").add(recipe);
      setIserror(false);
      history.push("/");
    } catch (error) {
      setIserror(true);
    }
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!ingredients[0]) {
      setIngredients([newIngredient.trim()]);
    } else if (newIngredient && !ingredients.includes(newIngredient.trim())) {
      setIngredients((prevIngredients) => [
        ...prevIngredients,
        newIngredient.trim(),
      ]);
    }

    setNewIngredient("");
    ingredientInput.current?.focus();
  };

  const handleRemove = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const filteredIngredients = ingredients.filter(
      (i) => i !== target.innerText.trim()
    );
    setIngredients(filteredIngredients);
  };

  return (
    <div className={`create ${themeStyle.mode}`}>
      {isError && (
        <p className="error">
          Saving recipe was not successful. Please try again.
        </p>
      )}

      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="button">
              Add
            </button>
          </div>
        </label>
        <p>
          Current Ingredients:{" "}
          {ingredients[0] &&
            ingredients.map((i) => (
              <em onClick={(e) => handleRemove(e)} key={i}>
                {i}
              </em>
            ))}
        </p>
        <label>
          <span>Method:</span>
          <textarea
            onChange={(e) => {
              setMethod(e.target.value);
            }}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking Time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            min="0"
            required
          />
        </label>
        <button className="button">Submit</button>
      </form>
    </div>
  );
}
