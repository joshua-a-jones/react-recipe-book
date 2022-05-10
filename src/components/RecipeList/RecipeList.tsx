import "./RecipeList.css";
import React from "react";
import { Link } from "react-router-dom";
import { IRecipe } from "../../api/recipes/Recipe";
import { useTheme } from "../../api/hooks/useTheme";
import { MdDelete } from "react-icons/md";
import { projectFirestore } from "../../firebase/config";
import { useAuth } from "../../api/hooks/useAuth";

export interface RecipeListProps {
  recipes: IRecipe[];
}

export default function RecipeList(props: RecipeListProps) {
  const { themeStyle } = useTheme();
  const { recipes } = props;
  const { authState } = useAuth();

  if (recipes.length === 0) {
    return <div className={`error ${themeStyle.mode}`}>No Recipes Found.</div>;
  }

  const handleDelete = (id: string | undefined) => {
    try {
      projectFirestore
        .collection(`users/${authState.user?.uid}/recipes`)
        .doc(id)
        .delete();
    } catch (error) {
      // TODO: add some error handling
      console.log(error);
    }
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => {
        return (
          <React.Fragment key={recipe.id}>
            <div className={`card ${themeStyle.mode}`}>
              <Link to={`/recipes/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <p>{recipe.cookingTime}</p>
                <div>{recipe.method.substring(0, 100) + "..."}</div>
              </Link>
              <MdDelete
                className={"delete-button"}
                onClick={() => handleDelete(recipe.id)}
              />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
