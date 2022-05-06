import "./Search.css";
import { useLocation } from "react-router-dom";
import { IRecipe } from "../../api/recipes/Recipe";
import RecipeList from "../../components/RecipeList/RecipeList";
import { useTheme } from "../../api/hooks/useTheme";
import { projectFirestore } from "../../firebase/config";
import "firebase/firestore";
import { useEffect, useState } from "react";

export default function Search() {
  const { themeStyle } = useTheme();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIserror] = useState(false);
  const [matchingRecipes, setMatchingRecipes] = useState<
    IRecipe[] | undefined
  >();

  useEffect(() => {
    projectFirestore
      .collection("recipes")
      .get()
      .then((collection) => {
        if (collection.empty) {
          setIserror(true);
          setIsLoading(false);
        } else {
          let results: IRecipe[] = [];
          collection.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() } as IRecipe);
          });
          setIsLoading(false);
          if (query) {
            setMatchingRecipes(
              results.filter(
                (recipe) =>
                  recipe.title.includes(query) || recipe.method.includes(query)
              )
            );
          }
        }
      })
      .catch((error) => {
        setIserror(true);
        setIsLoading(false);
      });
  }, [query]);

  return (
    <div className={`search ${themeStyle.mode}`}>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {isError && <p className="error">Could Not Load Recipes</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {matchingRecipes && <RecipeList recipes={matchingRecipes} />}
    </div>
  );
}
