import "./Home.css";
import { IRecipe } from "../../api/recipes/Recipe";
import RecipeList from "../../components/RecipeList/RecipeList";
import { projectFirestore } from "../../firebase/config";
import { useEffect, useState } from "react";
import { useAuth } from "../../api/hooks/useAuth";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIserror] = useState(false);
  const [recipes, setRecipes] = useState<IRecipe[] | undefined>();
  const { authState } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setIserror(true);
          setIsLoading(false);
        } else {
          let results: IRecipe[] = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() } as IRecipe);
          });
          setIsLoading(false);
          setRecipes(results);
        }
      },
      (error) => {
        setIserror(true);
        setIsLoading(false);
      }
    );

    return () => unsub();
  }, [authState]);
  return (
    <div>
      {!authState.user && <p>Log in to get started</p>}
      {isLoading && authState.user && (
        <p className="loading">Loading recipes...</p>
      )}
      {isError && authState.user && (
        <p className="error">'Failed To Load Recipes'</p>
      )}
      {recipes && authState.user && <RecipeList recipes={recipes} />}
    </div>
  );
}
