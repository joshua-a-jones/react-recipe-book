import React, { useState } from "react";
import { IRecipe } from "../../api/recipes/Recipe";
import "./EditRecipeForm.css";
import { useTheme } from "../../api/hooks/useTheme";

interface EditRecipeFormProps {
  oldRecipe: IRecipe;
  onSave: (newRecipe: IRecipe) => void;
  onCancel: () => void;
}

export default function EditRecipeForm(props: EditRecipeFormProps) {
  const { oldRecipe, onSave, onCancel } = props;

  const { themeStyle } = useTheme();
  const [title, setTitle] = useState(oldRecipe.title);
  const [method, setMethod] = useState(oldRecipe.method);
  const [cookingTime, setCookingTime] = useState(oldRecipe.cookingTime);
  const [ingredients, setIngredients] = useState<string>(
    oldRecipe.ingredients.join(", ")
  );

  const formatIngredients = () => {
    return ingredients.split(", ").map((ing) => ing.trim());
  };

  return (
    <>
      <input
        type="text"
        className={`title-input ${themeStyle.mode}`}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      />
      <input
        type="text"
        className={`cooking-time-input ${themeStyle.mode}`}
        onChange={(e) => setCookingTime(e.target.value)}
        value={cookingTime}
        required
      />
      <input
        type="text"
        className={`ingredients-input ${themeStyle.mode}`}
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <textarea
        className={`method-input ${themeStyle.mode}`}
        onChange={(e) => {
          setMethod(e.target.value);
        }}
        value={method}
        required
      />

      <div className="h-stack button-container">
        <button className="button cancel" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="button save"
          onClick={() =>
            onSave({
              title,
              method,
              cookingTime,
              ingredients: formatIngredients(),
            })
          }
        >
          Save
        </button>
      </div>
    </>
  );
}
