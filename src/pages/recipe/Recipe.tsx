import "./Recipe.css";
import { useParams } from "react-router";
// import { useAxios } from '../../api/hooks/useAxios';
import { IRecipe } from "../../api/recipes/Recipe";
import { useTheme } from "../../api/hooks/useTheme";
import { projectFirestore } from "../../firebase/config";
import { useState, useEffect } from "react";

export default function Recipe() {
  const { themeStyle } = useTheme();
  const { id } = useParams<{ id?: string }>();

  // const {responseData: recipe, isLoading, isError} = useAxios<IRecipe>({
  //     method: 'get',
  //     url: `http://localhost:3000/recipes/${id}`
  // })

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIserror] = useState(false);
  const [recipe, setRecipe] = useState<IRecipe | undefined>();

  useEffect(() => {
    setIsLoading(true);
    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          setIserror(true);
          setIsLoading(false);
        } else {
          setRecipe({ id, ...doc.data() } as IRecipe);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIserror(true);
      });
  }, [id]);

  return (
    <div className={`recipe ${themeStyle.mode}`}>
      {isLoading && <p className="loading">Loading...</p>}
      {isError && <p className="error">Could Not Load Recipe</p>}
      {recipe && (
        <>
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
    </div>
  );
}
