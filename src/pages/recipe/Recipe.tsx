import "./Recipe.css";
import { useParams } from "react-router";
import { IRecipe } from "../../api/recipes/Recipe";
import { useTheme } from "../../api/hooks/useTheme";
import { projectFirestore } from "../../firebase/config";
import { useState, useEffect } from "react";
import EditRecipeForm from "../../components/EditRecipeForm/EditRecipeForm";
import { MdEdit } from "react-icons/md";

export default function Recipe() {
  const { themeStyle } = useTheme();
  const { id } = useParams<{ id?: string }>();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIserror] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [recipe, setRecipe] = useState<IRecipe | undefined>();

  useEffect(() => {
    setIsLoading(true);

    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (!doc.exists) {
          setIserror(true);
          setIsLoading(false);
        } else {
          setRecipe({ id, ...doc.data() } as IRecipe);
          setIsLoading(false);
        }
      });

    return unsub;
  }, [id]);

  const onSaveEdit = (newRecipe: IRecipe) => {
    projectFirestore.collection("recipes").doc(id).update(newRecipe);
    setIsEditing(false);
  };

  const onCanceledit = () => {
    setIsEditing(false);
  };

  return (
    <div className={`recipe ${themeStyle.mode}`}>
      {isLoading && <p className="loading">Loading...</p>}
      {isError && <p className="error">Could Not Load Recipe</p>}
      {recipe && !isEditing && (
        <>
          <MdEdit className="edit-button" onClick={() => setIsEditing(true)} />
          <h2 className="page-title">{recipe.title}</h2>
          <p>{recipe.cookingTime}</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
      {isEditing && recipe && (
        <EditRecipeForm
          oldRecipe={recipe}
          onSave={onSaveEdit}
          onCancel={onCanceledit}
        />
      )}
    </div>
  );
}
